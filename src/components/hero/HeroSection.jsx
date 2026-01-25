import React from 'react';
import img from '../../assets/image4.png'; // Using placeholder image for society logo
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import SocialButtons from '../buttons/SocialButtons';
import dss_logo from '../../assets/IBA Data Science Society (Secondary).png'
function HeroSection() {
    const { society } = useSelector((state) => state.allCart);
    
    // Animation variants for staggered animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
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
    
    // Animation for scroll hint
    const scrollVariants = {
        initial: { y: 0 },
        animate: {
            y: [0, 10, 0],
            transition: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop"
            }
        }
    };

    // Data science related phrases for typewriter effect
    const phrases = [
        "Empowering students with data-driven thinking at IBA.",
        "Where data science enthusiasts collaborate and innovate.",
        "Learn, analyze, visualize, transform.",
        "Turning data into insights, insights into action.",
        "Join us to explore the world of data science."
    ];
    
    return (
        <section id="hero" className="relative min-h-screen flex items-center py-16 md:py-0">
            {/* Animated gradient backgrounds */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.2, scale: 1 }}
                transition={{ duration: 2 }}
                className="absolute w-1/2 aspect-square rounded-full bg-gradient-to-r from-[#007cda] via-[#785ae4] to-primary blur-[120px] -left-1/4 top-0"
            />
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.2, scale: 1 }}
                transition={{ duration: 2, delay: 0.3 }}
                className="absolute w-1/2 aspect-square rounded-full bg-gradient-to-r from-primary via-[#ff6667] to-[#ff18b8] blur-[120px] -right-1/4 bottom-0"
            />
            
            {/* Main Content */}
            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <motion.div 
                    className="flex flex-col lg:flex-row items-center justify-between gap-12 md:gap-16"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Left Column - Text Content */}
                    <motion.div className="w-full lg:w-1/2 text-center lg:text-left" variants={itemVariants}>
                        <div className="space-y-6">
                            <motion.div variants={itemVariants}>
                                <span className="inline-block py-1 px-3 text-xs md:text-sm rounded-full bg-white/10 backdrop-blur-sm text-primary mb-4">
                                    Welcome to
                                </span>
                            </motion.div>
                            
                            <motion.h1 
                                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white"
                                variants={itemVariants}
                            >
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                    {society.name}
                                </span>
                            </motion.h1>
                            
                            <motion.div 
                                className="text-xl md:text-2xl lg:text-3xl font-medium text-white/80 min-h-[6rem]"
                                variants={itemVariants}
                            >
                                <Typewriter
                                    words={phrases}
                                    loop={0}
                                    cursor
                                    cursorStyle='|'
                                    typeSpeed={70}
                                    deleteSpeed={50}
                                    delaySpeed={1000}
                                />
                            </motion.div>
                            
                            <motion.div 
                                className="flex flex-wrap gap-4 justify-center lg:justify-start mt-8"
                                variants={itemVariants}
                            >
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="py-3 px-8 bg-gradient-to-r from-primary to-secondary rounded-full text-black font-medium shadow-lg shadow-yellow-600/20 hover:shadow-yellow-600/40 transition-all duration-300"
                                >
                                    <a href="#events">Explore Events</a>
                                </motion.button>
                                
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="py-3 px-8 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-medium hover:bg-white/20 transition-all duration-300"
                                >
                                    <a href="#dataverse" className="flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        <span>Hackfest x Datathon 2.0</span>
                                    </a>
                                </motion.button>
                            </motion.div>
                            
                            {/* Social media links for mobile */}
                            <motion.div
                                className="flex justify-center lg:justify-start gap-6 mt-8 lg:hidden"
                                variants={itemVariants}
                            >
                                <SocialButtons display="horizontal" />
                            </motion.div>
                        </div>
                    </motion.div>
                    
                    {/* Right Column - Logo Image */}
                    <motion.div 
                        className="w-full lg:w-1/2 flex justify-center lg:justify-end"
                        variants={itemVariants}
                    >
                        <div className="relative">
                            {/* Background animated elements */}
                            <motion.div 
                                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary to-secondary opacity-50 blur-xl"
                                animate={{ 
                                    scale: [1, 1.05, 1],
                                    rotate: [0, 2, 0]
                                }}
                                transition={{ 
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "easeInOut" 
                                }}
                            />
                            
                            {/* Main rectangular frame for horizontal logo */}
                            <motion.div 
                                className="relative w-[380px] md:w-[450px] lg:w-[500px] p-1"
                                whileHover={{ scale: 1.03 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Logo image with transparent background */}
                                <img
                                    src={dss_logo}
                                    alt="IBA Data Science Society Logo"
                                    className="w-full h-auto object-contain bg-transparent"
                                />
                                
                                {/* Decorative elements */}
                                <motion.div 
                                    className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-primary"
                                    animate={{ 
                                        y: [0, -10, 0],
                                    }}
                                    transition={{ 
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut" 
                                    }}
                                />
                                <motion.div 
                                    className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full bg-secondary"
                                    animate={{ 
                                        x: [0, 10, 0],
                                    }}
                                    transition={{ 
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut" 
                                    }}
                                />
                                
                                {/* Data visualization elements */}
                                <motion.div
                                    className="absolute -bottom-10 -right-10 w-16 h-16 bg-gray-900/80 backdrop-blur-md rounded-lg flex items-center justify-center"
                                    animate={{ rotate: [0, 10, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </motion.div>
                                
                                <motion.div
                                    className="absolute -top-10 -left-10 w-14 h-14 bg-gray-900/80 backdrop-blur-md rounded-lg flex items-center justify-center"
                                    animate={{ rotate: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <svg className="w-7 h-7 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                    </svg>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
                
                {/* Desktop Social media sidebar (moved to right and separated) */}
                <div className="hidden lg:block fixed right-8 top-1/2 transform -translate-y-1/2 z-50">
                    <div className="bg-black/40 backdrop-blur-md p-3 rounded-xl shadow-lg border border-white/10">
                        <SocialButtons display="vertical" />
                    </div>
                </div>
                
                {/* Scroll hint */}
                <motion.div 
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/50"
                    variants={scrollVariants}
                    initial="initial"
                    animate="animate"
                >
                    <span className="text-xs mb-2">Scroll down</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 17L12 7M12 17L8 13M12 17L16 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </motion.div>
            </div>
        </section>
    );
}

export default HeroSection;

