import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

// --- OPTIMIZATION 1: Move static data OUTSIDE the component ---
// This prevents Javascript from recreating these arrays on every single render.
const COMPETITIONS = [
    { name: "Game Development", earlyBird: 500, normal: 1000, teamSize: 3, category: "dev", icon: "GD", color: "from-purple-500 to-pink-500" },
    { name: "Shark Tank", earlyBird: 700, normal: 1500, teamSize: 4, category: "business", icon: "ST", color: "from-blue-500 to-cyan-500" },
    { name: "UI/UX Design", earlyBird: 500, normal: 1000, teamSize: 2, category: "design", icon: "UX", color: "from-pink-500 to-rose-500" },
    { name: "CSI (Crime Scene Investigation)", earlyBird: 700, normal: 1000, teamSize: 3, category: "misc", icon: "CSI", color: "from-amber-500 to-orange-500" },
    { name: "Competitive Programming", earlyBird: 700, normal: 1500, teamSize: 3, category: "dev", icon: "CP", color: "from-yellow-500 to-amber-500" },
    { name: "Data Analytics", earlyBird: 500, normal: 1000, teamSize: 2, category: "data", icon: "DA", color: "from-teal-500 to-cyan-500" },
    { name: "Generative AI", earlyBird: 500, normal: 1000, teamSize: 3, category: "ai", icon: "GAI", color: "from-violet-500 to-purple-500" },
    { name: "ML Competition", earlyBird: 750, normal: 1500, teamSize: 3, category: "ai", icon: "ML", color: "from-indigo-500 to-blue-500" },
    { name: "Web Development", earlyBird: 500, normal: 1000, teamSize: 3, category: "dev", icon: "WD", color: "from-sky-500 to-blue-500" },
];

const CATEGORIES = [
    { id: 'all', label: 'All Events' },
    { id: 'dev', label: 'Development' },
    { id: 'ai', label: 'AI/ML' },
    { id: 'data', label: 'Data' },
    { id: 'design', label: 'Design' },
    { id: 'business', label: 'Business' },
    { id: 'misc', label: 'Others' },
];

