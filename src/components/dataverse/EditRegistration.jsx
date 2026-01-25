import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
const SHEET_API_URL = import.meta.env.VITE_SHEET_API_URL;
// --- CONFIGURATION ---

const MODULES = [
    { id: 'game-dev', name: 'Game Dev' },
    { id: 'shark-tank', name: 'Shark Tank' },
    { id: 'csi', name: 'Crime Scene Investigation' },
    { id: 'gen-ai', name: 'Gen AI' },
    { id: 'ml', name: 'Machine Learning' },
    { id: 'ui-ux', name: 'UI/UX' },
    { id: 'cp', name: 'Competitive Programming' },
    { id: 'data', name: 'Data Analytics' },
    { id: 'web-dev', name: 'Web Development' },
];

const EditRegistration = () => {
    const [searchParams] = useSearchParams();
    
    // --- STATE ---
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [participantCount, setParticipantCount] = useState(1);
    const [fieldErrors, setFieldErrors] = useState({});

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
                // We send back the exact same modules (no changes allowed)
                competitions: data.competitions,
                
                // Data to update
                teamName: data.teamName,
                institute: data.institute,
                p2Name: data.p2Name, p2Phone: data.p2Phone, p2CNIC: data.p2CNIC,
                p3Name: data.p3Name, p3Phone: data.p3Phone, p3CNIC: data.p3CNIC,
            };

            await fetch(SHEET_API_URL, {
                method: "POST",
                body: JSON.stringify(payload),
                mode: "no-cors",
                headers: { "Content-Type": "text/plain" },
            });
            alert("Details Updated Successfully!");
        } catch (e) {
            alert("Failed to save.");
        } finally {
            setUploading(false);
        }
    };

    if (loading) return <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">Loading Data...</div>;
    if (error) return <div className="min-h-screen bg-gray-950 text-red-400 flex items-center justify-center font-bold text-xl">{error}</div>;

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 font-sans text-gray-200">
            {/* Background Blobs */}
            <div className="absolute inset-0 -z-10">
                 <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full filter blur-[150px]" />
                 <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-900/20 rounded-full filter blur-[150px]" />
            </div>

            <div className="container mx-auto px-4 py-8 max-w-3xl">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                        Update Participants
                    </h1>
                    <div className="mt-2 text-gray-400">Team: <span className="text-white font-bold">{data.teamName}</span></div>
                </div>

                <form onSubmit={handleUpdate} className="space-y-6">
                    
                    {/* MODULES (READ ONLY DISPLAY) */}
                    <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 opacity-60">
                        <h3 className="text-xl font-semibold text-purple-400 mb-4 border-b border-gray-700 pb-2">Registered Modules</h3>
                        <div className="flex flex-wrap gap-2">
                            {data.competitions.map((modName, index) => (
                                <span key={index} className="px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-lg text-sm">
                                    {modName}
                                </span>
                            ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-4">
                            * Modules cannot be changed here. To join another competition, please submit a new registration.
                        </p>
                    </div>

                    {/* TEAM DETAILS */}
                    <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
                        <h3 className="text-xl font-semibold text-purple-400 mb-4 border-b border-gray-700 pb-2">Team Details</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <InputGroup label="Team Name" name="teamName" value={data.teamName} onChange={handleChange} error={fieldErrors.teamName} />
                            <InputGroup label="Institute Name" name="institute" value={data.institute} onChange={handleChange} error={fieldErrors.institute} />
                        </div>
                    </div>

                    {/* PARTICIPANTS */}
                    <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
                        <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
                             <h3 className="text-xl font-semibold text-blue-400">Participants ({participantCount})</h3>
                        </div>

                        {/* Leader (Locked) */}
                        <div className="mb-6 opacity-70">
                            <h4 className="text-sm font-bold text-gray-400 mb-2 flex items-center gap-2">🔒 Team Lead (Locked)</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                                <InputGroup label="Full Name" name="leadName" value={data.leadName} disabled />
                                <InputGroup label="Phone Number" name="leadPhone" value={data.leadPhone} disabled />
                                <InputGroup label="Email" name="leadEmail" value={data.leadEmail} disabled />
                                <InputGroup label="CNIC" name="leadCNIC" value={data.leadCNIC} disabled />
                            </div>
                        </div>

                        {/* P2 */}
                        <AnimatePresence>
                            {participantCount >= 2 && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-6 overflow-hidden">
                                    <h4 className="text-sm font-bold text-gray-300 mb-3 border-t border-gray-800 pt-4">Participant 2</h4>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <InputGroup label="Full Name" name="p2Name" value={data.p2Name} onChange={handleChange} error={fieldErrors.p2Name} />
                                        <InputGroup label="Phone" name="p2Phone" value={data.p2Phone} onChange={handleChange} error={fieldErrors.p2Phone} />
                                        <InputGroup label="CNIC" name="p2CNIC" value={data.p2CNIC} onChange={handleChange} error={fieldErrors.p2CNIC} />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* P3 */}
                        <AnimatePresence>
                            {participantCount >= 3 && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-6 overflow-hidden">
                                    <h4 className="text-sm font-bold text-gray-300 mb-3 border-t border-gray-800 pt-4">Participant 3</h4>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <InputGroup label="Full Name" name="p3Name" value={data.p3Name} onChange={handleChange} error={fieldErrors.p3Name} />
                                        <InputGroup label="Phone" name="p3Phone" value={data.p3Phone} onChange={handleChange} error={fieldErrors.p3Phone} />
                                        <InputGroup label="CNIC" name="p3CNIC" value={data.p3CNIC} onChange={handleChange} error={fieldErrors.p3CNIC} />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* <div className="flex gap-3 mt-4">
                            {participantCount < 3 && <button type="button" onClick={() => setParticipantCount(p => p + 1)} className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-green-400 rounded-lg text-sm font-medium border border-green-500/30">+ Add Member</button>}
                            {participantCount > 1 && <button type="button" onClick={() => setParticipantCount(p => p - 1)} className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-red-400 rounded-lg text-sm font-medium border border-red-500/30">- Remove Member</button>}
                        </div> */}
                    </div>

                    <button type="submit" disabled={uploading} className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-lg rounded-xl shadow-lg shadow-purple-900/20 transition-all transform active:scale-95 disabled:opacity-50">
                        {uploading ? 'Updating Details...' : 'Save Changes'}
                    </button>
                </form>
            </div>
        </div>
    );
};

// Reusable Input with Validation Error
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