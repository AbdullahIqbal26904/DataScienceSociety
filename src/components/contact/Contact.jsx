import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

const Contact = () => {
    const { society } = useSelector((state) => state.allCart);

    const contactCards = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            title: "Email Us",
            description: "Drop us a line anytime",
            value: society.socialLinks.email,
            href: `mailto:${society.socialLinks.email}`,
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            title: "Visit Us",
            description: "Come say hello",
            value: "IBA Main Campus, Karachi",
            href: "https://maps.google.com/?q=IBA+Main+Campus+Karachi",
            color: "from-primary to-yellow-500"
        }
    ];

    const socialLinks = [
        {
            name: "Instagram",
            href: society.socialLinks.instagram,
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
            ),
            color: "hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500"
        },
        {
            name: "LinkedIn",
            href: society.socialLinks.linkedin,
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.23 0H1.77C.79 0 0 .774 0 1.73v20.54C0 23.226.79 24 1.77 24h20.46c.98 0 1.77-.774 1.77-1.73V1.73C24 .774 23.21 0 22.23 0zM7.09 20.452H3.56V9.084h3.53v11.368zM5.325 7.66a2.05 2.05 0 11.001-4.1 2.05 2.05 0 010 4.1zM20.452 20.452h-3.53V14.99c0-1.3-.025-2.971-1.814-2.971-1.813 0-2.09 1.417-2.09 2.88v5.553h-3.53V9.084h3.39v1.558h.05c.473-.895 1.63-1.837 3.356-1.837 3.59 0 4.255 2.36 4.255 5.43v6.217z" />
                </svg>
            ),
            color: "hover:bg-blue-600"
        },
        {
            name: "GitHub",
            href: society.socialLinks.github,
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.111.793-.26.793-.577v-2.04c-3.338.725-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.835 2.805 1.305 3.49.998.107-.774.418-1.305.762-1.604-2.665-.303-5.466-1.333-5.466-5.933 0-1.31.467-2.381 1.235-3.22-.123-.303-.536-1.523.118-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 0 1 3.006-.404c1.02.005 2.047.137 3.006.404 2.292-1.553 3.3-1.23 3.3-1.23.654 1.653.242 2.873.118 3.176.77.839 1.235 1.91 1.235 3.22 0 4.61-2.807 5.625-5.479 5.921.43.37.814 1.096.814 2.213v3.285c0 .319.192.694.801.577C20.565 21.796 24 17.298 24 12 24 5.37 18.63 0 12 0z" />
                </svg>
            ),
            color: "hover:bg-gray-700"
        }
    ];

    return (
        <section id="contact" className="py-20 px-4 md:px-8 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-800/20 rounded-full filter blur-[120px] opacity-50" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-[120px] opacity-50" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full filter blur-[150px] opacity-30" />
            </div>

            <div className="container mx-auto max-w-5xl relative z-10">
                {/* Section Header */}
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-4">
                        Get in Touch
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary">Us</span>
                    </h2>
                    <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                        Have questions or want to collaborate? We'd love to hear from you!
                    </p>
                    <div className="w-32 h-1.5 bg-gradient-to-r from-primary via-purple-500 to-secondary rounded-full mx-auto mt-6"></div>
                </motion.div>

                {/* Contact Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {contactCards.map((card, index) => (
                        <motion.a
                            key={index}
                            href={card.href}
                            target={card.href.startsWith('http') ? '_blank' : undefined}
                            rel={card.href.startsWith('http') ? 'noreferrer' : undefined}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, y: -5 }}
                            className="group relative bg-gray-900/60 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 shadow-xl overflow-hidden"
                        >
                            {/* Gradient overlay on hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                            
                            {/* Icon */}
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                {card.icon}
                            </div>
                            
                            <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
                            <p className="text-gray-400 text-sm mb-3">{card.description}</p>
                            <p className="text-white font-medium group-hover:text-primary transition-colors">{card.value}</p>
                            
                            {/* Arrow indicator */}
                            <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* Social Links Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-center"
                >
                    <div className="bg-gray-900/60 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-gray-700/50 shadow-xl">
                        <h3 className="text-2xl font-bold text-white mb-4">Follow Our Journey</h3>
                        <p className="text-gray-400 mb-8 max-w-md mx-auto">
                            Stay connected with us on social media for the latest updates, events, and data science content.
                        </p>
                        
                        <div className="flex justify-center gap-4">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    whileHover={{ scale: 1.1, y: -3 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:border-transparent transition-all duration-300 ${social.color}`}
                                    title={social.name}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                        
                        {/* Decorative element */}
                        <div className="mt-10 pt-8 border-t border-gray-700/50">
                            <p className="text-gray-500 text-sm">
                                © 2026 IBA Data Science Society. All rights reserved.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
