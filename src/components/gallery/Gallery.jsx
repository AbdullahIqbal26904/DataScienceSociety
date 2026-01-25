import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';

const Gallery = () => {
    const { society } = useSelector((state) => state.allCart);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [activeFilter, setActiveFilter] = useState('all');
    
    const categories = ['all', ...new Set(society.gallery.map(item => item.category))];
    
    const filteredGallery = activeFilter === 'all' 
        ? society.gallery 
        : society.gallery.filter(item => item.category === activeFilter);
    
    const openLightbox = (image, index) => {
        setSelectedImage(image);
        setSelectedIndex(index);
    };
    const closeLightbox = () => setSelectedImage(null);
    
    const navigateImage = useCallback((direction) => {
        const newIndex = direction === 'next' 
            ? (selectedIndex + 1) % filteredGallery.length
            : (selectedIndex - 1 + filteredGallery.length) % filteredGallery.length;
        setSelectedIndex(newIndex);
        setSelectedImage(filteredGallery[newIndex]);
    }, [selectedIndex, filteredGallery]);
    
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!selectedImage) return;
            if (e.key === 'ArrowRight') navigateImage('next');
            if (e.key === 'ArrowLeft') navigateImage('prev');
            if (e.key === 'Escape') closeLightbox();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImage, navigateImage]);

    return (
        <section id="gallery" className="py-20 px-4 md:px-8 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="container mx-auto relative z-10">
                {/* Section Header */}
                <motion.div 
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-4">
                        HXD'25 Memories
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary">Event</span> Gallery
                    </h2>
                    <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                        Relive the excitement from HackFest x Datathon 2025 - where innovation met data science
                    </p>
                    <div className="w-32 h-1.5 bg-gradient-to-r from-primary via-purple-500 to-secondary rounded-full mx-auto mt-6"></div>
                </motion.div>
                
                {/* Filter Buttons */}
                <motion.div 
                    className="flex flex-wrap justify-center gap-3 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveFilter(category)}
                            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 capitalize
                                ${activeFilter === category 
                                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25' 
                                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10 hover:border-primary/50'}
                            `}
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>

                {/* Gallery Grid - Masonry Style */}
                <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-[250px]"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    layout
                >
                    <AnimatePresence mode="popLayout">
                        {filteredGallery.map((item, index) => (
                            <GalleryItem 
                                key={item.image} 
                                item={item} 
                                index={index}
                                onClick={() => openLightbox(item, index)}
                                isLarge={index === 0 || index === 5 || index === 10}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
                
                {/* Stats Bar */}
                <motion.div 
                    className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    {[
                        { number: '500+', label: 'Participants' },
                        { number: '48', label: 'Hours of Hacking' },
                        { number: '50+', label: 'Projects Built' },
                        { number: '₨1M+', label: 'In Prizes' }
                    ].map((stat, index) => (
                        <div key={index} className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-primary/30 transition-colors">
                            <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                {stat.number}
                            </div>
                            <div className="text-gray-400 mt-2 text-sm">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
            
            {/* Enhanced Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
                        onClick={closeLightbox}
                    >
                        {/* Navigation Arrows */}
                        <button 
                            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 rounded-full p-3 md:p-4 transition-all duration-300 hover:scale-110 z-10 backdrop-blur-sm border border-white/10"
                            onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
                        >
                            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button 
                            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 rounded-full p-3 md:p-4 transition-all duration-300 hover:scale-110 z-10 backdrop-blur-sm border border-white/10"
                            onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
                        >
                            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                        
                        {/* Image Counter */}
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                            <span className="text-white text-sm font-medium">
                                {selectedIndex + 1} / {filteredGallery.length}
                            </span>
                        </div>
                        
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="relative max-w-5xl w-full max-h-[85vh]"
                            onClick={e => e.stopPropagation()}
                        >
                            <img 
                                src={selectedImage.image} 
                                alt={selectedImage.caption}
                                className="w-full h-auto max-h-[75vh] object-contain rounded-xl shadow-2xl"
                            />
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent rounded-b-xl"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-white text-xl md:text-2xl font-semibold">{selectedImage.caption}</h3>
                                        <span className="inline-block mt-2 px-3 py-1 bg-primary/20 text-primary text-sm rounded-full capitalize">
                                            {selectedImage.category}
                                        </span>
                                    </div>
                                    <div className="text-gray-400 text-sm hidden md:block">
                                        Use ← → keys to navigate
                                    </div>
                                </div>
                            </motion.div>
                            <button 
                                className="absolute top-4 right-4 text-white bg-white/10 hover:bg-red-500/80 rounded-full p-3 transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/10"
                                onClick={closeLightbox}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

const GalleryItem = ({ item, index, onClick, isLarge }) => {
    return (
        <motion.div 
            className={`relative overflow-hidden rounded-2xl cursor-pointer group
                ${isLarge ? 'sm:col-span-2 sm:row-span-2' : ''}
            `}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            layout
            onClick={onClick}
        >
            {/* Image with gradient border effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/50 via-purple-500/50 to-secondary/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm scale-105"></div>
            
            <img 
                src={item.image}
                alt={item.caption}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 rounded-2xl"
                loading="lazy"
            />
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
                <span className="px-3 py-1.5 bg-black/60 backdrop-blur-md text-white text-xs font-medium rounded-full border border-white/20 capitalize">
                    {item.category}
                </span>
            </div>
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end rounded-2xl">
                <div className="p-5 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white text-lg font-semibold mb-2">{item.caption}</h3>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300 flex items-center gap-2">
                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                            Click to expand
                        </span>
                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:bg-primary/80 transition-colors">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Shine effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden rounded-2xl">
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"></div>
            </div>
        </motion.div>
    );
};

export default Gallery;
