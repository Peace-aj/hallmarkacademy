'use client';

import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gradient-to-b from-black to-gray-900 text-white py-12">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Newsletter Subscription */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Subscribe to Our Newsletter</h3>
                    <p className="mb-4 text-gray-300">
                        Stay updated with the latest news and events from Hallmark Academy.
                    </p>
                    <form className="flex flex-col items-center">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 rounded-md bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="mt-2 w-full px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-md"
                        >
                            Subscribe
                        </button>
                    </form>

                </div>

                {/* Contact Information */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                    <p className="text-gray-300">
                        123 Education Lane<br />
                        Abuja, FCT, Nigeria<br />
                        Phone: +234 800 123 4567<br />
                        Email: info@hallmarkacademy.ng
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                    <ul className="text-gray-300">
                        <li className="mb-2">
                            <Link href="/about" className="hover:underline">
                                About Us
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link href="/admissions" className="hover:underline">
                                Admissions
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link href="/academics" className="hover:underline">
                                Academics
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link href="/contact" className="hover:underline">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                    <div className="flex space-x-4">
                        <a
                            href="https://facebook.com/hallmarkacademy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-white"
                        >
                            <FaFacebookF size={24} />
                        </a>
                        <a
                            href="https://twitter.com/hallmarkacademy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-white"
                        >
                            <FaTwitter size={24} />
                        </a>
                        <a
                            href="https://instagram.com/hallmarkacademy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-white"
                        >
                            <FaInstagram size={24} />
                        </a>
                        <a
                            href="https://linkedin.com/company/hallmarkacademy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-white"
                        >
                            <FaLinkedinIn size={24} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
                <p>© {new Date().getFullYear()} Hallmark Academy. All rights reserved.</p>
                <p className="mt-2">
                    <Link href="/privacy-policy" className="hover:underline">
                        Privacy Policy
                    </Link>{' '}
                    |{' '}
                    <Link href="/terms-of-service" className="hover:underline">
                        Terms of Service
                    </Link>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