// --- OPTIMIZATION 2: Isolate the Timer ---
// This component re-renders every second, but it's small.
// The rest of the page (DataverseSection) will NOW stay static.
const CountdownTimer = () => {
    const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const targetDate = new Date('February 14, 2026 09:00:00').getTime();
        
        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = targetDate - now;
            
            if (distance < 0) return;
            
            setTimeRemaining({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        };
        
        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    }, []);

    const timeUnits = [
        { label: "Days", value: timeRemaining.days, color: "from-blue-400 via-blue-500 to-indigo-600", glow: "shadow-blue-500/50" },
        { label: "Hours", value: timeRemaining.hours, color: "from-purple-400 via-purple-500 to-pink-600", glow: "shadow-purple-500/50" },
        { label: "Minutes", value: timeRemaining.minutes, color: "from-amber-400 via-primary to-orange-500", glow: "shadow-primary/50" },
        { label: "Seconds", value: timeRemaining.seconds, color: "from-rose-400 via-red-500 to-orange-500", glow: "shadow-rose-500/50" }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto">
            {timeUnits.map((item, index) => (
                <motion.div 
                    key={index} 
                    className="relative group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                >
                    {/* Animated glow ring */}
                    <div className={`absolute -inset-1 bg-gradient-to-r ${item.color} rounded-3xl blur-lg opacity-40 group-hover:opacity-70 transition-all duration-500`}></div>
                    
                    <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-white/10 p-5 md:p-8 text-center overflow-hidden">
                        {/* Inner gradient accent */}
                        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color}`}></div>
                        
                        {/* Floating particles effect */}
                        <div className="absolute inset-0 overflow-hidden opacity-30">
                            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse"></div>
                            <div className="absolute top-3/4 right-1/4 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-300"></div>
                        </div>
                        
                        <motion.div 
                            className={`text-4xl md:text-6xl font-black bg-gradient-to-b ${item.color} bg-clip-text text-transparent mb-2`}
                            key={item.value}
                            initial={{ scale: 1.2, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            {item.value < 10 ? `0${item.value}` : item.value}
                        </motion.div>
                        <div className="text-xs md:text-sm text-gray-400 uppercase tracking-[0.2em] font-semibold">
                            {item.label}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

const DataverseSection = () => {
    const [activeCategory, setActiveCategory] = useState('all');

    // Memoize filtering to prevent recalculation on unrelated renders
    const filteredCompetitions = useMemo(() => {
        return activeCategory === 'all' 
            ? COMPETITIONS 
            : COMPETITIONS.filter(c => c.category === activeCategory);
    }, [activeCategory]);

    return (
        <section id="dataverse" className="py-24 relative overflow-hidden">
            {/* Enhanced Background */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                {/* Animated gradient orbs */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-r from-primary/15 to-pink-600/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-600/10 to-emerald-600/10 rounded-full blur-3xl"></div>
                
                {/* Grid pattern overlay */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBtLTEgMGExIDEgMCAxIDAgMiAwIDEgMSAwIDEgMCAtMiAwIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz48L2c+PC9zdmc+')] opacity-60"></div>
                
                {/* Radial gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Collaboration badge */}
                    <motion.div 
                        className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 mb-8"
                        whileHover={{ scale: 1.02 }}
                    >
                        <span className="text-sm text-gray-300">A collaboration of</span>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">IBA GDG</span>
                            <span className="text-xl text-primary font-black">×</span>
                            <span className="text-sm font-bold bg-gradient-to-r from-primary to-yellow-400 bg-clip-text text-transparent">Data Science Society</span>
                        </div>
                    </motion.div>

                    {/* Main Title */}
                    <motion.h2 
                        className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                            Hackfest
                        </span>
                        <span className="text-white mx-2 md:mx-4 animate-pulse">×</span>
                        <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-400 to-rose-500 drop-shadow-[0_0_30px_rgba(234,179,8,0.5)]">
                            Datathon
                        </span>
                        <span className="block md:inline text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-400 text-4xl md:text-6xl lg:text-7xl mt-2 md:mt-0 md:ml-4">
                            2.0
                        </span>
                    </motion.h2>
                    
                    <motion.p 
                        className="text-xl md:text-2xl lg:text-3xl text-gray-300 font-light mb-6 max-w-3xl mx-auto"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        The Ultimate Tech Competition Experience
                    </motion.p>
                    
                    {/* Date badge */}
                    <motion.div 
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-primary/20 to-yellow-500/20 border border-primary/30 rounded-full px-8 py-4"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-lg md:text-xl font-bold text-primary">February 14-15, 2026</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-lg text-gray-300">IBA Karachi</span>
                    </motion.div>
                </motion.div>

                {/* Registration Open Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <div className="relative overflow-hidden rounded-3xl max-w-4xl mx-auto">
                        {/* Animated border gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-emerald-400 to-green-500 animate-gradient-x"></div>
                        <div className="absolute inset-[2px] bg-gray-900 rounded-3xl"></div>
                        
                        <div className="relative p-8 md:p-10 text-center">
                            {/* Live badge */}
                            <motion.div 
                                className="inline-flex items-center gap-2 bg-green-500 text-black px-6 py-2 rounded-full text-sm font-bold mb-4"
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            >
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-900 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-900"></span>
                                </span>
                                REGISTRATIONS NOW OPEN
                            </motion.div>
                            
                            <h3 className="text-3xl md:text-4xl font-black text-white mb-3">
                                Early Bird Discount <span className="text-green-400">Available!</span>
                            </h3>
                            <p className="text-lg text-gray-300 mb-2">
                                Register now and save up to <span className="text-green-400 font-bold text-xl">50%</span> on registration fees
                            </p>
                            <p className="text-sm text-gray-500">Limited time offer • Don't miss out!</p>
                        </div>
                    </div>
                </motion.div>

                {/* Countdown Timer Section */}
                <motion.div 
                    className="mb-20"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="text-center mb-8">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Event Starts In</h3>
                        <p className="text-gray-400">Mark your calendars!</p>
                    </div>
                    <CountdownTimer />
                </motion.div>

                {/* Competition Modules Section */}
                <motion.div 
                    className="mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="text-center mb-10">
                        <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
                            Competition Modules
                        </h3>
                        <p className="text-gray-400 max-w-2xl mx-auto">Choose from 9 exciting competitions across various domains</p>
                    </div>
                    
                    {/* Category Filters */}
                    <div className="flex flex-wrap justify-center gap-3 mb-10">
                        {CATEGORIES.map((cat) => (
                            <motion.button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                                    activeCategory === cat.id
                                        ? 'bg-gradient-to-r from-primary via-yellow-500 to-secondary text-black shadow-lg shadow-primary/30'
                                        : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80 border border-gray-700 hover:border-gray-600'
                                }`}
                            >
                                {cat.label}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Competition Grid */}
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-16"
                    layout
                >
                    <AnimatePresence mode="popLayout">
                        {filteredCompetitions.map((comp, index) => (
                            <motion.div
                                key={comp.name}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                                className="group relative"
                            >
                                {/* Card glow effect */}
                                <div className={`absolute -inset-0.5 bg-gradient-to-r ${comp.color} rounded-2xl blur opacity-0 group-hover:opacity-60 transition-all duration-500`}></div>
                                
                                <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden h-full group-hover:border-transparent transition-all duration-300">
                                    {/* Top gradient bar */}
                                    <div className={`h-1.5 bg-gradient-to-r ${comp.color}`}></div>
                                    
                                    <div className="p-6">
                                        {/* Icon and Title */}
                                        <div className="flex items-start gap-4 mb-5">
                                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${comp.color} flex items-center justify-center text-sm font-black text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                                {comp.icon}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-lg font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all leading-tight">
                                                    {comp.name}
                                                </h4>
                                                <div className="flex items-center gap-1.5 mt-2 text-gray-400">
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                                    </svg>
                                                    <span className="text-sm">Max {comp.teamSize} members</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Pricing */}
                                        <div className="space-y-3 p-4 bg-gray-800/50 rounded-xl">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-400 text-sm">Early Bird</span>
                                                <span className="text-xl font-black text-green-400">Rs. {comp.earlyBird}</span>
                                            </div>
                                            <div className="flex justify-between items-center opacity-60">
                                                <span className="text-gray-500 text-sm">Normal Price</span>
                                                <span className="text-gray-500 font-medium line-through">Rs. {comp.normal}</span>
                                            </div>
                                        </div>
                                        
                                        {/* Save badge */}
                                        <div className="mt-4 text-center">
                                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-400 bg-green-500/10 px-3 py-1 rounded-full">
                                                Save Rs. {comp.normal - comp.earlyBird}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* CTA Section */}
                <motion.div 
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="relative max-w-5xl mx-auto">
                        {/* Outer glow */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-[2rem] blur-xl opacity-30"></div>
                        
                        <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-[2rem] border border-gray-700/50 p-10 md:p-16 overflow-hidden">
                            {/* Decorative elements */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-primary to-pink-500"></div>
                            <div className="absolute top-10 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-10 left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
                            
                            {/* Content */}
                            <div className="relative z-10">
                                <h3 className="text-3xl md:text-5xl font-black text-white mb-6">
                                    Ready to{' '}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-400 to-pink-500">
                                        Compete
                                    </span>
                                    ?
                                </h3>
                                
                                <p className="text-gray-300 mb-10 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
                                    Join <span className="text-primary font-semibold">hundreds of tech enthusiasts</span> in this epic two-day competition. 
                                    Build, innovate, and win amazing prizes!
                                </p>
                                
                                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                    <Link to="/register">
                                        <motion.button
                                            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -15px rgba(234, 179, 8, 0.4)" }}
                                            whileTap={{ scale: 0.95 }}
                                            className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-primary via-yellow-500 to-secondary text-black px-10 md:px-14 py-5 rounded-2xl font-bold text-lg md:text-xl shadow-lg shadow-primary/30 overflow-hidden"
                                        >
                                            <span className="relative z-10">Register Now</span>
                                            <svg className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                            {/* Shine effect */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                        </motion.button>
                                    </Link>
                                    
                                   
                                </div>
                                
                                {/* Trust indicators */}
                                <div className="mt-10 pt-8 border-t border-gray-700/50">
                                    <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 text-gray-400">
                                        
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-yellow-500 flex items-center justify-center">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                                </svg>
                                            </div>
                                            <span className="text-sm">9 Competition Tracks</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <span className="text-sm">Amazing Prizes</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default DataverseSection;