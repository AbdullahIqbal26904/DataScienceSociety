import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import dssLogo from '../../assets/dss_logo.jpg';

const AboutUs = () => {
    const { society } = useSelector((state) => state.allCart);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const stats = [
        { number: "500+", label: "Community Members" },
        { number: "25+", label: "Events Conducted" },
        { number: "10+", label: "Industry Partners" },
        { number: "3", label: "Years Strong" }
    ];

    return (
        <section id="about" className="py-20 px-4 md:px-8 relative overflow-hidden">
            {/* Background gradients */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.15 }}
                transition={{ duration: 1.5 }}
                className="absolute top-0 left-0 w-full h-full"
            >
                <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-700 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
                <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
                <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
            </motion.div>
            
            <div className="container mx-auto max-w-6xl relative z-10">
                {/* Section Header */}
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-4">
                        🚀 Who We Are
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary">Us</span>
                    </h2>
                    <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                        {society.tagline}
                    </p>
                    <div className="w-32 h-1.5 bg-gradient-to-r from-primary via-purple-500 to-secondary rounded-full mx-auto mt-6"></div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left column - Logo and Vision */}
                    <motion.div 
                        className="flex flex-col items-center lg:items-start"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.div 
                            className="relative w-72 h-72 md:w-80 md:h-80 mb-8 group"
                            variants={itemVariants}
                        >
                            {/* Animated gradient border */}
                            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary via-purple-500 to-secondary opacity-75 blur group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary opacity-50 animate-pulse"></div>
                            <img 
                                src={dssLogo} 
                                alt="IBA Data Science Society Logo" 
                                className="relative w-full h-full object-cover rounded-full border-4 border-gray-900 shadow-2xl"
                            />
                            {/* Floating badge */}
                            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-primary to-secondary text-black text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                                Est. 2023
                            </div>
                        </motion.div>
                        
                        <motion.div 
                            className="text-center lg:text-left bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                            variants={itemVariants}
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                                    <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white">Our Vision</h3>
                            </div>
                            <p className="text-gray-300 leading-relaxed">{society.vision}</p>
                        </motion.div>
                    </motion.div>

                    {/* Right column - Mission and details */}
                    <motion.div 
                        className="text-center lg:text-left"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.div 
                            className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-6"
                            variants={itemVariants}
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white">Our Mission</h3>
                            </div>
                            <p className="text-gray-300 leading-relaxed">{society.mission}</p>
                        </motion.div>
                        
                        <motion.div variants={itemVariants}>
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-3 justify-center lg:justify-start">
                                <span className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </span>
                                Who We Are
                            </h3>
                            <div className="space-y-4">
                                {society.about.map((paragraph, index) => (
                                    <p key={index} className="text-gray-300 leading-relaxed">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </motion.div>
                        
                        <motion.div 
                            className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start"
                            variants={itemVariants}
                        >
                            <motion.a
                                href="#events"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center py-3 px-8 bg-gradient-to-r from-primary to-secondary rounded-full text-black font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                Explore Events
                                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </motion.a>
                            <motion.a
                                href="#gallery"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center py-3 px-8 bg-white/10 border border-white/20 rounded-full text-white font-medium hover:bg-white/20 transition-all duration-300"
                            >
                                View Gallery
                            </motion.a>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Stats Section */}
                <motion.div 
                    className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    {stats.map((stat, index) => (
                        <motion.div 
                            key={index}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-primary/30 transition-all duration-300"
                        >
                            <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2">
                                {stat.number}
                            </div>
                            <div className="text-gray-400 text-sm">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default AboutUs;
