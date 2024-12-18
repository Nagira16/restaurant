"use client";

import { useState } from "react";
import { Send, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsSubmitting(false);
    }

    return (
        <div className="w-full px-4 py-12 md:py-16 lg:py-20 bg-white">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact Form */}
                <div className="p-6 border rounded-lg shadow-lg">
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

                    <div className="flex items-center space-x-4">
                        <MapPin className="w-6 h-6 text-red-600" />
                        <div>
                            <h3 className="font-medium text-gray-800">
                                Address
                            </h3>
                            <p className="text-gray-600">
                                428 Carrall St, Vancouver, BC, V6B 2J7, Canada
                                <br />
                                831 12th St, New Westminster, BC, V3M 4K4,
                                Canada
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Phone className="w-6 h-6 text-red-600" />
                        <div>
                            <h3 className="font-medium text-gray-800">Phone</h3>
                            <p className="text-gray-600">+1 (555) 123-4567</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Mail className="w-6 h-6 text-red-600" />
                        <div>
                            <h3 className="font-medium text-gray-800">Email</h3>
                            <p className="text-gray-600">
                                donavickymexicanfood@gmail.com
                            </p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="font-medium text-gray-800">
                            Opening Hours
                        </h3>
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
            <div className="mt-12 flex justify-center">
                <img
                    src="https://scontent.fcxh3-1.fna.fbcdn.net/v/t39.30808-6/367018308_842893104001635_3847409401975983796_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=yzTMeihH5PgQ7kNvgEULiiP&_nc_zt=23&_nc_ht=scontent.fcxh3-1.fna&_nc_gid=AVM_9dhJ-R_vgg_ooFpTC9e&oh=00_AYDL87qf8NR8chOm96Pu-3D3zdENTP8w7aKU7z-VMJXdmQ&oe=67682891"
                    alt="Descriptive Alt Text"
                    className="w-full md:w-[60%] lg:w-[83%] h-auto rounded-lg shadow-md"
                />
            </div>
        </div>
    );
}
