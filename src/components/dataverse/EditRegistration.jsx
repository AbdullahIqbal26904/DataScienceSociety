import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';

const SHEET_API_URL = import.meta.env.VITE_SHEET_API_URL;

const EditRegistration = () => {
    const [searchParams] = useSearchParams();
    
    // --- STATE ---
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [participantCount, setParticipantCount] = useState(1);
    const [fieldErrors, setFieldErrors] = useState({});
    const [notification, setNotification] = useState(null);

    // Helper for Notifications
    const showNotification = (type, message) => {
        setNotification({ type, message });
        setTimeout(() => {
            setNotification(null);
        }, 4000);
    };

    // --- 1. INITIALIZE (Fetch Data) ---
    useEffect(() => {
        const fetchData = async () => {
            const cnic = searchParams.get("cnic");
            const key = searchParams.get("key");

            if (!cnic || !key) {
                setError("Invalid Link.");
                setLoading(false);
                return;
            }

            try {
                const url = `${SHEET_API_URL}?action=login&cnic=${cnic}&key=${key}`;
                const res = await fetch(url);
                const json = await res.json();

                if (json.result === 'success') {
                    const currentMods = json.modules.split(', ').filter(Boolean);
                    
                    setData({ 
                        ...json, 
                        competitions: currentMods 
                    });
                    
                    // Determine Count based on existing data
                    let count = 1;
                    if (json.p2Name) count = 2;
                    if (json.p3Name) count = 3;
                    setParticipantCount(count);

                } else {
                    setError("Invalid credentials or expired link.");
                }
            } catch (err) {
                setError("Connection Failed.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [searchParams]);

    // --- VALIDATION HELPER ---
    const validateField = (name, value) => {
        let errorMsg = null;
        const cnicRegex = /^\d{13}$/;
        const phoneRegex = /^03\d{9}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const cleanVal = value.replace(/-/g, '').replace(/\s/g, '');

        if (name.includes('Name') && !value.trim()) errorMsg = "Name is required";
        else if (name.includes('institute') && !value.trim()) errorMsg = "Institute is required";
        else if (name.includes('Email') && !emailRegex.test(value)) errorMsg = "Invalid Email";
        else if (name.includes('Phone') && !phoneRegex.test(cleanVal)) errorMsg = "Format: 03XXXXXXXXX";
        else if (name.includes('CNIC') && !cnicRegex.test(cleanVal)) errorMsg = "Must be 13 digits";

        setFieldErrors(prev => ({ ...prev, [name]: errorMsg }));
        return errorMsg === null;
    };

    // --- HANDLERS ---
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
        validateField(name, value);
    };

    const validateAll = () => {
        let isValid = true;
        let errors = {};
        const fieldsToCheck = ['teamName', 'institute'];
        
        if (participantCount >= 2) fieldsToCheck.push('p2Name', 'p2Phone', 'p2CNIC');
        if (participantCount >= 3) fieldsToCheck.push('p3Name', 'p3Phone', 'p3CNIC');

        fieldsToCheck.forEach(field => {
            const val = data[field] || "";
            if (!val.trim()) { errors[field] = "Required"; isValid = false; }
            else {
                if (field.includes('Phone') && !/^03\d{9}$/.test(val.replace(/-/g,''))) { errors[field] = "Invalid Format"; isValid = false; }
                if (field.includes('CNIC') && !/^\d{13}$/.test(val.replace(/-/g,''))) { errors[field] = "Invalid CNIC"; isValid = false; }
            }
        });
        setFieldErrors(errors);
        return isValid;
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        
        if (!validateAll()) {
            const firstError = document.querySelector('.text-red-400');
            if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        setUploading(true);

        try {
            const payload = {
                action: "update",
                rowIndex: data.rowIndex,
                competitions: data.competitions,
                
                // --- TEAM INFO ---
                teamName: data.teamName,
                institute: data.institute,

                // --- LEAD CONTACT INFO ---
                leadPhone: data.leadPhone, 
                leadEmail: data.leadEmail, 

                // --- MEMBERS ---
                p2Name: data.p2Name, p2Phone: data.p2Phone, p2CNIC: data.p2CNIC,
                p3Name: data.p3Name, p3Phone: data.p3Phone, p3CNIC: data.p3CNIC,
            };

            await fetch(SHEET_API_URL, {
                method: "POST",
                body: JSON.stringify(payload),
                mode: "no-cors",
                headers: { "Content-Type": "text/plain" },
            });
            
            showNotification('success', 'Changes saved successfully!');
            
        } catch (e) {
            showNotification('error', 'Failed to save changes. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    if (loading) return <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">Loading Data...</div>;
    if (error) return <div className="min-h-screen bg-gray-950 text-red-400 flex items-center justify-center font-bold text-xl">{error}</div>;

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 font-sans text-gray-200">
            {/* Notification Toast */}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: -50, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: -50, x: "-50%" }}
                        className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-xl shadow-2xl border backdrop-blur-md flex items-center gap-3 min-w-[300px] justify-center
                            ${notification.type === 'success' 
                                ? 'bg-green-900/40 border-green-500/50 text-green-200' 
                                : 'bg-red-900/40 border-red-500/50 text-red-200'
                            }`}
                    >
                        <span className={`text-xl ${notification.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                            {notification.type === 'success' ? '✓' : '⚠'}
                        </span>
                        <div className="flex flex-col">
                            <span className="font-bold text-sm">
                                {notification.type === 'success' ? 'Success' : 'Error'}
                            </span>
                            <span className="text-xs opacity-90">{notification.message}</span>
                        </div>
                        <button onClick={() => setNotification(null)} className="ml-auto opacity-50 hover:opacity-100">✕</button>
                    </motion.div>
                )}
            </AnimatePresence>
            
            <div className="container mx-auto px-4 py-8 max-w-3xl">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Edit Registration</h1>
                    <p className="text-gray-400 mt-2">Update your team details</p>
                </div>

                <form onSubmit={handleUpdate} className="space-y-6">
                    
                    {/* --- MODULES SECTION (READ ONLY) --- */}
                    <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
                        <h3 className="text-xl font-semibold text-purple-400 mb-4 border-b border-gray-700 pb-2">
                            Registered Modules
                        </h3>
                        <div className="grid gap-3">
                            {data.competitions.map((compName, index) => (
                                <div 
                                    key={index} 
                                    className="relative flex items-center p-3 rounded-xl border bg-purple-900/20 border-purple-500/50 cursor-default"
                                >
                                    <div className="w-5 h-5 flex items-center justify-center rounded bg-purple-500 text-white text-xs font-bold">✓</div>
                                    <div className="ml-4 flex-1">
                                        <span className="font-medium text-white">{compName}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* --- TEAM INFO --- */}
                    <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
                        <h3 className="text-xl font-semibold text-purple-400 mb-4 border-b border-gray-700 pb-2">Team Details</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <InputGroup label="Team Name" name="teamName" value={data.teamName} onChange={handleChange} error={fieldErrors.teamName} />
                            <InputGroup label="Institute Name" name="institute" value={data.institute} onChange={handleChange} error={fieldErrors.institute} />
                        </div>
                    </div>

                    {/* --- PARTICIPANTS SECTION --- */}
                    <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
                        <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
                            <h3 className="text-xl font-semibold text-blue-400">
                                Participants ({participantCount})
                            </h3>
                        </div>

                        {/* 1. TEAM LEAD */}
                        <div className="mb-6">
                            <h4 className="text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">Team Lead</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="opacity-60 cursor-not-allowed">
                                    <InputGroup label="Full Name (Locked)" name="leadName" value={data.leadName} disabled={true} />
                                </div>
                                <InputGroup label="Phone Number" name="leadPhone" value={data.leadPhone} onChange={handleChange} error={fieldErrors.leadPhone} />
                                <InputGroup label="Email Address" name="leadEmail" value={data.leadEmail} onChange={handleChange} error={fieldErrors.leadEmail} />
                                <div className="opacity-60 cursor-not-allowed">
                                    <InputGroup label="CNIC (Locked)" name="leadCNIC" value={data.leadCNIC} disabled={true} />
                                </div>
                            </div>
                        </div>

                        {/* 2. PARTICIPANT 2 */}
                        {participantCount >= 2 && (
                            <div className="mb-6">
                                <h4 className="text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider border-t border-gray-800 pt-4">
                                    Participant 2
                                </h4>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <InputGroup label="Full Name" name="p2Name" value={data.p2Name} onChange={handleChange} error={fieldErrors.p2Name} />
                                    <InputGroup label="Phone Number" name="p2Phone" value={data.p2Phone} onChange={handleChange} error={fieldErrors.p2Phone} />
                                    <InputGroup label="CNIC" name="p2CNIC" value={data.p2CNIC} onChange={handleChange} error={fieldErrors.p2CNIC} />
                                </div>
                            </div>
                        )}

                        {/* 3. PARTICIPANT 3 */}
                        {participantCount >= 3 && (
                            <div className="mb-6">
                                <h4 className="text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider border-t border-gray-800 pt-4">
                                    Participant 3
                                </h4>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <InputGroup label="Full Name" name="p3Name" value={data.p3Name} onChange={handleChange} error={fieldErrors.p3Name} />
                                    <InputGroup label="Phone Number" name="p3Phone" value={data.p3Phone} onChange={handleChange} error={fieldErrors.p3Phone} />
                                    <InputGroup label="CNIC" name="p3CNIC" value={data.p3CNIC} onChange={handleChange} error={fieldErrors.p3CNIC} />
                                </div>
                            </div>
                        )}
                    </div>

                    <button type="submit" disabled={uploading} className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-lg rounded-xl shadow-lg shadow-purple-900/20 transition-all transform active:scale-95 disabled:opacity-50">
                        {uploading ? 'Updating Details...' : 'Save Changes'}
                    </button>
                </form>
            </div>
        </div>
    );
};

// Reusable Input Component
const InputGroup = ({ label, name, value, onChange, disabled = false, error = null, type = "text" }) => (
    <div className="flex flex-col relative">
        <label className="text-sm text-gray-400 mb-1">{label}</label>
        <input 
            type={type} 
            name={name} 
            value={value || ""} 
            onChange={onChange} 
            disabled={disabled}
            className={`bg-gray-800 border rounded-lg p-3 text-white focus:outline-none transition-all ${
                error 
                ? 'border-red-500/50 focus:border-red-500' 
                : disabled 
                    ? 'border-gray-800 text-gray-500 cursor-not-allowed' 
                    : 'border-gray-700 focus:border-purple-500'
            }`}
        />
        <AnimatePresence>
            {error && (
                <motion.span 
                    initial={{ opacity: 0, y: -5 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -5 }} 
                    className="text-[11px] text-red-400 mt-1 absolute right-2 top-0"
                >
                    {error}
                </motion.span>
            )}
        </AnimatePresence>
    </div>
);

export default EditRegistration;