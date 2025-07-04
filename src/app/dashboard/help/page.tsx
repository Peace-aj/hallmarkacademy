"use client";

import { useState } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Accordion, AccordionTab } from "primereact/accordion";
import { HelpCircle, Search, MessageCircle, Book, Video, Mail } from "lucide-react";

const HelpPage = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const faqData = [
        {
            question: "How do I reset my password?",
            answer: "You can reset your password by going to Settings > Security > Change Password. Enter your current password and then your new password twice to confirm."
        },
        {
            question: "How do I add a new student?",
            answer: "Navigate to Students > Add New Student. Fill in all required information including personal details, parent information, and class assignment."
        },
        {
            question: "How can I view attendance reports?",
            answer: "Go to Reports > Attendance to view detailed attendance reports. You can filter by date range, class, or individual student."
        },
        {
            question: "How do I schedule an exam?",
            answer: "Visit Exams > Schedule New Exam. Set the exam details including subject, date, time, duration, and assign it to the appropriate classes."
        },
        {
            question: "How can I communicate with parents?",
            answer: "Use the Messages section to send direct messages to parents. You can also send announcements that will be visible to all parents."
        },
        {
            question: "How do I generate report cards?",
            answer: "Go to Reports > Report Cards. Select the term, class, and students, then click Generate. The system will create comprehensive report cards with grades and comments."
        }
    ];

    const helpCategories = [
        {
            title: "Getting Started",
            icon: Book,
            description: "Learn the basics of using the system",
            articles: 12
        },
        {
            title: "Student Management",
            icon: HelpCircle,
            description: "Managing student records and information",
            articles: 8
        },
        {
            title: "Academic Records",
            icon: Book,
            description: "Grades, exams, and academic tracking",
            articles: 15
        },
        {
            title: "Communication",
            icon: MessageCircle,
            description: "Messaging and announcements",
            articles: 6
        }
    ];

    const filteredFAQs = faqData.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6 max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <HelpCircle className="text-white" size={20} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Help & Support</h1>
                    <p className="text-gray-600">Find answers and get assistance</p>
                </div>
            </div>

            {/* Search */}
            <Card className="mb-6">
                <div className="flex items-center gap-3">
                    <Search className="text-gray-400" size={20} />
                    <InputText
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for help articles, FAQs, or topics..."
                        className="flex-1"
                    />
                    <Button label="Search" />
                </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Quick Actions */}
                    <Card>
                        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Button className="p-button-outlined h-20 flex flex-col gap-2">
                                <Video size={24} />
                                <span>Video Tutorials</span>
                            </Button>
                            <Button className="p-button-outlined h-20 flex flex-col gap-2">
                                <MessageCircle size={24} />
                                <span>Live Chat</span>
                            </Button>
                            <Button className="p-button-outlined h-20 flex flex-col gap-2">
                                <Mail size={24} />
                                <span>Contact Support</span>
                            </Button>
                        </div>
                    </Card>

                    {/* FAQ */}
                    <Card>
                        <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
                        <Accordion>
                            {filteredFAQs.map((faq, index) => (
                                <AccordionTab key={index} header={faq.question}>
                                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                                </AccordionTab>
                            ))}
                        </Accordion>
                        
                        {filteredFAQs.length === 0 && searchQuery && (
                            <div className="text-center py-8 text-gray-500">
                                <HelpCircle size={48} className="mx-auto mb-4 text-gray-300" />
                                <p>No FAQs found matching your search.</p>
                                <p className="text-sm mt-2">Try different keywords or contact support.</p>
                            </div>
                        )}
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Help Categories */}
                    <Card>
                        <h3 className="text-lg font-semibold mb-4">Help Categories</h3>
                        <div className="space-y-3">
                            {helpCategories.map((category, index) => (
                                <div key={index} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                                    <div className="flex items-center gap-3">
                                        <category.icon size={20} className="text-blue-600" />
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-800">{category.title}</h4>
                                            <p className="text-xs text-gray-600">{category.description}</p>
                                            <span className="text-xs text-blue-600">{category.articles} articles</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Contact Support */}
                    <Card>
                        <h3 className="text-lg font-semibold mb-4">Need More Help?</h3>
                        <div className="space-y-3">
                            <div className="text-sm text-gray-600">
                                <p className="mb-2">Can't find what you're looking for?</p>
                                <p>Our support team is here to help!</p>
                            </div>
                            
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <Mail size={16} className="text-gray-500" />
                                    <span>support@hallmarkacademy.ng</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <MessageCircle size={16} className="text-gray-500" />
                                    <span>Live chat: 9 AM - 5 PM</span>
                                </div>
                            </div>
                            
                            <Button label="Contact Support" className="w-full mt-4" />
                        </div>
                    </Card>

                    {/* System Status */}
                    <Card>
                        <h3 className="text-lg font-semibold mb-4">System Status</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm">All Systems</span>
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                    Operational
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Database</span>
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                    Operational
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm">API</span>
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                    Operational
                                </span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default HelpPage;