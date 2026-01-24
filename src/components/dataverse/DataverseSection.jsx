import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const DataverseSection = () => {
    const [timeRemaining, setTimeRemaining] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const [activeCategory, setActiveCategory] = useState('all');

    // Competition modules data
    const competitions = [
        { name: "Game Development", earlyBird: 500, normal: 1000, teamSize: 3, category: "dev" },
        { name: "Shark Tank", earlyBird: 700, normal: 1500, teamSize: 4, category: "business" },
        { name: "CV Competition", earlyBird: 500, normal: 1000, teamSize: 3, category: "ai" },
        { name: "UI/UX Design", earlyBird: 500, normal: 1000, teamSize: 2, category: "design" },
        { name: "CSI (Crime Scene Investigation)", earlyBird: 500, normal: 1000, teamSize: 3, category: "misc" },
        { name: "Competitive Programming", earlyBird: 700, normal: 1500, teamSize: 3, category: "dev" },
        { name: "Data Analytics", earlyBird: 500, normal: 1000, teamSize: 2, category: "data" },
        { name: "Generative AI", earlyBird: 500, normal: 1000, teamSize: 3, category: "ai" },
        { name: "ML Competition", earlyBird: 700, normal: 1500, teamSize: 3, category: "ai" },
        { name: "Web Development", earlyBird: 500, normal: 1000, teamSize: 3, category: "dev" },
    ];

    const categories = [
        { id: 'all', label: 'All Events' },
        { id: 'dev', label: 'Development' },
        { id: 'ai', label: 'AI/ML' },
        { id: 'data', label: 'Data' },
        { id: 'design', label: 'Design' },
        { id: 'business', label: 'Business' },
        { id: 'misc', label: 'Others' },
    ];

    const filteredCompetitions = activeCategory === 'all' 
        ? competitions 
        : competitions.filter(c => c.category === activeCategory);

    // Countdown to February 14, 2026
    useEffect(() => {
        const targetDate = new Date('February 14, 2026 09:00:00').getTime();
        
        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = targetDate - now;
            
            if (distance < 0) {
                setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }
            
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

    return (
        <section id="dataverse" className="py-24 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 -z-10">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ duration: 1.5 }}
                    className="absolute top-0 left-0 w-full h-full"
                >
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-900/30 rounded-full filter blur-[120px]" />
                    <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-900/40 rounded-full filter blur-[120px]" />
                    <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-green-900/30 rounded-full filter blur-[100px]" />
                    <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-yellow-900/20 rounded-full filter blur-[100px]" />
                </motion.div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div 
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Collaboration Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6"
                    >
                        <span className="text-sm text-gray-300">A collaboration of</span>
                        <span className="text-sm font-semibold text-blue-400">IBA GDG</span>
                        <span className="text-gray-500">×</span>
                        <span className="text-sm font-semibold text-primary">Data Science Society</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-primary">
                            Hackfest
                        </span>
                        <span className="text-white"> × </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-500 to-red-500">
                            Datathon 2.0
                        </span>
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-300 font-light mb-4">
                        The Ultimate Tech Competition Experience
                    </p>
                    <p className="text-lg text-primary font-semibold">
                        February 14-15, 2026 • IBA Karachi
                    </p>
                    <div className="w-32 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-primary rounded-full mx-auto mt-6"></div>
                </motion.div>

                {/* Registration Open Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-12"
                >
                    <div className="relative overflow-hidden bg-gradient-to-r from-green-600/20 via-emerald-600/20 to-green-600/20 backdrop-blur-md rounded-2xl border border-green-500/30 p-6 text-center">
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEiIGZpbGw9IiMxMGI5ODEiIGZpbGwtb3BhY2l0eT0iMC4yIi8+PC9nPjwvc3ZnPg==')] opacity-50"></div>
                        <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="inline-flex items-center gap-2 bg-green-500 text-black px-4 py-1.5 rounded-full text-sm font-bold mb-3"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-900 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-900"></span>
                            </span>
                            REGISTRATIONS NOW OPEN
                        </motion.div>
                        <h3 className="text-2xl font-bold text-white mb-2">🔥 Early Bird Discount Available!</h3>
                        <p className="text-gray-300">Register now and save up to 50% on registration fees</p>
                    </div>
                </motion.div>

                {/* Countdown Timer */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mb-16"
                >
                    <h3 className="text-xl text-center text-gray-400 mb-6">Event Starts In</h3>
                    <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-2xl mx-auto">
                        {[
                            { label: "Days", value: timeRemaining.days, color: "from-blue-500 to-blue-600" },
                            { label: "Hours", value: timeRemaining.hours, color: "from-purple-500 to-purple-600" },
                            { label: "Minutes", value: timeRemaining.minutes, color: "from-primary to-yellow-500" },
                            { label: "Seconds", value: timeRemaining.seconds, color: "from-red-500 to-orange-500" }
                        ].map((item, index) => (
                            <motion.div 
                                key={index}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="relative group"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity`}></div>
                                <div className="relative bg-gray-900/80 backdrop-blur-md rounded-2xl border border-gray-700/50 p-4 md:p-6 text-center">
                                    <div className="text-3xl md:text-5xl font-bold text-white mb-1">
                                        {item.value < 10 ? `0${item.value}` : item.value}
                                    </div>
                                    <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wider font-medium">
                                        {item.label}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Competition Categories Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mb-8"
                >
                    <h3 className="text-3xl font-bold text-center text-white mb-8">
                        🏆 Competition Modules
                    </h3>
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {categories.map((cat) => (
                            <motion.button
                                key={cat.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                    activeCategory === cat.id
                                        ? 'bg-gradient-to-r from-primary to-secondary text-black'
                                        : 'bg-gray-800/60 text-gray-300 hover:bg-gray-700/60 border border-gray-700'
                                }`}
                            >
                                {cat.label}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Competition Cards */}
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    {filteredCompetitions.map((comp, index) => (
                        <motion.div
                            key={comp.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="group relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative bg-gray-900/70 backdrop-blur-md rounded-2xl border border-gray-700/50 p-5 h-full hover:border-primary/50 transition-all duration-300">
                                <h4 className="text-lg font-bold text-white mb-3 group-hover:text-primary transition-colors">
                                    {comp.name}
                                </h4>
                                
                                <div className="space-y-2 mb-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400 text-sm">Early Bird:</span>
                                        <span className="text-green-400 font-bold">Rs. {comp.earlyBird}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400 text-sm">Normal:</span>
                                        <span className="text-gray-300 font-medium">Rs. {comp.normal}</span>
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-between pt-3 border-t border-gray-700/50">
                                    <div className="flex items-center gap-1.5">
                                        <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                        </svg>
                                        <span className="text-sm text-gray-400">Max {comp.teamSize} members</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-center"
                >
                    <div className="bg-gradient-to-r from-gray-900/80 via-gray-800/80 to-gray-900/80 backdrop-blur-md rounded-3xl border border-gray-700/50 p-8 md:p-12 max-w-4xl mx-auto">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Ready to Compete?
                        </h3>
                        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                            Join hundreds of tech enthusiasts, developers, and data scientists in this epic two-day competition. 
                            Show your skills, win amazing prizes, and network with industry professionals!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.a
                                href="#register"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary via-yellow-500 to-secondary text-black px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow"
                            >
                                <span>Register Now</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </motion.a>
                            <motion.a
                                href="#learn-more"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-medium text-lg hover:bg-white/20 transition-colors"
                            >
                                <span>Learn More</span>
                            </motion.a>
                        </div>
                        
                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-gray-700/50">
                            <div>
                                <div className="text-3xl md:text-4xl font-bold text-primary">10+</div>
                                <div className="text-sm text-gray-400">Competitions</div>
                            </div>
                            <div>
                                <div className="text-3xl md:text-4xl font-bold text-primary">2</div>
                                <div className="text-sm text-gray-400">Days of Action</div>
                            </div>
                            <div>
                                <div className="text-3xl md:text-4xl font-bold text-primary">🏆</div>
                                <div className="text-sm text-gray-400">Amazing Prizes</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default DataverseSection;
