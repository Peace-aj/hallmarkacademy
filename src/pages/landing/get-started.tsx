"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaUserPlus, FaFileAlt, FaCalendarCheck, FaGraduationCap } from 'react-icons/fa';

interface Step {
    icon: React.ReactNode;
    title: string;
    description: string;
    color: string;
}

const steps: Step[] = [
    {
        icon: <FaFileAlt className="text-3xl" />,
        title: "Submit Application",
        description: "Complete our online application form with your child's details and academic history.",
        color: "from-blue-500 to-blue-600"
    },
    {
        icon: <FaCalendarCheck className="text-3xl" />,
        title: "Schedule Assessment",
        description: "Book an assessment appointment to evaluate your child's academic level and readiness.",
        color: "from-green-500 to-green-600"
    },
    {
        icon: <FaUserPlus className="text-3xl" />,
        title: "Complete Enrollment",
        description: "Finalize enrollment with required documents and payment of admission fees.",
        color: "from-purple-500 to-purple-600"
    },
    {
        icon: <FaGraduationCap className="text-3xl" />,
        title: "Begin Learning",
        description: "Welcome to Hallmark Academy! Your child's educational journey begins here.",
        color: "from-orange-500 to-red-500"
    }
];

const GetStarted: React.FC = () => {
    return (
        <section className="w-full py-20 bg-gradient-to-b from-blue-900 to-blue-800 text-white">
            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-5xl font-bold mb-4">
                        Get Started with <span className="text-yellow-400">Hallmark Academy</span>
                    </h2>
                    <p className="text-xl text-blue-200 max-w-3xl mx-auto">
                        Join our community of learners in just four simple steps.
                        We make the enrollment process smooth and straightforward.
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="relative"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true }}
                        >
                            {/* Step Number */}
                            <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-400 text-blue-900 rounded-full flex items-center justify-center font-bold text-lg z-10">
                                {index + 1}
                            </div>

                            {/* Card */}
                            <motion.div
                                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 h-full border border-white/20 hover:bg-white/20 transition-all duration-300"
                                whileHover={{ y: -10, scale: 1.02 }}
                            >
                                {/* Icon */}
                                <motion.div
                                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center text-white mb-6`}
                                    whileHover={{ rotate: 10 }}
                                >
                                    {step.icon}
                                </motion.div>

                                {/* Content */}
                                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                                <p className="text-blue-200 leading-relaxed">{step.description}</p>
                            </motion.div>

                            {/* Connector Line (except for last item) */}
                            {index < steps.length - 1 && (
                                <motion.div
                                    className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-yellow-400 to-transparent"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "2rem" }}
                                    transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
                                    viewport={{ once: true }}
                                />
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* CTA Section */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    viewport={{ once: true }}
                >
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-8 text-blue-900 max-w-4xl mx-auto">
                        <h3 className="text-3xl font-bold mb-4">Ready to Begin Your Journey?</h3>
                        <p className="text-xl mb-6 opacity-90">
                            Join hundreds of families who have chosen Hallmark Academy for their children's education.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/auth/signin">
                                <motion.button
                                    className="bg-blue-900 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-800 transition-colors duration-300"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Start Application
                                </motion.button>
                            </Link>
                            <motion.button
                                className="bg-transparent border-2 border-blue-900 text-blue-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-900 hover:text-white transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Download Brochure
                            </motion.button>
                        </div>

                        {/* Contact Info */}
                        <div className="mt-8 pt-6 border-t border-blue-800/30">
                            <p className="text-lg">
                                Have questions? Call us at{" "}
                                <span className="font-bold">+234 800 123 4567</span> or email{" "}
                                <span className="font-bold">admissions@hallmarkacademy.ng</span>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default GetStarted;