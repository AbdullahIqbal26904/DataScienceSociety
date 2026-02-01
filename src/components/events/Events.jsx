import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useSelector } from 'react-redux';

const Events = () => {
    const { society } = useSelector((state) => state.allCart);

    return (
        <section id="events" className="py-20 px-4 md:px-8">
            <div className="container mx-auto max-w-7xl">
                {/* Section Header */}
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Events</span>
                    </h2>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        Join us for workshops, hackathons, and speaker sessions designed to help you 
                        develop practical skills in data science and connect with industry professionals.
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mt-6"></div>
                </motion.div>

                {/* Events Timeline */}
                <div className="relative">
                    {/* Vertical line */}
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary via-secondary to-primary"></div>
                    
                    <div className="space-y-20 md:space-y-0">
                        {society.events.map((event, index) => (
                            <EventItem 
                                key={index} 
                                event={event} 
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const EventItem = ({ event, index }) => {
    const isEven = index % 2 === 0;
    
    // Animation variants
    const itemVariants = {
        hidden: { opacity: 0, x: isEven ? -50 : 50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                delay: index * 0.1
            }
        }
    };
    
    return (
        <motion.div
            className={`flex flex-col md:flex-row md:items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            {/* Timeline dot (visible only on md+ screens) */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-primary to-secondary"></div>
            
            {/* Date - Mobile version (visible only on small screens) */}
            <div className="md:hidden text-center mb-4">
                <span className={`inline-block py-1 px-4 rounded-full font-medium text-sm ${
                    event.status === 'completed' 
                        ? 'bg-green-900/50 text-green-400' 
                        : event.status === 'upcoming' 
                            ? 'bg-primary/20 text-primary' 
                            : 'bg-gray-800 text-primary'
                }`}>
                    {event.status === 'completed' && '✓ '}{event.date}
                </span>
            </div>
            
            {/* Content */}
            <div className={`md:w-1/2 ${isEven ? 'md:pr-12' : 'md:pl-12'} mb-8 md:mb-0`}>
                {/* Date - Desktop version */}
                <div className="hidden md:block mb-2">
                    <span className={`inline-block py-1 px-4 rounded-full font-medium text-sm ${
                        event.status === 'completed' 
                            ? 'bg-green-900/50 text-green-400' 
                            : event.status === 'upcoming' 
                                ? 'bg-primary/20 text-primary' 
                                : 'bg-gray-800 text-primary'
                    }`}>
                        {event.status === 'completed' && '✓ '}{event.date}
                    </span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">{event.title}</h3>
                <p className="text-gray-300 mb-6">{event.description}</p>
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="py-2 px-6 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors flex items-center"
                >
                    <span>Learn more</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </motion.button>
            </div>
            
            {/* Image or Video */}
            <div className={`md:w-1/2 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}>
                <motion.div 
                    className={`relative overflow-hidden rounded-xl ${event.video ? 'max-w-[280px] mx-auto' : ''}`}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-60 pointer-events-none z-10"></div>
                    {event.video ? (
                        <VideoPlayer src={event.video} />
                    ) : event.collaboration ? (
                        <CollaborationLogos images={event.collaboration.images} title={event.title} />
                    ) : (
                        <img 
                            src={event.image} 
                            alt={event.title} 
                            className="w-full h-64 object-fill"
                        />
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
};

const VideoPlayer = ({ src }) => {
    const videoRef = useRef(null);
    const isInView = useInView(videoRef, { amount: 0.5 });

    useEffect(() => {
        if (videoRef.current) {
            if (isInView) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        }
    }, [isInView]);

    return (
        <video 
            ref={videoRef}
            src={src} 
            loop 
            muted 
            playsInline
            className="w-full aspect-[9/16] object-cover"
        />
    );
};

const CollaborationLogos = ({ images, title }) => {
    return (
        <div className="flex flex-col items-center justify-center gap-3 p-6 bg-gray-900/50 rounded-xl h-64">
            <img 
                src={images[1]} 
                alt={`${title} - GDG`} 
                className="h-16 md:h-20 object-contain"
            />
            <span className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                ✕
            </span>
            <img 
                src={images[0]} 
                alt={`${title} - DSS`} 
                className="h-16 md:h-20 object-contain"
            />
        </div>
    );
};

export default Events;
