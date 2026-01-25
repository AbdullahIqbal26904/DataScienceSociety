import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import dssLogo from '/assets/ds_logo.png'; // Make sure path is correct

// --- CONFIGURATION ---
const SHEET_API_URL = import.meta.env.VITE_SHEET_API_URL;
const PAYMENT_LINKS = {
    1: import.meta.env.VITE_PAYMENT_LINK_1,
    2: import.meta.env.VITE_PAYMENT_LINK_2,
    3: import.meta.env.VITE_PAYMENT_LINK_3
};

// 1. MODULES DATA (Fixed Prices)
const MODULES = [
    { id: 'game-dev', name: 'Game Dev', early: 500, normal: 1000 },
    { id: 'shark-tank', name: 'Shark Tank', early: 700, normal: 1500 },
    { id: 'csi', name: 'Crime Scene Investigation', early: 500, normal: 1000 },
    { id: 'gen-ai', name: 'Gen AI', early: 500, normal: 1000 },
    { id: 'ml', name: 'Machine Learning', early: 700, normal: 1500 },
    { id: 'ui-ux', name: 'UI/UX', early: 500, normal: 1000 },
    { id: 'cp', name: 'Competitive Programming', early: 700, normal: 1500 },
    { id: 'data', name: 'Data Analytics', early: 500, normal: 1000 },
    { id: 'web-dev', name: 'Web Development', early: 500, normal: 1000 },
];

const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
};

const HxDRegistration = () => {
    // --- STATE ---
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [participantCount, setParticipantCount] = useState(1);
    const [errors, setErrors] = useState({}); 
    const [totalCost, setTotalCost] = useState(0);
    const [isEarlyBird, setIsEarlyBird] = useState(true);
    
    // Custom Error Message State
    const [submitError, setSubmitError] = useState(null);

    // --- FILE STATE ---
    const [file, setFile] = useState(null); 
    
    // Change 1: In your handleFileChange function
const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    // Changed 2 * 1024 * 1024 to 4 * 1024 * 1024 (4MB)
    if (selectedFile && selectedFile.size > 4 * 1024 * 1024) {
        setSubmitError("File is too big! Please use an image under 4MB.");
        return;
    }
    setFile(selectedFile);
    setSubmitError(null); 
};

