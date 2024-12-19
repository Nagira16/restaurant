"use client";

import { useState } from "react";
import { Send, MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsSubmitting(true);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        setIsSubmitting(false);
        setIsSent(true);

        setTimeout(() => setIsSent(false), 3000);
    }

    return (
        <div className="w-full px-4 py-12 md:py-16 lg:py-20 bg-white relative">
            {isSent && (
                <div className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white flex items-center px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-down">
                    <CheckCircle className="w-6 h-6 mr-2" />{" "}
                    <span>Message sent successfully!</span>
                </div>
            )}

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact Form */}
                <div className="p-6 border rounded-lg shadow-lg relative">
                    <h2 className="text-3xl font-bold text-red-600 mb-4 text-center">
                        Contact Us
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Name
                            </label>
                            <Input
                                id="name"
                                required
                                className="w-full mt-1 border-gray-300 focus:border-red-500 focus:ring-red-500"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <Input
                                id="email"
                                type="email"
                                required
                                className="w-full mt-1 border-gray-300 focus:border-red-500 focus:ring-red-500"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="message"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                rows={4}
                                required
                                className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:border-red-500 focus:ring-red-500"
                            ></textarea>
                        </div>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-red-600 hover:bg-red-700 text-white transition-colors"
                        >
                            {isSubmitting ? "Sending..." : "Send Message"}
                        </Button>
                    </form>
                </div>

                {/* Contact Info */}
                <div className="space-y-6 p-6 bg-gray-50 border rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-700">
                        Contact Information
                    </h2>
                    {/* Address Section */}
                    <div className="flex items-center space-x-4">
                        <MapPin className="w-6 h-6 text-red-600" />
                        <div>
                            <p className="text-gray-600">
                                428 Carrall St, Vancouver, BC, V6B 2J7, Canada
                                <br />
                                831 12th St, New Westminster, BC, V3M 4K4,
                                Canada
                            </p>
                        </div>
                    </div>
                    {/* Phone Section */}
                    <div className="flex items-center space-x-4">
                        <Phone className="w-6 h-6 text-red-600" />
                        <div>
                            <p className="text-gray-600">+1 (555) 123-4567</p>
                        </div>
                    </div>
                    {/* Email Section */}
                    <div className="flex items-center space-x-4">
                        <Mail className="w-6 h-6 text-red-600" />
                        <div>
                            <p className="text-gray-600">
                                donavickymexicanfood@gmail.com
                            </p>
                        </div>
                    </div>
                    {/* Opening Hours Section */}
                    <div className="flex items-start space-x-4 mt-6">
                        <Clock className="w-6 h-6 text-red-600" />
                        <div>
                            <p className="text-gray-600 mt-1">
                                Monday - Friday: 10:00 AM - 5:00 PM
                                <br />
                                Saturday: Closed
                                <br />
                                Sunday: 10:00 AM - 3:00 PM
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
