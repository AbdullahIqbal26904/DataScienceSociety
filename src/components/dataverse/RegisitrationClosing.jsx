import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import dssLogo from '/assets/ds_logo.png'; 

const RegistrationClosed = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white p-4 relative overflow-hidden font-sans">
            {/* Background Pattern (Matches your main form) */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none bg-gray-950/70">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBtLTEgMGExIDEgMCAxIDAgMiAwIDEgMSAwIDEgMCAtMiAwIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDMiLz48L2c+PC9zdmc+')] opacity-40"></div>
            </div>

            <motion.div 
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-center p-8 bg-gray-900/80 backdrop-blur-md rounded-2xl border border-gray-800 shadow-2xl max-w-md w-full"
            >
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 p-1 border border-gray-700"
                >
                    <img src={dssLogo} alt="DSS Logo" className="w-full h-full object-cover rounded-full" />
                </motion.div>
                
                <h2 className="text-3xl font-bold text-red-400 mb-2">Registration Closed</h2>
                <p className="text-gray-300 mb-6">
                    Thank you for the overwhelming response! Registrations for this event are now officially closed.
                </p>
                
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-left mb-8">
                    <div className="flex gap-3 items-start">
                        <span className="text-xl">🔒</span>
                        <div>
                            <p className="text-red-200 font-semibold text-sm">Missed the deadline?</p>
                            <p className="text-red-200/70 text-xs mt-1 leading-relaxed">
                                Stay tuned to our social media channels for future events, workshops, and updates. We hope to see you next time!
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center w-full">
                    <Link to="/" className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white rounded-xl text-sm font-medium w-full text-center transition-all shadow-lg">
                        Return to Home
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default RegistrationClosed;