// Change 2: In the JSX render section for the file input label

    useEffect(() => {
        // Deadline: Feb 6, 2026 at 11:59 PM
        const deadline = new Date(2026, 1, 6, 23, 59, 59);
        const today = new Date();
        setIsEarlyBird(today < deadline);
    }, []);

    const [formData, setFormData] = useState({
        teamName: '', competitions: [], institute: '',
        leadName: '', leadPhone: '', leadEmail: '', leadCNIC: '',
        p2Name: '', p2Phone: '', p2CNIC: '',
        p3Name: '', p3Phone: '', p3CNIC: '',
    });

    // --- EFFECT: Calculate Total Cost ---
    useEffect(() => {
        let total = 0;
        formData.competitions.forEach(compName => {
            const module = MODULES.find(m => m.name === compName);
            if (module) {
                const pricePerPerson = isEarlyBird ? module.early : module.normal;
                total += (pricePerPerson * participantCount);
            }
        });
        setTotalCost(total);
    }, [formData.competitions, participantCount, isEarlyBird]);

    // --- VALIDATION HELPER ---
    const validateField = (name, value) => {
        let errorMsg = null;
        const cnicRegex = /^\d{13}$/;
        const phoneRegex = /^03\d{9}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const cleanVal = value.replace(/-/g, '').replace(/\s/g, '');

        if (name.includes('Name') && !value.trim()) errorMsg = "Required";
        else if (name.includes('institute') && !value.trim()) errorMsg = "Required";
        else if (name.includes('Email') && !emailRegex.test(value)) errorMsg = "Invalid Email";
        else if (name.includes('Phone') && !phoneRegex.test(cleanVal)) errorMsg = "Format: 03XXXXXXXXX";
        else if (name.includes('CNIC') && !cnicRegex.test(cleanVal)) errorMsg = "Must be 13 digits";

        setErrors(prev => ({ ...prev, [name]: errorMsg }));
    };

    // --- HANDLERS ---
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error as they type, but validate fully on blur
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        validateField(name, value);
    };

    const toggleModule = (moduleName) => {
        setFormData(prev => {
            const current = prev.competitions;
            if (current.includes(moduleName)) {
                return { ...prev, competitions: current.filter(c => c !== moduleName) };
            } else {
                return { ...prev, competitions: [...current, moduleName] };
            }
        });
        if (errors.competitions) setErrors(prev => ({ ...prev, competitions: null }));
    };

    const validateAll = () => {
        // Run full validation before submit
        let newErrors = {};
        // ... (Reuse logic, or just let the field validators handle it if you iterate)
        // For simplicity, reusing manual check:
        const cnicRegex = /^\d{13}$/;
        const phoneRegex = /^03\d{9}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.teamName.trim()) newErrors.teamName = "Required";
        if (!formData.institute.trim()) newErrors.institute = "Required";
        if (formData.competitions.length === 0) newErrors.competitions = "Select at least one module";

        if (!formData.leadName.trim()) newErrors.leadName = "Required";
        if (!emailRegex.test(formData.leadEmail)) newErrors.leadEmail = "Invalid email";
        if (!phoneRegex.test(formData.leadPhone.replace(/-/g, ''))) newErrors.leadPhone = "Invalid Phone";
        if (!cnicRegex.test(formData.leadCNIC.replace(/-/g, ''))) newErrors.leadCNIC = "Invalid CNIC";

        if (participantCount >= 2) {
            if (!formData.p2Name.trim()) newErrors.p2Name = "Required";
            if (!phoneRegex.test(formData.p2Phone.replace(/-/g, ''))) newErrors.p2Phone = "Invalid Phone";
            if (!cnicRegex.test(formData.p2CNIC.replace(/-/g, ''))) newErrors.p2CNIC = "Invalid CNIC";
        }
        if (participantCount >= 3) {
            if (!formData.p3Name.trim()) newErrors.p3Name = "Required";
            if (!phoneRegex.test(formData.p3Phone.replace(/-/g, ''))) newErrors.p3Phone = "Invalid Phone";
            if (!cnicRegex.test(formData.p3CNIC.replace(/-/g, ''))) newErrors.p3CNIC = "Invalid CNIC";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError(null);
        
        if (!validateAll()) {
            setSubmitError("Please fix the errors highlighted in red.");
            const firstError = document.querySelector('.text-red-400');
            if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        if (!file) {
            setSubmitError("Please upload a payment screenshot.");
            return;
        }

        setLoading(true);

        try {
            const base64Image = await convertToBase64(file);

            const payload = { 
                ...formData, 
                competition: formData.competitions.join(', '),
                totalPaid: totalCost,
                image: base64Image,
                imageName: file.name,
                mimeType: file.type
            };

            const response = await fetch(SHEET_API_URL, {
                method: "POST",
                body: JSON.stringify(payload),
                // Using standard mode to try and get response
            });

            const result = await response.json();

            if (result.result === "error") {
                setSubmitError(result.message); // Show Backend Error Niceley
                setLoading(false);
            } else {
                setSubmitted(true);
            }

        } catch (error) {
            console.error(error);
            setSubmitError("Network error. Please try again or check your connection.");
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white p-4">
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center p-8 bg-gray-900 rounded-2xl border border-gray-800 shadow-2xl max-w-md w-full"
                >
                    {/* LOGO ADDED HERE */}
                    <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 p-1 border border-gray-700">
                        <img src={dssLogo} alt="Logo" className="w-full h-full object-cover rounded-full" />
                    </div>
                    
                    <h2 className="text-3xl font-bold text-green-400 mb-2">Registration Complete!</h2>
                    <p className="text-gray-300 mb-6">We have received your details.</p>

                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 text-left">
                        <div className="flex gap-3">
                            <span className="text-xl">📧</span>
                            <div>
                                <p className="text-yellow-200 font-semibold text-sm">Check your Email</p>
                                <p className="text-yellow-200/70 text-xs mt-1">
                                    Look for an email from <strong>dss.iba</strong>. If you don't see it, check your <strong>Junk/Spam</strong> folder.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    {/* FIXED MOBILE ALIGNMENT: flex-col on mobile, flex-row on desktop */}
                    <div className="flex flex-col md:flex-row justify-center gap-4 mt-8 w-full">
                        <button 
                            onClick={() => window.location.reload()} 
                            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl text-sm font-medium transition-colors w-full md:w-auto"
                        >
                            Register Another Team
                        </button>
                        <Link 
                            to="/" 
                            className="px-6 py-3 bg-transparent border border-gray-700 hover:bg-gray-800 text-gray-300 rounded-xl text-sm font-medium transition-colors w-full md:w-auto text-center"
                        >
                            Return Home
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative overflow-hidden font-sans text-gray-200">
            {/* Background ... (Same as before) */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none bg-gray-950/70">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBtLTEgMGExIDEgMCAxIDAgMiAwIDEgMSAwIDEgMCAtMiAwIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDMiLz48L2c+PC9zdmc+')] opacity-40"></div>
            </div>

            <div className="container mx-auto px-4 py-8 max-w-3xl">
                {/* Back Button */}
                <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors group">
                    <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    <span>Back to Home</span>
                </Link>
                
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Team Registration</h1>
                    <div className="inline-block mt-3 px-4 py-1 rounded-full bg-gray-800 border border-gray-700 text-sm">
                        {isEarlyBird ? <span className="text-green-400 font-semibold">✨ Early Bird Active</span> : <span className="text-yellow-500 font-semibold">Standard Pricing Active</span>}
                    </div>
                </div>

                {/* ERROR ALERT BOX (Nice styling) */}
                <AnimatePresence>
                    {submitError && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }} 
                            animate={{ opacity: 1, height: 'auto' }} 
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-red-500/10 border border-red-500/20 text-red-200 px-4 py-3 rounded-xl mb-6 flex items-start gap-3"
                        >
                            <span className="text-xl">⚠️</span>
                            <div>
                                <p className="font-bold text-sm">Submission Failed</p>
                                <p className="text-sm opacity-80">{submitError}</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* ... (MODULES SECTION - No Changes) ... */}
                    {/* Copy previous module section here */}
                    <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
                        <h3 className="text-xl font-semibold text-purple-400 mb-4 border-b border-gray-700 pb-2">Select Modules</h3>
                        <div className="grid gap-3">
                            {MODULES.map((mod) => (
                                <label key={mod.id} className={`relative flex items-center p-3 rounded-xl cursor-pointer transition-all border ${formData.competitions.includes(mod.name) ? 'bg-purple-900/20 border-purple-500/50' : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'}`}>
                                    <input type="checkbox" className="w-5 h-5 accent-purple-500 rounded focus:ring-purple-500/30" checked={formData.competitions.includes(mod.name)} onChange={() => toggleModule(mod.name)} />
                                    <div className="ml-4 flex-1">
                                        <div className="flex justify-between items-center">
                                            <span className={`font-medium ${formData.competitions.includes(mod.name) ? 'text-white' : 'text-gray-300'}`}>{mod.name}</span>
                                            <div className="text-right">
                                                <span className="text-green-400 font-mono text-sm bg-green-400/10 px-2 py-0.5 rounded block">Rs {isEarlyBird ? mod.early : mod.normal}</span>
                                            </div>
                                        </div>
                                    </div>
                                </label>
                            ))}
                        </div>
                        {errors.competitions && <p className="text-red-400 text-sm mt-2">⚠ {errors.competitions}</p>}
                    </div>

                    {/* TEAM INFO */}
                    <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
                        <h3 className="text-xl font-semibold text-purple-400 mb-4 border-b border-gray-700 pb-2">Team Details</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <InputGroup label="Team Name" name="teamName" value={formData.teamName} onChange={handleChange} onBlur={handleBlur} error={errors.teamName} required />
                            <InputGroup label="Institute Name" name="institute" value={formData.institute} onChange={handleChange} onBlur={handleBlur} error={errors.institute} required />
                        </div>
                    </div>

                    {/* PARTICIPANTS (With onBlur validation added to inputs) */}
                    <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
                         {/* ... Header ... */}
                         <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
                             <h3 className="text-xl font-semibold text-blue-400">Participants ({participantCount})</h3>
                             <span className="text-xs text-gray-500">Multiplier: x{participantCount}</span>
                        </div>

                        {/* Leader */}
                        <div className="mb-6">
                            <h4 className="text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">Team Lead</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                                <InputGroup label="Full Name" name="leadName" value={formData.leadName} onChange={handleChange} onBlur={handleBlur} error={errors.leadName} required />
                                <InputGroup label="Phone Number" name="leadPhone" value={formData.leadPhone} onChange={handleChange} onBlur={handleBlur} error={errors.leadPhone} required />
                                <InputGroup label="Email" name="leadEmail" value={formData.leadEmail} onChange={handleChange} onBlur={handleBlur} error={errors.leadEmail} required />
                                <InputGroup label="CNIC (13 digits)" name="leadCNIC" value={formData.leadCNIC} onChange={handleChange} onBlur={handleBlur} error={errors.leadCNIC} required />
                            </div>
                        </div>

                        {/* P2 */}
                        <AnimatePresence>
                            {participantCount >= 2 && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-6 overflow-hidden">
                                    <h4 className="text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider border-t border-gray-800 pt-4">Participant 2</h4>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <InputGroup label="Full Name" name="p2Name" value={formData.p2Name} onChange={handleChange} onBlur={handleBlur} error={errors.p2Name} required />
                                        <InputGroup label="Phone" name="p2Phone" value={formData.p2Phone} onChange={handleChange} onBlur={handleBlur} error={errors.p2Phone} required />
                                        <InputGroup label="CNIC" name="p2CNIC" value={formData.p2CNIC} onChange={handleChange} onBlur={handleBlur} error={errors.p2CNIC} required />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        
                        {/* P3 */}
                        <AnimatePresence>
                            {participantCount >= 3 && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-6 overflow-hidden">
                                    <h4 className="text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider border-t border-gray-800 pt-4">Participant 3</h4>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <InputGroup label="Full Name" name="p3Name" value={formData.p3Name} onChange={handleChange} onBlur={handleBlur} error={errors.p3Name} required />
                                        <InputGroup label="Phone" name="p3Phone" value={formData.p3Phone} onChange={handleChange} onBlur={handleBlur} error={errors.p3Phone} required />
                                        <InputGroup label="CNIC" name="p3CNIC" value={formData.p3CNIC} onChange={handleChange} onBlur={handleBlur} error={errors.p3CNIC} required />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Add/Remove Buttons */}
                        <div className="flex gap-3 mt-4">
                            {participantCount < 3 && <button type="button" onClick={() => setParticipantCount(p => p + 1)} className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-green-400 rounded-lg text-sm font-medium border border-green-500/30">+ Add Member</button>}
                            {participantCount > 1 && <button type="button" onClick={() => setParticipantCount(p => p - 1)} className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-red-400 rounded-lg text-sm font-medium border border-red-500/30">- Remove Member</button>}
                        </div>
                    </div>

                    {/* PAYMENT SECTION (No Changes) */}
                    {/* Copy previous payment section here, it was fine */}
                     <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
                        <h3 className="text-xl font-semibold text-white mb-4">Payment Verification</h3>
                        <div className="bg-gray-950/50 p-4 rounded-lg mb-6 border border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
                             <div className="text-left w-full">
                                <p className="text-gray-400 text-sm">Amount to Pay:</p>
                                <div className="text-2xl font-bold text-green-400">Rs {totalCost}</div>
                                <p className="text-xs text-gray-500 mt-1">{isEarlyBird ? 'Early Bird' : 'Standard'} Price x {participantCount} Participant{participantCount > 1 ? 's' : ''}</p>
                            </div>
                            <a href={PAYMENT_LINKS[participantCount]} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg text-center">Pay Rs {totalCost} ↗</a>
                        </div>
                        <div className="flex flex-col relative">
                            <label className="text-sm text-gray-400 mb-1">
    Payment Screenshot (Max 4MB) <span className="text-red-400">*</span>
</label>
                            <input type="file" accept="image/*" onChange={handleFileChange} required className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500" />
                            <p className="text-xs text-gray-500 mt-2">Upload a clear screenshot of your transaction. {file && <span className="text-green-400 ml-2">✓ Selected: {file.name}</span>}</p>
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-lg rounded-xl shadow-lg shadow-purple-900/20 transition-all transform active:scale-95 disabled:opacity-50">
                        {loading ? 'Submitting...' : 'Complete Registration'}
                    </button>
                </form>
            </div>
        </div>
    );
};

// Updated InputGroup with onBlur
const InputGroup = ({ label, name, value, onChange, onBlur, error, type = "text", required = false, placeholder = "" }) => (
    <div className="flex flex-col relative">
        <label className="text-sm text-gray-400 mb-1">{label} {required && <span className="text-red-400">*</span>}</label>
        <input 
            type={type} name={name} value={value} onChange={onChange} onBlur={onBlur} placeholder={placeholder}
            className={`bg-gray-800 border rounded-lg p-3 text-white focus:outline-none transition-all placeholder-gray-600 ${error ? 'border-red-500/50 focus:border-red-500' : 'border-gray-700 focus:border-purple-500'}`}
        />
        <AnimatePresence>
            {error && <motion.span initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-[11px] text-red-400 mt-1 absolute right-2 top-0">{error}</motion.span>}
        </AnimatePresence>
    </div>
);

export default HxDRegistration;