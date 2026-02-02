import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import dssLogo from '/assets/ds_logo.png'; 

// --- CONFIGURATION ---
const PAYMENT_LINKS = {
    1: import.meta.env.VITE_PAYMENT_LINK_1,
    2: import.meta.env.VITE_PAYMENT_LINK_2,
    3: import.meta.env.VITE_PAYMENT_LINK_3
};

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
    const [paymentClicked, setPaymentClicked] = useState(false);
    // Custom Error Message State
    const [submitError, setSubmitError] = useState(null);

    // --- FILE STATE ---
    const [file, setFile] = useState(null); 

    // --- 🔒 SANITIZER FUNCTION (Frontend) ---
    const sanitizeInput = (value) => {
        return value.replace(/[<>;\[\]\/\\\\]/g, "");
    };
    
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
        
        if (!selectedFile) return;

        if (!allowedTypes.includes(selectedFile.type)) {
            setSubmitError("Invalid file type! Please upload a JPG, PNG, or PDF.");
            setFile(null);
            e.target.value = null; // Reset input
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        // 4MB Limit check
        if (selectedFile.size > 4 * 1024 * 1024) {
            setSubmitError("File is too big! Please use an image under 4MB.");
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to sticky error
            return;
        }
        setFile(selectedFile);
        setSubmitError(null); 
    };

    useEffect(() => {
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

    useEffect(() => {
        const savedData = localStorage.getItem("hxd_form_progress");
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                // Merge saved data with default structure to avoid undefined errors
                setFormData(prev => ({ ...prev, ...parsed.formData }));
                
                // Only restore valid booleans/numbers
                if (parsed.paymentClicked !== undefined) setPaymentClicked(parsed.paymentClicked);
                if (parsed.participantCount) setParticipantCount(parsed.participantCount);
            } catch (e) {
                console.error("Failed to load saved data", e);
            }
        }
    }, []);

    // 2. AUTO-SAVE DATA WHEN IT CHANGES
    useEffect(() => {
        const dataToSave = {
            formData,
            paymentClicked,
            participantCount
        };
        localStorage.setItem("hxd_form_progress", JSON.stringify(dataToSave));
    }, [formData, paymentClicked, participantCount]);
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        // 🔒 Apply Sanitization Immediately
        const cleanValue = sanitizeInput(value);
        
        setFormData(prev => ({ ...prev, [name]: cleanValue }));
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

    const getValidationErrors = () => {
        let newErrors = {};
        const cnicRegex = /^\d{13}$/;
        const phoneRegex = /^03\d{9}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Team & Institute
        if (!formData.teamName.trim()) newErrors.teamName = "Team Name";
        if (!formData.institute.trim()) newErrors.institute = "Institute";
        if (formData.competitions.length === 0) newErrors.competitions = "Modules";

        // Lead Validation
        if (!formData.leadName.trim()) newErrors.leadName = "Lead Name";
        if (!emailRegex.test(formData.leadEmail)) newErrors.leadEmail = "Lead Email";
        if (!phoneRegex.test(formData.leadPhone.replace(/-/g, ''))) newErrors.leadPhone = "Lead Phone";
        if (!cnicRegex.test(formData.leadCNIC.replace(/-/g, ''))) newErrors.leadCNIC = "Lead CNIC";

        // Participant 2 Validation
        if (participantCount >= 2) {
            if (!formData.p2Name.trim()) newErrors.p2Name = "P2 Name";
            if (!phoneRegex.test(formData.p2Phone.replace(/-/g, ''))) newErrors.p2Phone = "P2 Phone";
            if (!cnicRegex.test(formData.p2CNIC.replace(/-/g, ''))) newErrors.p2CNIC = "P2 CNIC";
        }

        // Participant 3 Validation
        if (participantCount >= 3) {
            if (!formData.p3Name.trim()) newErrors.p3Name = "P3 Name";
            if (!phoneRegex.test(formData.p3Phone.replace(/-/g, ''))) newErrors.p3Phone = "P3 Phone";
            if (!cnicRegex.test(formData.p3CNIC.replace(/-/g, ''))) newErrors.p3CNIC = "P3 CNIC";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError(null);
        
        const validationErrors = getValidationErrors();
        
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            const missingList = Object.values(validationErrors).join(", ");
            setSubmitError(`Please fix: ${missingList}`);
            return;
        }
        if (!paymentClicked) {
            setSubmitError("Please click the Payment Link to initiate your transaction.");
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

           const response = await fetch("/api/submit", {
                method: "POST",
                body: JSON.stringify(payload), 
            });

            const result = await response.json();

            if (result.result === "error") {
                setSubmitError(result.message);
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setLoading(false);
            } else {
                localStorage.removeItem("hxd_form_progress"); // ✅ CLEAR DATA NOW
                setSubmitted(true);
            }

        } catch (error) {
            console.error(error);
            setSubmitError("Network error. Please try again or check your connection.");
            window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 p-1 border border-gray-700">
            <img src={dssLogo} alt="Logo" className="w-full h-full object-cover rounded-full" />
        </div>
        
        <h2 className="text-3xl font-bold text-green-400 mb-2">Registration Submitted!</h2>
        <p className="text-gray-300 mb-6">We have received your details.</p>
        
        {/* Updated Verification Message */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-left">
            <div className="flex gap-3">
                <span className="text-xl">⏳</span>
                <div>
                    <p className="text-blue-200 font-semibold text-sm">Verification in Progress</p>
                    <p className="text-blue-200/70 text-xs mt-1 leading-relaxed">
                        We will verify your payment proof shortly. Once approved, you will receive a confirmation email from <strong>dss.iba</strong>.
                    </p>
                </div>
            </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-4 mt-8 w-full">
            <button onClick={() => window.location.reload()} className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl text-sm font-medium w-full md:w-auto">
                Register Another Team
            </button>
            <Link to="/" className="px-6 py-3 bg-transparent border border-gray-700 hover:bg-gray-800 text-gray-300 rounded-xl text-sm font-medium w-full md:w-auto text-center">
                Return Home
            </Link>
        </div>
    </motion.div>
</div>
        );
    }

    return (
        <div className="min-h-screen relative overflow-hidden font-sans text-gray-200">
            {/* Background */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none bg-gray-950/70">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBtLTEgMGExIDEgMCAxIDAgMiAwIDEgMSAwIDEgMCAtMiAwIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDMiLz48L2c+PC9zdmc+')] opacity-40"></div>
            </div>

            {/* 🔥 STICKY ERROR TOAST */}
            <AnimatePresence>
                {submitError && (
                    <motion.div 
                        initial={{ y: -100, opacity: 0 }} 
                        animate={{ y: 0, opacity: 1 }} 
                        exit={{ y: -100, opacity: 0 }}
                        className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
                    >
                        <div className="bg-red-900/90 backdrop-blur-md border border-red-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 max-w-lg w-full pointer-events-auto">
                            <span className="text-2xl">⚠️</span>
                            <div className="flex-1">
                                <h4 className="font-bold text-sm uppercase tracking-wide text-red-200">Action Required</h4>
                                <p className="text-sm font-medium">{submitError}</p>
                            </div>
                            <button onClick={() => setSubmitError(null)} className="text-red-300 hover:text-white">✕</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="container mx-auto px-4 py-8 max-w-3xl pt-20">
                
                {/* Back Button */}
                <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors group">
                    <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    <span>Back to Home</span>
                </Link>
                
                {/* Header */}
                <div className="text-center mb-10">
                    {/* --- ADDED: PRIZE POOL BADGE --- */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-4 inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/40 shadow-[0_0_15px_rgba(234,179,8,0.1)]"
                    >
                        <span className="text-xl">🏆</span>
                        <span className="text-yellow-400 font-bold uppercase tracking-wider text-sm">Prize Pool: PKR 400,000+</span>
                    </motion.div>

                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Team Registration</h1>
                    <div className="inline-block mt-3 px-4 py-1 rounded-full bg-gray-800 border border-gray-700 text-sm">
                        {isEarlyBird ? <span className="text-green-400 font-semibold">✨ Early Bird Active</span> : <span className="text-yellow-500 font-semibold">Standard Pricing Active</span>}
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* MODULES SELECTION */}
                    <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
                        <h3 className="text-xl font-semibold text-purple-400 mb-4 flex items-center gap-2">
                            Select Modules
                            <span className="text-xs font-normal text-gray-500 mt-1">(Prices are per person)</span>
                        </h3>
                        
                        {/* --- ADDED: SCHEDULING NOTE --- */}
                        <div className="mt-3 mb-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-start gap-3">
  {/* Icon: Added mt-0.5 for better alignment with the top line of text */}
  <span className="text-blue-400 text-sm mt-0.5">📅</span>

  {/* Text Container: This wrapper ensures the text stacks vertically */}
  <div className="flex-1 space-y-2">
    <p className="text-xs text-blue-200/80 leading-relaxed">
      <strong>Important:</strong> All modules will be conducted{" "}
      <strong>simultaneously</strong>. Please ensure you do not select
      multiple modules if you are the only participant.
    </p>

    <p className="text-xs text-blue-200/80">
      For any problems or queries, WhatsApp:{" "}
      <a
        href="https://wa.me/923350864555"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-white transition-colors whitespace-nowrap"
      >
        +92 335 0864555
      </a>
    </p>
  </div>
</div>
                        
                        <div className="grid gap-3">
                            {MODULES.map((mod) => (
                                <label key={mod.id} className={`relative flex items-center p-3 rounded-xl cursor-pointer transition-all border ${formData.competitions.includes(mod.name) ? 'bg-purple-900/20 border-purple-500/50' : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'}`}>
                                    <input type="checkbox" className="w-5 h-5 accent-purple-500 rounded focus:ring-purple-500/30" checked={formData.competitions.includes(mod.name)} onChange={() => toggleModule(mod.name)} />
                                    <div className="ml-4 flex-1">
                                        <div className="flex justify-between items-center">
                                            <span className={`font-medium ${formData.competitions.includes(mod.name) ? 'text-white' : 'text-gray-300'}`}>{mod.name}</span>
                                            
                                            <div className="text-right flex flex-col items-end">
                                                {isEarlyBird && (
                                                    <span className="text-[10px] text-gray-500 line-through decoration-red-500/50">
                                                        Rs {mod.normal}
                                                    </span>
                                                )}
                                                <span className={`font-mono text-sm px-2 py-0.5 rounded flex items-center gap-1 ${isEarlyBird ? 'text-green-400 bg-green-400/10' : 'text-yellow-400 bg-yellow-400/10'}`}>
                                                    Rs {isEarlyBird ? mod.early : mod.normal} 
                                                    <span className="text-[10px] opacity-70 font-sans">/ person</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </label>
                            ))}
                        </div>
                        {errors.competitions && <p className="text-red-400 text-sm mt-2">⚠ {errors.competitions}</p>}
                    </div>

                    {/* TEAM DETAILS */}
                    <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
                        <h3 className="text-xl font-semibold text-purple-400 mb-4">Team Details</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <InputGroup label="Team Name" name="teamName" value={formData.teamName} onChange={handleChange} onBlur={handleBlur} error={errors.teamName} required />
                            <InputGroup label="Institute Name" name="institute" value={formData.institute} onChange={handleChange} onBlur={handleBlur} error={errors.institute} required />
                        </div>
                    </div>

                    {/* PARTICIPANTS SECTION */}
                    <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
                        <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
                            <h3 className="text-xl font-semibold text-blue-400">Participants</h3>
                            <span className="text-xs font-bold text-gray-400 bg-gray-800 px-3 py-1 rounded-full border border-gray-700">
                                {participantCount} / 3 Members
                            </span>
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

                        {/* Participant 2 - Slides down when count increases */}
                        <AnimatePresence>
                            {participantCount >= 2 && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }} 
                                    animate={{ opacity: 1, height: 'auto' }} 
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mb-6 pt-6 border-t border-gray-800 overflow-hidden"
                                >
                                    <div className="flex justify-between items-center mb-3">
                                        <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider">Participant 02</h4>
                                        <button type="button" onClick={() => setParticipantCount(1)} className="text-xs text-red-400 hover:text-red-300">Remove ✕</button>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <InputGroup label="Full Name" name="p2Name" value={formData.p2Name} onChange={handleChange} onBlur={handleBlur} error={errors.p2Name} required />
                                        <InputGroup label="Phone Number" name="p2Phone" value={formData.p2Phone} onChange={handleChange} onBlur={handleBlur} error={errors.p2Phone} required />
                                        <InputGroup label="CNIC (13 digits)" name="p2CNIC" value={formData.p2CNIC} onChange={handleChange} onBlur={handleBlur} error={errors.p2CNIC} required />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Participant 3 - Slides down when count increases */}
                        <AnimatePresence>
                            {participantCount >= 3 && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }} 
                                    animate={{ opacity: 1, height: 'auto' }} 
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mb-6 pt-6 border-t border-gray-800 overflow-hidden"
                                >
                                    <div className="flex justify-between items-center mb-3">
                                        <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider">Participant 03</h4>
                                        <button type="button" onClick={() => setParticipantCount(2)} className="text-xs text-red-400 hover:text-red-300">Remove ✕</button>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <InputGroup label="Full Name" name="p3Name" value={formData.p3Name} onChange={handleChange} onBlur={handleBlur} error={errors.p3Name} required />
                                        <InputGroup label="Phone Number" name="p3Phone" value={formData.p3Phone} onChange={handleChange} onBlur={handleBlur} error={errors.p3Phone} required />
                                        <InputGroup label="CNIC (13 digits)" name="p3CNIC" value={formData.p3CNIC} onChange={handleChange} onBlur={handleBlur} error={errors.p3CNIC} required />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* --- ADD BUTTON SECTION --- */}
                        {participantCount < 3 && (
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                type="button"
                                onClick={() => setParticipantCount(prev => prev + 1)}
                                className="w-full py-3 mt-2 border border-dashed border-gray-600 rounded-xl text-gray-400 hover:text-white hover:border-blue-500 hover:bg-blue-500/10 transition-all flex items-center justify-center gap-2 group"
                            >
                                <span className="w-6 h-6 rounded-full bg-gray-800 group-hover:bg-blue-500 flex items-center justify-center text-lg leading-none transition-colors">+</span>
                                <span>Add Participant</span>
                            </motion.button>
                        )}
                    </div>

                    {/* PAYMENT SECTION */}
                    <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
                        <h3 className="text-xl font-semibold text-white mb-4">Payment Verification</h3>
                        
                        <div className="bg-gray-950/50 p-4 rounded-lg mb-4 border border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="text-left w-full">
                                <p className="text-gray-400 text-sm">Total Amount:</p>
                                <div className="text-2xl font-bold text-green-400">Rs {totalCost}</div>
                                <p className="text-xs text-gray-500 mt-1">{isEarlyBird ? 'Early Bird' : 'Standard'} Price x {participantCount} Participant{participantCount > 1 ? 's' : ''}</p>
                            </div>
                            
                            <a 
                                href={PAYMENT_LINKS[participantCount]} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-lg text-center shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
                                onClick={() => setPaymentClicked(true)}
                            >
                                <span>Click the link to pay</span>
                                <span className="text-lg">↗</span>
                            </a>
                        </div>

                        {/* Policies */}
                        <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg mb-6">
                            <div className="flex items-start gap-2">
                                <span className="text-red-400 mt-0.5">⚠️</span>
                                <ul className="text-xs text-red-200/80 list-disc list-inside space-y-1">
                                    <li><strong>No Refund Policy:</strong> Registration fees are strictly non-refundable.</li>
                                    <li><strong>Entry Requirement:</strong> No entry will be allowed without verified payment.</li>
                                </ul>
                            </div>
                        </div>

                        {/* File Upload */}
                        <div className="flex flex-col relative">
                            <label className="text-sm text-gray-400 mb-1">
                                Payment Screenshot with reference number (Max 4MB) <span className="text-red-400">*</span>
                            </label>
                            <input type="file" accept="image/*" onChange={handleFileChange} required className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer" />
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

// Input Component
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