import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import dssLogo from '/assets/ds_logo.png'; 

// --- CONFIGURATION ---
const PAYMENT_LINKS = {
    1: import.meta.env.VITE_PAYMENT_LINK_1,
    2: import.meta.env.VITE_PAYMENT_LINK_2,
    3: import.meta.env.VITE_PAYMENT_LINK_3,
    4: import.meta.env.VITE_PAYMENT_LINK_4 
};

const MODULES = [
    { id: 'game-dev', name: 'Game Dev', early: 500, normal: 1000, max: 3 },
    { id: 'shark-tank', name: 'Shark Tank', early: 700, normal: 1500, max: 4 }, 
    { id: 'csi', name: 'Crime Scene Investigation', early: 700, normal: 1500, max: 3 },
    { id: 'gen-ai', name: 'Gen AI', early: 500, normal: 1000, max: 3 },
    { id: 'ml', name: 'Machine Learning', early: 700, normal: 1500, max: 3 },
    { id: 'ui-ux', name: 'UI/UX', early: 500, normal: 1000, max: 2 }, 
    { id: 'cp', name: 'Competitive Programming', early: 700, normal: 1500, max: 3 ,disabled: true},
    { id: 'data', name: 'Data Analytics', early: 500, normal: 1000, max: 2 }, 
    { id: 'web-dev', name: 'Web Development', early: 500, normal: 1000, max: 3 },
];

