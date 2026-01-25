import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';

// 1. Extract and Memoize GalleryItem to prevent re-renders when Lightbox opens
const GalleryItem = React.memo(({ item, index, onClick, isLarge }) => {
    return (
        <motion.div 
            className={`relative overflow-hidden rounded-2xl cursor-pointer group h-full w-full
                ${isLarge ? 'sm:col-span-2 sm:row-span-2' : ''}
            `}
            // 2. Remove 'layout' prop (Major Performance Fix)
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "100px" }} // Load earlier
            transition={{ duration: 0.4, delay: index * 0.05 }}
            onClick={onClick}
            // 3. Use hardware acceleration hint
            style={{ willChange: 'transform, opacity' }} 
        >
            {/* Optimized Image Loading */}
            <img 
                src={item.image}
                alt={item.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
            />
            
            {/* Simplified Overlay - Removed expensive gradients/blurs from idle state */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {/* Removed backdrop-blur from here to save GPU */}
                    <span className="inline-block px-2 py-1 bg-primary/90 text-white text-[10px] font-bold uppercase tracking-wider rounded mb-2">
                        {item.category}
                    </span>
                    <h3 className="text-white text-lg font-bold leading-tight">{item.caption}</h3>
                </div>
            </div>
        </motion.div>
    );
});

const Gallery = () => {
    const { society } = useSelector((state) => state.allCart);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [activeFilter, setActiveFilter] = useState('all');
    
    // 4. Memoize the filtered list calculation
    const categories = useMemo(() => ['all', ...new Set(society.gallery.map(item => item.category))], [society.gallery]);
    
    const filteredGallery = useMemo(() => {
        return activeFilter === 'all' 
            ? society.gallery 
            : society.gallery.filter(item => item.category === activeFilter);
    }, [activeFilter, society.gallery]);
    
    const openLightbox = useCallback((image, index) => {
        setSelectedImage(image);
        setSelectedIndex(index);
    }, []);

    const closeLightbox = () => setSelectedImage(null);
    
    const navigateImage = useCallback((direction) => {
        if (!selectedImage) return;
        
        // Use functional state update to avoid dependency issues
        setSelectedIndex(prevIndex => {
            const nextIndex = direction === 'next' 
                ? (prevIndex + 1) % filteredGallery.length
                : (prevIndex - 1 + filteredGallery.length) % filteredGallery.length;
            
            setSelectedImage(filteredGallery[nextIndex]);
            return nextIndex;
        });
    }, [filteredGallery, selectedImage]);
    
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
        <section id="gallery" className="py-20 px-4 md:px-8 relative bg-gray-900">
            <div className="container mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <span className="text-primary font-medium mb-4 block">HXD'25 Memories</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Event Gallery</h2>
                </div>
                
                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveFilter(category)}
                            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-200 capitalize
                                ${activeFilter === category 
                                    ? 'bg-primary text-white' 
                                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}
                            `}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Gallery Grid */}
                <motion.div 
                    layout="position" // Only animate position changes, not internal layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                >
                    <AnimatePresence mode="popLayout" initial={false}>
                        {filteredGallery.map((item, index) => (
                            <GalleryItem 
                                key={item.image || index} // Ensure unique key
                                item={item} 
                                index={index}
                                onClick={() => openLightbox(item, index)}
                                isLarge={index === 0 || index === 5 || index === 10}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
                
                {/* Stats Bar - Simplified for performance */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { number: '500+', label: 'Participants' },
                        { number: '48', label: 'Hours' },
                        { number: '50+', label: 'Projects' },
                        { number: '1M+', label: 'Prize Pool' }
                    ].map((stat, index) => (
                        <div key={index} className="text-center p-6 bg-gray-800/50 rounded-2xl border border-white/5">
                            <div className="text-3xl font-bold text-white">{stat.number}</div>
                            <div className="text-gray-400 mt-2 text-sm">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Lightbox remains mostly the same, just ensured AnimatePresence is distinct */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
                        onClick={closeLightbox}
                    >
                       <img 
                           src={selectedImage.image} 
                           alt={selectedImage.caption} 
                           className="max-h-[85vh] max-w-[90vw] object-contain rounded shadow-2xl"
                       />
                       {/* Add controls back here as needed */}
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Gallery;