import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';

// const SHEET_API_URL = import.meta.env.VITE_SHEET_API_URL;
// const API_SECRET = import.meta.env.VITE_API_SECRET; 

const EditRegistration = () => {
    const [searchParams] = useSearchParams();

    // --- SANITIZER ---
    const sanitizeInput = (value) => {
        return value.replace(/[<>;\[\]\/\\\\]/g, "");
    };

    // --- STATE ---
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null); // Critical Load Error
    const [data, setData] = useState(null);
    const [participantCount, setParticipantCount] = useState(1);
    
    // Validation States
    const [fieldErrors, setFieldErrors] = useState({});
    const [submitError, setSubmitError] = useState(null); // Sticky Error
    const [notification, setNotification] = useState(null); // Success Toast

    // Helper for Success Notifications
    const showNotification = (type, message) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 4000);
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
                // const url = `${SHEET_API_URL}?action=login&cnic=${cnic}&key=${key}`;
                const res = await fetch("/api/submit", {
                    method: "POST",
                    body: JSON.stringify({ 
                        action: "login", // Tell backend this is a login request
                        cnic: cnic, 
                        key: key 
                    }), 
                    headers: { "Content-Type": "application/json" }
                });
                const json = await res.json();

                if (json.result === 'success') {
                    const currentMods = json.modules.split(', ').filter(Boolean);
                    
                    setData({ 
                        ...json, 
                        competitions: currentMods 
                    });
                    
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

    // --- 2. VALIDATION LOGIC ---
    const getValidationErrors = () => {
        let errors = {};
        const cnicRegex = /^\d{13}$/;
        const phoneRegex = /^03\d{9}$/;
        // Allows gmail, hotmail, yahoo, university emails, etc.
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

        // Team Info
        if (!data.teamName?.trim()) errors.teamName = "Team Name is required";
        if (!data.institute?.trim()) errors.institute = "Institute is required";

        // Lead Info
        if (!data.leadPhone || !phoneRegex.test(data.leadPhone.replace(/-/g, ''))) errors.leadPhone = "Invalid Phone (03...)";
        if (!data.leadEmail || !emailRegex.test(data.leadEmail)) errors.leadEmail = "Invalid Email Address";

        // Participant 2
        if (participantCount >= 2) {
            if (!data.p2Name?.trim()) errors.p2Name = "Name required";
            if (!data.p2Phone || !phoneRegex.test(data.p2Phone.replace(/-/g, ''))) errors.p2Phone = "Invalid Phone";
            if (!data.p2CNIC || !cnicRegex.test(data.p2CNIC.replace(/-/g, ''))) errors.p2CNIC = "Invalid CNIC";
        }

        // Participant 3
        if (participantCount >= 3) {
            if (!data.p3Name?.trim()) errors.p3Name = "Name required";
            if (!data.p3Phone || !phoneRegex.test(data.p3Phone.replace(/-/g, ''))) errors.p3Phone = "Invalid Phone";
            if (!data.p3CNIC || !cnicRegex.test(data.p3CNIC.replace(/-/g, ''))) errors.p3CNIC = "Invalid CNIC";
        }

        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const cleanValue = sanitizeInput(value);
        
        setData(prev => ({ ...prev, [name]: cleanValue }));
        
        // Clear error when user types
        if (fieldErrors[name]) {
            setFieldErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setSubmitError(null);

        // 1. Check Validation
        const errors = getValidationErrors();
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors); // Highlight inputs
            
            // Show Sticky Toast
            const missingList = Object.values(errors).join(", ");
            setSubmitError(`Please fix: ${missingList}`);
            return;
        }

        setUploading(true);

        try {
            const payload = {
                // apiSecret: API_SECRET,
                action: "update",
                rowIndex: data.rowIndex,
                competitions: data.competitions,
                
                teamName: data.teamName,
                institute: data.institute,
                leadPhone: data.leadPhone, 
                leadEmail: data.leadEmail, 

                p2Name: data.p2Name, p2Phone: data.p2Phone, p2CNIC: data.p2CNIC,
                p3Name: data.p3Name, p3Phone: data.p3Phone, p3CNIC: data.p3CNIC,
            };

            await fetch("/api/submit", {
                method: "POST",
                body: JSON.stringify(payload),
                headers: { "Content-Type": "application/json" },
            });
            
            showNotification('success', 'Changes saved successfully!');
            
        } catch (e) {
            showNotification('error', 'Failed to save. Try again.');
        } finally {
            setUploading(false);
        }
    };

    if (loading) return <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">Loading Data...</div>;
    if (error) return <div className="min-h-screen bg-gray-950 text-red-400 flex items-center justify-center font-bold text-xl">{error}</div>;

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 font-sans text-gray-200">
            
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
                                <p className="text-sm font-medium text-red-50">{submitError}</p>
                            </div>
                            <button onClick={() => setSubmitError(null)} className="text-red-300 hover:text-white font-bold text-xl">✕</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Success Notification */}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: -50, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: -50, x: "-50%" }}
                        className="fixed top-24 left-1/2 transform -translate-x-1/2 z-40 px-6 py-4 rounded-xl shadow-2xl border backdrop-blur-md flex items-center gap-3 min-w-[300px] justify-center bg-green-900/40 border-green-500/50 text-green-200"
                    >
                        <span className="text-xl text-green-400">✓</span>
                        <div className="flex flex-col">
                            <span className="font-bold text-sm">Success</span>
                            <span className="text-xs opacity-90">{notification.message}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            <div className="container mx-auto px-4 py-8 max-w-3xl pt-24">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Edit Registration</h1>
                    <p className="text-gray-400 mt-2">Update your team details</p>
                </div>

                <form onSubmit={handleUpdate} className="space-y-6">
                    
                    {/* --- MODULES (READ ONLY) --- */}
                    <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
                        <h3 className="text-xl font-semibold text-purple-400 mb-4 border-b border-gray-700 pb-2">
                            Registered Modules
                        </h3>
                        <div className="grid gap-3">
                            {data.competitions.map((compName, index) => (
                                <div key={index} className="relative flex items-center p-3 rounded-xl border bg-purple-900/20 border-purple-500/50 cursor-default">
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

                    {/* --- PARTICIPANTS --- */}
                    <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
                        <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
                            <h3 className="text-xl font-semibold text-blue-400">Participants ({participantCount})</h3>
                        </div>

                        {/* LEAD */}
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

                        {/* P2 */}
                        {participantCount >= 2 && (
                            <div className="mb-6">
                                <h4 className="text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider border-t border-gray-800 pt-4">Participant 2</h4>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <InputGroup label="Full Name" name="p2Name" value={data.p2Name} onChange={handleChange} error={fieldErrors.p2Name} />
                                    <InputGroup label="Phone Number" name="p2Phone" value={data.p2Phone} onChange={handleChange} error={fieldErrors.p2Phone} />
                                    <InputGroup label="CNIC" name="p2CNIC" value={data.p2CNIC} onChange={handleChange} error={fieldErrors.p2CNIC} />
                                </div>
                            </div>
                        )}

                        {/* P3 */}
                        {participantCount >= 3 && (
                            <div className="mb-6">
                                <h4 className="text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider border-t border-gray-800 pt-4">Participant 3</h4>
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

// Reusable Input
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