const HxDRegistration = () => {
    // --- STATE ---
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [participantCount, setParticipantCount] = useState(1);
    const [errors, setErrors] = useState({}); 
    const [totalCost, setTotalCost] = useState(0);
    const [isEarlyBird, setIsEarlyBird] = useState(true);
    
    // ✅ DEFAULT IS FALSE: "No" will be selected on every page load
    const [isIBA, setIsIBA] = useState(false); 

    const [paymentClicked, setPaymentClicked] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    // --- 🔒 SANITIZER FUNCTION ---
    const sanitizeInput = (value) => {
        return value.replace(/[<>;\[\]\/\\\\]/g, "");
    };
    
    useEffect(() => {
        const deadline = new Date(2026, 1, 12, 23, 59, 59);
        const today = new Date();
        setIsEarlyBird(today < deadline);
    }, []);

    const [formData, setFormData] = useState({
        teamName: '', competitions: [], institute: '',
        leadName: '', leadPhone: '', leadEmail: '', leadCNIC: '',
        p2Name: '', p2Phone: '', p2CNIC: '',
        p3Name: '', p3Phone: '', p3CNIC: '',
        p4Name: '', p4Phone: '', p4CNIC: '',
        baCode: '',
        orderNumber: '' 
    });
    const isFreeEntry = isIBA && formData.competitions.includes("Shark Tank");
    // ✅ Load Data from LocalStorage (BUT IGNORE isIBA to keep it false)
    useEffect(() => {
        const savedData = localStorage.getItem("hxd_form_progress");
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                setFormData(prev => ({ ...prev, ...parsed.formData }));
                if (parsed.paymentClicked !== undefined) setPaymentClicked(parsed.paymentClicked);
                if (parsed.participantCount) setParticipantCount(parsed.participantCount);
                // We intentionally do NOT load isIBA here. It stays false.
            } catch (e) {
                console.error("Failed to load saved data", e);
            }
        }
    }, []);

    useEffect(() => {
        const dataToSave = { formData, paymentClicked, participantCount };
        localStorage.setItem("hxd_form_progress", JSON.stringify(dataToSave));
    }, [formData, paymentClicked, participantCount]);

    // ✅ Cost Calculation Logic (Free for IBA Shark Tank)
    useEffect(() => {
        let total = 0;
        formData.competitions.forEach(compName => {
            const module = MODULES.find(m => m.name === compName);
            if (module) {
                if (compName === 'Shark Tank' && isIBA) {
                    total += 0;
                } else {
                    const pricePerPerson = isEarlyBird ? module.early : module.normal;
                    total += (pricePerPerson * participantCount);
                }
            }
        });
        setTotalCost(total);
    }, [formData.competitions, participantCount, isEarlyBird, isIBA]);

    const getMaxTeamSize = () => {
        if (formData.competitions.length === 0) return 3; 
        const limits = formData.competitions.map(compName => {
            const mod = MODULES.find(m => m.name === compName);
            return mod ? mod.max : 3;
        });
        return Math.min(...limits);
    };

    const validateField = (name, value) => {
        let errorMsg = null;
        const cnicRegex = /^\d{13}$/; 
        const erpRegex = /^\d{4,6}$/; // ✅ ERP usually 4-6 digits
        const phoneRegex = /^03\d{9}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const cleanVal = value.replace(/-/g, '').replace(/\s/g, '');

        if (name.includes('Name') && !value.trim()) errorMsg = "Required";
        
        // ✅ UPDATE: Skip Institute check if IBA is selected
        else if (name.includes('institute') && !isIBA && !value.trim()) errorMsg = "Required";
        
        // ✅ Only require Order ID if cost > 0
        else if (name.includes('orderNumber') && totalCost > 0 && !value.trim()) errorMsg = "Order ID Required"; 
        
        else if (name.includes('Email') && !emailRegex.test(value)) errorMsg = "Invalid Email";
        else if (name.includes('Phone') && !phoneRegex.test(cleanVal)) errorMsg = "Format: 03XXXXXXXXX";
        
        // ✅ Dynamic ID Validation
        else if (name.includes('CNIC')) {
            if (isIBA) {
                 if (!erpRegex.test(cleanVal)) errorMsg = "Invalid ERP (4-6 digits)";
            } else {
                 if (!cnicRegex.test(cleanVal)) errorMsg = "Must be 13 digits";
            }
        }

        setErrors(prev => ({ ...prev, [name]: errorMsg }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const cleanValue = sanitizeInput(value);
        setFormData(prev => ({ ...prev, [name]: cleanValue }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        validateField(name, value);
    };

    const toggleModule = (moduleName) => {
        // ✅ FORCE RESET: If Shark Tank is clicked, reset IBA to false ("No")
        if (moduleName === 'Shark Tank') {
            setIsIBA(false); 
        }

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
        const phoneRegex = /^03\d{9}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        // ✅ Dynamic Validation Config
        const idRegex = isIBA ? /^\d{4,6}$/ : /^\d{13}$/; 
        const idLabel = isIBA ? "ERP" : "CNIC";
        const idErrorMsg = isIBA ? "Must be 4-6 digits" : "Must be 13 digits";

        if (!formData.teamName.trim()) newErrors.teamName = "Team Name";
        
        // ✅ UPDATE: Skip Institute check if IBA
        if (!isIBA && !formData.institute.trim()) newErrors.institute = "Institute";
        
        if (formData.competitions.length === 0) newErrors.competitions = "Modules";
        
        // ✅ Skip Order Number check if free
        if (totalCost > 0 && !formData.orderNumber.trim()) {
            newErrors.orderNumber = "Order Number is required"; 
        }

        const allowedMax = getMaxTeamSize();
        if (participantCount > allowedMax) {
            newErrors.competitions = `You have ${participantCount} members, but one of your modules only allows ${allowedMax}.`;
        }

        // Lead Validation
        if (!formData.leadName.trim()) newErrors.leadName = "Lead Name";
        if (!emailRegex.test(formData.leadEmail)) newErrors.leadEmail = "Lead Email";
        if (!phoneRegex.test(formData.leadPhone.replace(/-/g, ''))) newErrors.leadPhone = "Lead Phone";
        if (!idRegex.test(formData.leadCNIC.replace(/-/g, ''))) newErrors.leadCNIC = `Lead ${idLabel}: ${idErrorMsg}`;

        // Participants Validation
        if (participantCount >= 2) {
            if (!formData.p2Name.trim()) newErrors.p2Name = "P2 Name";
            if (!phoneRegex.test(formData.p2Phone.replace(/-/g, ''))) newErrors.p2Phone = "P2 Phone";
            if (!idRegex.test(formData.p2CNIC.replace(/-/g, ''))) newErrors.p2CNIC = `P2 ${idLabel}: ${idErrorMsg}`;
        }
        if (participantCount >= 3) {
            if (!formData.p3Name.trim()) newErrors.p3Name = "P3 Name";
            if (!phoneRegex.test(formData.p3Phone.replace(/-/g, ''))) newErrors.p3Phone = "P3 Phone";
            if (!idRegex.test(formData.p3CNIC.replace(/-/g, ''))) newErrors.p3CNIC = `P3 ${idLabel}: ${idErrorMsg}`;
        }
        if (participantCount >= 4) {
            if (!formData.p4Name.trim()) newErrors.p4Name = "P4 Name";
            if (!phoneRegex.test(formData.p4Phone.replace(/-/g, ''))) newErrors.p4Phone = "P4 Phone";
            if (!idRegex.test(formData.p4CNIC.replace(/-/g, ''))) newErrors.p4CNIC = `P4 ${idLabel}: ${idErrorMsg}`;
        }

        return newErrors;
    };

    const handlePaymentClick = async (e) => {
        e.preventDefault(); 
        setSubmitError(null); 
        const validationErrors = getValidationErrors();

        // ✅ If free, bypass validation for order number & skip payment link
        if (totalCost === 0) {
            if (validationErrors.orderNumber) delete validationErrors.orderNumber; 
            
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                setSubmitError("Please fill in all Team & Participant details first.");
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            setPaymentClicked(true);
            setFormData(prev => ({ ...prev, orderNumber: "IBA-FREE-Pass" })); 
            return;
        }       
        
        // Standard Payment Flow
        if (validationErrors.orderNumber) delete validationErrors.orderNumber;

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setSubmitError("Please fill in all Team & Participant details before making a payment.");
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return; 
        }

        setPaymentClicked(true); 

        // Draft Payload
        const payload = { 
            ...formData, 
            institute: isIBA ? 'IBA' : formData.institute, // ✅ Ensure IBA is sent
            competition: formData.competitions.join(', '),
            totalPaid: totalCost,
            participantCount: participantCount,
            status: 'PENDING_PAYMENT',
            orderNumber: "PAYMENT_INITIATED"
        };

        try {
            fetch("/api/submit", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
        } catch (err) {
            console.error("Draft save failed", err);
        }

        window.open(PAYMENT_LINKS[participantCount], '_blank');
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
        
        if (!isFreeEntry && !paymentClicked) {
            setSubmitError(totalCost === 0 ? "Please click 'Confirm Free Entry' first." : "Please click the Payment Link to initiate your transaction.");
            return;
        }
        if (!isFreeEntry && !formData.orderNumber) {
            setSubmitError("Please enter the Order ID / Transaction Reference.");
            return;
        }

        setLoading(true);

        try {
            const payload = { 
                ...formData, 
                institute: isIBA ? 'IBA' : formData.institute, // ✅ Ensure IBA is sent
                competition: formData.competitions.join(', '),
                totalPaid: totalCost,
                participantCount: participantCount,
                status: 'VERIFICATION_NEEDED', 
                orderNumber: formData.orderNumber 
            };

            const response = await fetch("/api/submit", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload), 
            });

            const result = await response.json();

            if (result.result === "retry") {
                setSubmitError("Server is busy! Retrying in 3 seconds...");
                setTimeout(() => handleSubmit(e), 3000); 
                return;
            }

            if (result.result === "error") {
                setSubmitError(result.message);
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setLoading(false);
            } else {
                localStorage.removeItem("hxd_form_progress"); 
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
                    
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-left">
                        <div className="flex gap-3">
                            <span className="text-xl">⏳</span>
                            <div>
                                <p className="text-blue-200 font-semibold text-sm">Verification in Progress</p>
                                <p className="text-blue-200/70 text-xs mt-1 leading-relaxed">
                                    We will verify your details. Once approved, you will receive a confirmation email.
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
                
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
                        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        <span>Back to Home</span>
                    </Link>

                    <div className="flex gap-6 text-sm font-medium">
                        <Link to="/modules" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-1">
                             Module Details
                        </Link>
                        <Link to="/faq" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-1">
                           FAQs
                        </Link>
                    </div>
                </div>
                <div className="text-center mb-10">
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
                        
                        <div className="mt-3 mb-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-start gap-3">
                            <span className="text-blue-400 text-sm mt-0.5">📅</span>
                            <div className="flex-1 space-y-2">
                                <p className="text-xs text-blue-200/80 leading-relaxed">
                                    <strong>Important:</strong> All modules will be conducted <strong>simultaneously</strong>.
                                </p>
                                <p className="text-xs text-blue-200/80 leading-relaxed">
                                    <strong>Important:</strong> All modules Prices are per <strong>person</strong>.
                                </p>
                            </div>
                        </div>
                        
                        <div className="grid gap-3">
                           {MODULES.map((mod) => {
    const isLimitExceeded = mod.disabled; // Check if module is disabled

    return (
        <label 
            key={mod.id} 
            className={`relative flex items-center p-3 rounded-xl transition-all border 
                ${isLimitExceeded ? 'opacity-60 cursor-not-allowed bg-gray-900/50 border-gray-800' : 
                  formData.competitions.includes(mod.name) ? 'bg-purple-900/20 border-purple-500/50 cursor-pointer' : 
                  'bg-gray-800/50 border-gray-700 hover:border-gray-600 cursor-pointer'}`}
        >
            <input 
                type="checkbox" 
                className="w-5 h-5 accent-purple-500 rounded disabled:opacity-50" 
                checked={formData.competitions.includes(mod.name)} 
                onChange={() => !isLimitExceeded && toggleModule(mod.name)} // Prevent toggle if disabled
                disabled={isLimitExceeded} 
            />
            <div className="ml-4 flex-1">
                <div className="flex justify-between items-center">
                    <span className={`font-medium ${formData.competitions.includes(mod.name) ? 'text-white' : 'text-gray-300'}`}>
                        {mod.name} 
                        <span className="ml-2 text-[10px] uppercase bg-gray-700 text-gray-400 px-1.5 py-0.5 rounded border border-gray-600">
                            Max {mod.max}
                        </span>
                    </span>
                    
                    <div className="text-right flex flex-col items-end">
                        {isLimitExceeded ? (
                            <span className="text-red-400 font-bold text-xs uppercase tracking-tighter bg-red-400/10 px-2 py-1 rounded border border-red-400/20">
                                🚫 Limit Exceeded
                            </span>
                        ) : (
                            <>
                                {isEarlyBird && (
                                    <span className="text-[10px] text-gray-500 line-through decoration-red-500/50">
                                        Rs {mod.normal}
                                    </span>
                                )}
                                <span className={`font-mono text-sm px-2 py-0.5 rounded flex items-center gap-1 ${isEarlyBird ? 'text-green-400 bg-green-400/10' : 'text-yellow-400 bg-yellow-400/10'}`}>
                                    Rs {isEarlyBird ? mod.early : mod.normal} 
                                    <span className="text-[10px] opacity-70 font-sans">/ person</span>
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </label>
    );
})}
                        </div>
                        {errors.competitions && <p className="text-red-400 text-sm mt-2">⚠ {errors.competitions}</p>}
                        
                        {/* ✅ IBA Toggle Section */}
                        {formData.competitions.includes('Shark Tank') && (
                            <div className="mt-4 p-4 bg-purple-900/20 border border-purple-500/30 rounded-xl animate-in fade-in slide-in-from-top-2">
                                <p className="text-sm font-semibold text-purple-300 mb-2">Are you from IBA?</p>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input 
                                            type="radio" 
                                            name="isIBA" 
                                            className="accent-purple-500 w-4 h-4"
                                            checked={isIBA === true} 
                                            onChange={() => setIsIBA(true)} 
                                        />
                                        <span className="text-sm text-gray-300">Yes</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input 
                                            type="radio" 
                                            name="isIBA" 
                                            className="accent-purple-500 w-4 h-4"
                                            checked={isIBA === false} 
                                            onChange={() => setIsIBA(false)} 
                                        />
                                        <span className="text-sm text-gray-300">No</span>
                                    </label>
                                </div>
                                {isIBA && (
                                    <p className="text-xs text-green-400 mt-2">
                                        ✨ Shark Tank fee waived! You will enter ERP instead of CNIC.
                                        {formData.competitions.length > 1 && <span className="text-yellow-400 block mt-1">Note: You still have to pay for other modules.</span>}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* TEAM DETAILS */}
                    <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
                        <h3 className="text-xl font-semibold text-purple-400 mb-4">Team Details</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <InputGroup label="Team Name" name="teamName" value={formData.teamName} onChange={handleChange} onBlur={handleBlur} error={errors.teamName} required />
                            {/* ✅ Hide Institute Name if IBA selected */}
                            {!isIBA && (
                                <InputGroup label="Institute Name" name="institute" value={formData.institute} onChange={handleChange} onBlur={handleBlur} error={errors.institute} required />
                            )}
                            <InputGroup 
                                label="Brand Ambassador Code (Optional)" 
                                name="baCode" 
                                value={formData.baCode} 
                                onChange={handleChange} 
                                placeholder="e.g. 17h12h"
                            />
                        </div>
                    </div>

                    {/* PARTICIPANTS SECTION */}
                    <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
                        <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
                            <h3 className="text-xl font-semibold text-blue-400">Participants</h3>
                            <span className="text-xs font-bold text-gray-400 bg-gray-800 px-3 py-1 rounded-full border border-gray-700">
                                {participantCount} Member{participantCount > 1 ? 's' : ''}
                            </span>
                        </div>

                        {/* Leader */}
                        <div className="mb-6">
                            <h4 className="text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">Team Lead</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                                <InputGroup label="Full Name" name="leadName" value={formData.leadName} onChange={handleChange} onBlur={handleBlur} error={errors.leadName} required />
                                <InputGroup label="Phone Number" name="leadPhone" value={formData.leadPhone} onChange={handleChange} onBlur={handleBlur} error={errors.leadPhone} required />
                                <InputGroup label="Email" name="leadEmail" value={formData.leadEmail} onChange={handleChange} onBlur={handleBlur} error={errors.leadEmail} required />
                                <InputGroup label={isIBA ? "ERP (ID)" : "CNIC (13 digits)"} name="leadCNIC" value={formData.leadCNIC} onChange={handleChange} onBlur={handleBlur} error={errors.leadCNIC} required />
                            </div>
                        </div>

                        {/* P2, P3, P4 Sections */}
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
                                        <InputGroup label={isIBA ? "ERP (ID)" : "CNIC (13 digits)"} name="p2CNIC" value={formData.p2CNIC} onChange={handleChange} onBlur={handleBlur} error={errors.p2CNIC} required />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

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
                                        <InputGroup label={isIBA ? "ERP (ID)" : "CNIC (13 digits)"} name="p3CNIC" value={formData.p3CNIC} onChange={handleChange} onBlur={handleBlur} error={errors.p3CNIC} required />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <AnimatePresence>
                            {participantCount >= 4 && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }} 
                                    animate={{ opacity: 1, height: 'auto' }} 
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mb-6 pt-6 border-t border-gray-800 overflow-hidden"
                                >
                                    <div className="flex justify-between items-center mb-3">
                                        <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider">Participant 04 (Shark Tank Only)</h4>
                                        <button type="button" onClick={() => setParticipantCount(3)} className="text-xs text-red-400 hover:text-red-300">Remove ✕</button>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <InputGroup label="Full Name" name="p4Name" value={formData.p4Name} onChange={handleChange} onBlur={handleBlur} error={errors.p4Name} required />
                                        <InputGroup label="Phone Number" name="p4Phone" value={formData.p4Phone} onChange={handleChange} onBlur={handleBlur} error={errors.p4Phone} required />
                                        <InputGroup label={isIBA ? "ERP (ID)" : "CNIC (13 digits)"} name="p4CNIC" value={formData.p4CNIC} onChange={handleChange} onBlur={handleBlur} error={errors.p4CNIC} required />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* DYNAMIC ADD BUTTON */}
                        {participantCount < getMaxTeamSize() && (
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
                        
                        {participantCount === getMaxTeamSize() && (
                            <p className="text-center text-xs text-gray-500 mt-2">
                                Max Limit Reached for selected modules.
                            </p>
                        )}
                    </div>

{/* ✅ Only show the Payment Verification container if there is a cost OR it's a free entry that needs confirmation */}
{/* ✅ Show if there's a cost OR if they need to confirm their free entry */}
{(totalCost > 0 || isFreeEntry) && (
    <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
        <h3 className="text-xl font-semibold text-white mb-4">Payment Verification</h3>

        {/* If totalCost > 0, they MUST pay (even if they are IBA, 
           because they selected additional paid modules).
           Only show the 'Free Flow' if the final cost is actually 0.
        */}
        {(isFreeEntry && totalCost === 0) ? (
            /* 🎉 PURELY FREE FLOW (IBA + Shark Tank Only) */
            <div className="bg-green-500/10 border border-green-500/30 p-6 rounded-lg text-center animate-in fade-in zoom-in duration-300">
                <span className="text-4xl">🎉</span>
                <h4 className="text-xl font-bold text-green-400 mt-2">Registration is Free!</h4>
                <p className="text-sm text-gray-300 mt-1 mb-4">
                    Since you are from <strong>IBA</strong> and selected <strong>Shark Tank</strong>, the fee is waived.
                </p>
                <button 
                    type="button" 
                    onClick={handlePaymentClick}
                    disabled={paymentClicked}
                    className={`px-6 py-2 rounded-lg font-bold transition-all border ${
                        paymentClicked 
                        ? 'bg-green-600/20 border-green-500 text-green-400 cursor-default' 
                        : 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600 hover:border-gray-500'
                    }`}
                >
                    {paymentClicked ? "✓ Verified & Ready to Submit" : "Click to Confirm Free Entry"}
                </button>
            </div>
        ) : (
            /* 💲 PAID FLOW (Standard users OR IBA students taking extra paid modules) */
            <>
                <div className="bg-gray-950/50 p-4 rounded-lg mb-4 border border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-left w-full">
                        <p className="text-gray-400 text-sm">Total Amount:</p>
                        <div className="text-2xl font-bold text-green-400">Rs {totalCost}</div>
                        {isFreeEntry && <p className="text-xs text-purple-400 mt-1">✨ Shark Tank discount applied!</p>}
                        <p className="text-xs text-gray-500 mt-1">{isEarlyBird ? 'Early Bird' : 'Standard'} Price x {participantCount} Participant{participantCount > 1 ? 's' : ''}</p>
                    </div>
                    
                    <button 
                        type="button" 
                        onClick={handlePaymentClick}
                        className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-lg text-center shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
                    >
                        <span>Click here to Pay</span>
                        <span className="text-lg">↗</span>
                    </button>
                </div>

                <div className="flex flex-col relative">
                    <InputGroup 
                        label="Order ID / Transaction Reference" 
                        name="orderNumber" 
                        value={formData.orderNumber} 
                        onChange={handleChange} 
                        onBlur={handleBlur} 
                        error={errors.orderNumber} 
                        placeholder="e.g. 123456789"
                        required={true}
                    />
                </div>
            </>
        )}
    </div>
)}
                    <button type="submit" disabled={loading} className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-lg rounded-xl shadow-lg shadow-purple-900/20 transition-all transform active:scale-95 disabled:opacity-50">
                        {loading ? 'Submitting...' : 'Complete Registration'}
                    </button>
                </form>
            </div>
        </div>
    );
};

// Input Component (Unchanged)
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