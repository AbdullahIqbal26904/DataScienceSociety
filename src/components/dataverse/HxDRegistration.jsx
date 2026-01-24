import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HxDRegistration = () => {
    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
            {/* Animated background elements */}
            <div className="absolute inset-0 -z-10">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className="absolute top-0 left-0 w-full h-full"
                >
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/40 rounded-full filter blur-[150px] animate-pulse" />
                    <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-900/50 rounded-full filter blur-[150px]" />
                    <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-primary/30 rounded-full filter blur-[120px]" />
                    <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-yellow-900/25 rounded-full filter blur-[120px]" />
                </motion.div>
                
                {/* Grid pattern overlay */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBtLTEgMGExIDEgMCAxIDAgMiAwIDEgMSAwIDEgMCAtMiAwIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz48L2c+PC9zdmc+')] opacity-40"></div>
            </div>

            <div className="container mx-auto px-4 py-8 relative z-10">
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link 
                        to="/"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
                    >
                        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span>Back to Home</span>
                    </Link>
                </motion.div>

                {/* Header */}
                <motion.div 
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Collaboration Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6"
                    >
                        <span className="text-sm text-gray-300">A collaboration of</span>
                        <span className="text-sm font-semibold text-blue-400">IBA GDG</span>
                        <span className="text-gray-500">×</span>
                        <span className="text-sm font-semibold text-primary">Data Science Society</span>
                    </motion.div>

                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-primary">
                            Register for
                        </span>
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-500 to-red-500">
                            HxD 2.0
                        </span>
                    </h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-2">
                        Secure your spot in the ultimate tech competition experience
                    </p>
                    <p className="text-primary font-semibold">
                        February 14-15, 2026 • IBA Karachi
                    </p>
                </motion.div>

                {/* Early Bird Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mb-8 max-w-4xl mx-auto"
                >
                    <div className="relative overflow-hidden bg-gradient-to-r from-green-600/20 via-emerald-600/20 to-green-600/20 backdrop-blur-md rounded-2xl border border-green-500/30 p-4 text-center">
                        <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="inline-flex items-center gap-2 bg-green-500 text-black px-4 py-1.5 rounded-full text-sm font-bold"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-900 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-900"></span>
                            </span>
                            EARLY BIRD DISCOUNT - SAVE UP TO 50%
                        </motion.div>
                    </div>
                </motion.div>

                {/* Form Container */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="relative">
                        {/* Glow effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary via-purple-500 to-blue-500 rounded-3xl blur-lg opacity-30"></div>
                        
                        <div className="relative bg-gray-900/80 backdrop-blur-md rounded-3xl border border-gray-700/50 p-2 md:p-4">
                            <div className="relative w-full overflow-hidden rounded-2xl bg-white">
                                <iframe 
                                    src="https://docs.google.com/forms/d/e/1FAIpQLScvXloZLa1QrMXFLWYOiwOhlwt3hfH6JJ3awpkblNk6i6KJPw/viewform?usp=publish-editor?embedded=true"
                                    width="100%" 
                                    height="1200" 
                                    frameBorder="0" 
                                    marginHeight="0" 
                                    marginWidth="0"
                                    title="HxD 2.0 Registration Form"
                                    className="w-full"
                                    style={{ minHeight: '1200px' }}
                                >
                                    Loading…
                                </iframe>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Help Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-12 text-center"
                >
                    <p className="text-gray-400 mb-4">
                        Having trouble with the form? Contact us at{' '}
                        <a href="mailto:dss@iba.edu.pk" className="text-primary hover:underline">
                            dss@iba.edu.pk
                        </a>
                    </p>
                    <div className="flex justify-center gap-4">
                        <a 
                            href="https://docs.google.com/forms/d/1RRL9aoYoHtXWre-ucs2yvdUX7hYnh_Q4sGvR_oVk-rY/edit?ts=697391a5"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Open form in new tab
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default HxDRegistration;
