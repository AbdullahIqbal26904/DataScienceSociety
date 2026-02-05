import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const OVERVIEW_PDF_LINK = "/assets/HxD 2.0 Detailed Module Overview.pdf"; 

// ✅ UPDATE: Answers are now JSX elements instead of just strings
const FAQS = [
    {
        question: "What is Hackfest x Datathon?",
        answer: "Hackfest x Datathon, a power-packed collaboration between GDGoC IBA and IBA DSS is a two-day tech extravaganza blending learning, networking and fierce competition. Featuring panel discussions, tech talks, competitions and high-stakes challenges like the Shark Tank module, it is the ultimate platform for techies to compete and connect."
    },
    {
        question: "Is there a refund policy?",
        answer: "No, registration fees are strictly non-refundable."
    },
    {
        question: "Who can participate?",
        answer: "No matter your expertise - highschool student or industry pro - Hackfest x Datathon is open to all! Whether you're exploring tech or already making waves in the industry, this is the place to be."
    },
    {
        question: "When and where will the event take place?",
        answer: "The event will take place on the 14th and 15th of February at the IBA Main Campus in Karachi."
    },
    {
        question: "What are the modules and how many team members are needed?",
        answer: (
            <span>
                The event features multiple modules with specific team sizes. You can view the full list and detailed guidelines on our 
                <Link to="/modules" className="text-blue-400 hover:text-blue-300 font-semibold ml-1 underline">
                    Module Details Page
                </Link>.
            </span>
        )
    },
    {
        question: "Do we have to bring our own laptops?",
        answer: "Yes, participants are required to bring their own laptops for the event."
    },
    {
        question: "Will there be positions or just one winner for all module?",
        answer: "There will be a winner and a runner up for each module!"
    },
    {
        question: "How do we register?",
        answer: (
            <span>
                Registration is now open! You can secure your spot immediately by visiting our 
                <Link to="/register" className="text-blue-400 hover:text-blue-300 font-semibold ml-1 underline">
                    Registration Page
                </Link>.
            </span>
        )
    },
    {
        question: "What are the timings of the event?",
        // 🔥 CUSTOM BREAKDOWN STYLE
        answer: (
            <div className="space-y-3">
                <p>The event timings breakdown is:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                        <h4 className="text-blue-400 font-bold text-sm mb-2">📅 Day 1 (Feb 14)</h4>
                        <ul className="text-xs space-y-1 list-disc list-inside text-gray-300">
                            <li>09:00 AM - 10:00 AM - Registration</li>
                            <li>10:00 AM - 11:00 AM - Opening Ceremony</li>
                            <li>11:00 AM - 01:00 PM - Panel Talks</li>
                            <li>01:00 PM - 02:00 PM - Lunch Break</li>
                            <li>02:00 PM - 06:00 PM - Modules</li>
                        </ul>
                    </div>
                    <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                        <h4 className="text-purple-400 font-bold text-sm mb-2">📅 Day 2 (Feb 15)</h4>
                        <ul className="text-xs space-y-1 list-disc list-inside text-gray-300">
                            <li>10:00 AM - 11:00 AM - Entry</li>
                            <li>11:00 AM - 01:00 PM - Modules</li>
                            <li>01:00 PM - 02:00 PM - Lunch Break</li>
                            <li>03:00 PM - 04:00 PM - Speaker Session</li>
                            <li>04:00 PM - 05:00 PM - Closing Ceremony</li>
                        </ul>
                    </div>
                </div>
                {/* Disclaimer Added Below */}
            <p className="text-[12px] text-gray-500 italic text-center mt-1">
                * Note: These timings are tentative and subject to change.
            </p>
            </div>
        )
    },
    {
        question: "Can we register for more than one module?",
        answer: "The modules will be conducted on both days simultaneously. If you wish to participate in more than one module, your team can register for them; however, you must manage your own resources and time splitting. Organizers will not delay sessions to accommodate clashes."
    },
    {
        question: "Where can we find more details about the modules?",
        answer: (
            <span>
                You can find detailed rules, prize pools, and judging criteria on the 
                <Link to="/modules" className="text-blue-400 hover:text-blue-300 font-semibold mx-1 underline">
                    Modules Page
                </Link> 
                or download the 
                <a href={OVERVIEW_PDF_LINK} target="_blank" rel="noreferrer" className="text-purple-400 hover:text-purple-300 font-semibold ml-1 underline">
                    Official PDF Guide
                </a>.
            </span>
        )
    },
    {
        question: "What’s the WiFi and AI policy for the modules?",
        answer: (
            <span>
                These policies are module-dependent. Please check the specific guidelines for your competition on the
                <Link to="/modules" className="text-blue-400 hover:text-blue-300 font-semibold ml-1 underline">
                    Module Details Page
                </Link>.
            </span>
        )
    },
];

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <div className="min-h-screen relative overflow-hidden font-sans text-gray-200">
            {/* Background */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none bg-gray-950/70">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBtLTEgMGExIDEgMCAxIDAgMiAwIDEgMSAwIDEgMCAtMiAwIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDMiLz48L2c+PC9zdmc+')] opacity-40"></div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-3xl pt-20">
                {/* Header */}
                <div className="mb-10">
                    <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors group">
                        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        <span>Back to Home</span>
                    </Link>
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-2">Frequently Asked Questions</h1>
                    <p className="text-gray-400">Everything you need to know about the event.</p>
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                    {FAQS.map((faq, index) => (
                        <div key={index} className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-colors">
                            <button 
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className="w-full text-left p-5 flex justify-between items-center focus:outline-none"
                            >
                                <span className="font-semibold text-lg text-gray-200">{faq.question}</span>
                                <span className={`text-2xl text-blue-500 transition-transform duration-300 ${activeIndex === index ? 'rotate-45' : ''}`}>+</span>
                            </button>
                            
                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-5 pt-0 text-gray-400 leading-relaxed border-t border-gray-800/50">
                                            {/* ✅ DIRECTLY RENDER THE JSX ANSWER */}
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;