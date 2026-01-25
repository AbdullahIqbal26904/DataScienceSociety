import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import dssLogo from '/assets/ds_logo.png';

export default function Navbar() {
    const [activeSection, setActiveSection] = useState('hero');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { society } = useSelector((state) => state.allCart);
    
    useEffect(() => {
        // Use Intersection Observer to detect which section is in view
        // This works correctly with snap scroll containers
        const sections = ['hero', 'about', 'events', 'dataverse', 'gallery', 'contact'];
        
        const observerOptions = {
            root: null, // viewport
            rootMargin: '-40% 0px -40% 0px', // Trigger when section is in middle 20% of viewport
            threshold: 0
        };
        
        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };
        
        const observer = new IntersectionObserver(observerCallback, observerOptions);
        
        sections.forEach((sectionId) => {
            const element = document.getElementById(sectionId);
            if (element) {
                observer.observe(element);
            }
        });
        
        return () => observer.disconnect();
    }, []);
    
    const listNavbar = [
        { name: 'Home', link: '#hero', icon: '' },
        { name: 'About', link: '#about', icon: '' },
        { name: 'Events', link: '#events', icon: '' },
        { name: 'Hackfest x Datathon 2.0', link: '#dataverse', icon: '' },
        { name: 'Gallery', link: '#gallery', icon: '' },
    ];

    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
    const closeMobileMenu = () => setMobileMenuOpen(false);
    
    // Logic: Header is active (has background) when NOT on hero section OR if Mobile Menu is Open
    const isHeaderActive = mobileMenuOpen || (activeSection !== 'hero');

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                isHeaderActive 
                    ? 'backdrop-blur-xl bg-black/60 shadow-lg shadow-black/20 border-b border-white/5' 
                    : 'bg-transparent'
            }`}
        >
            <div className="container mx-auto flex flex-wrap px-4 py-3 md:px-6 flex-col md:flex-row items-center relative">
                <div className="flex justify-between items-center w-full md:w-auto">
                    {/* Logo */}
                    <a href="#hero" className="flex items-center group relative z-50">
                        <motion.div 
                            whileHover={{ scale: 1.05 }} 
                            className="flex items-center gap-3 bg-white/5 backdrop-blur-sm px-3 py-2 rounded-full border border-white/10 hover:border-primary/30 transition-all duration-300"
                        >
                            <div className="relative">
                                {/* FIX: Reduced blur and opacity for cleaner look on mobile */}
                                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-sm md:blur opacity-30 group-hover:opacity-60 transition-opacity"></div>
                                {/* FIX: Added z-10 to ensure image is sharp and above the blur */}
                                <img src={dssLogo} alt="DSS Logo" className="relative z-10 w-9 h-9 md:w-10 md:h-10 rounded-full object-cover" />
                            </div>
                            <span className="text-white font-bold text-sm md:text-base hidden sm:block">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">DSS</span>
                                <span className="text-gray-400 font-normal ml-1">IBA</span>
                            </span>
                        </motion.div>
                    </a>
                    
                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <motion.button
                            onClick={toggleMobileMenu}
                            whileTap={{ scale: 0.95 }}
                            className="p-2.5 text-white focus:outline-none bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-primary/30 hover:bg-white/10 transition-all duration-300 relative z-50"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {mobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </motion.button>
                    </div>
                </div>

                {/* Desktop navigation */}
                <nav className="hidden md:flex md:ml-auto flex-wrap items-center justify-center bg-white/5 backdrop-blur-sm rounded-full px-2 py-1.5 border border-white/10">
                    {listNavbar.map((item, index) => {
                        const isActive = activeSection === item.link.replace('#', '');
                        return (
                            <a
                                key={index}
                                href={item.link}
                                className={`relative mx-1 py-2 px-4 text-sm font-medium rounded-full transition-all duration-300 ${
                                    isActive 
                                    ? 'text-black bg-gradient-to-r from-primary to-secondary' 
                                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                                }`}
                            >
                                {item.name}
                            </a>
                        );
                    })}
                </nav>
                
                {/* Contact Button Desktop */}
                <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="hidden md:inline-flex items-center gap-2 py-2.5 px-6 mt-4 md:mt-0 ml-4 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary/50 rounded-full text-white font-medium hover:bg-white/10 transition-all duration-300 group"
                >
                    <svg className="w-4 h-4 text-primary group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact
                </motion.a>
                
                {/* Mobile Menu Dropdown */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl md:hidden border-b border-white/10 overflow-hidden shadow-2xl"
                        >
                            <div className="flex flex-col p-4 gap-2">
                                {listNavbar.map((item, index) => {
                                    const isActive = activeSection === item.link.replace('#', '');
                                    return (
                                        <motion.a
                                            key={index}
                                            href={item.link}
                                            onClick={closeMobileMenu}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className={`flex items-center gap-3 py-3 px-4 rounded-xl transition-all duration-300 ${
                                                isActive 
                                                ? 'bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/30' 
                                                : 'text-gray-300 hover:bg-white/5 border border-transparent'
                                            }`}
                                        >
                                            <span className="font-medium">{item.name}</span>
                                            {isActive && (
                                                <span className="ml-auto w-2 h-2 rounded-full bg-primary"></span>
                                            )}
                                        </motion.a>
                                    );
                                })}
                                <motion.a
                                    href="#contact"
                                    onClick={closeMobileMenu}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: listNavbar.length * 0.05 }}
                                    className="flex items-center justify-center gap-2 py-3 mt-2 bg-gradient-to-r from-primary to-secondary rounded-xl text-black font-semibold shadow-lg shadow-primary/20"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Contact Us
                                </motion.a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.header>
    );
}