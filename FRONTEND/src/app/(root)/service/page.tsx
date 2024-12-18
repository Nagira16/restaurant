import React from "react";
import Image from "next/image";
import Link from "next/link";

const ServicePage = () => {
    return (
        <div className="bg-gray-50 py-12">
            {/* Hero Section */}
            <div className="max-w-6xl mx-auto px-6 text-center">
                <h1 className="text-4xl font-bold text-gray-800">
                    Our Services at Doña Vicky
                </h1>
                <p className="mt-4 text-gray-600 text-lg">
                    Experience the best in Mexican cuisine with our exceptional
                    services. From dining in to takeaway, we bring authentic
                    flavors and unforgettable moments to every occasion.
                </p>
            </div>

            {/* Services Section */}
            <div className="max-w-6xl mx-auto px-6 mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Dine-In Card */}
                <div className="bg-white shadow-lg rounded-lg overflow-hidden group hover:shadow-2xl transition-all duration-300">
                    <div className="relative h-64">
                        <Image
                            src="https://media.istockphoto.com/id/2021971495/photo/3-beef-birria-tacos-stacked-on-black-plate.jpg?s=612x612&w=0&k=20&c=hjeeTH2QUP5vjun8RThM5WJLZbxoRVyiK8ODZ-qsV4g="
                            alt="Dine-In"
                            layout="fill"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    <div className="p-6 text-center">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Dine-In
                        </h2>
                        <p className="mt-2 text-gray-600">
                            Enjoy a cozy atmosphere with authentic Mexican
                            dishes prepared fresh daily.
                        </p>
                    </div>
                </div>

                {/* Takeaway Card */}
                <div className="bg-white shadow-lg rounded-lg overflow-hidden group hover:shadow-2xl transition-all duration-300">
                    <div className="relative h-64">
                        <Image
                            src="https://m.media-amazon.com/images/I/81DUssM+MNL.jpg"
                            alt="Takeaway"
                            layout="fill"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    <div className="p-6 text-center">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Takeaway
                        </h2>
                        <p className="mt-2 text-gray-600">
                            Craving Mexican food on the go? Order your favorite
                            dishes and enjoy them wherever you are.
                        </p>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="max-w-6xl mx-auto px-6 mt-16 text-center">
                <h2 className="text-3xl font-bold text-gray-800">
                    Ready to Experience Doña Vicky?
                </h2>
                <p className="mt-4 text-gray-600">
                    Visit us today or contact us to book your dining experience.
                    We’re here to make your visit unforgettable.
                </p>
                <Link
                    href="/contact"
                    className="mt-6 inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-all"
                >
                    Contact Us
                </Link>
            </div>
        </div>
    );
};

export default ServicePage;
