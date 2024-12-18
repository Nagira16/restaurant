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
                            src="https://images.squarespace-cdn.com/content/v1/6001f6e8b4d633626a2e4273/1623713054757-TSWPQ9Y46VWMKEWPLR2F/1.jpg"
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
                            src="https://scontent.fcxh3-1.fna.fbcdn.net/v/t1.6435-9/155525014_109838191136659_949389403497147727_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_ohc=X9QfjNB_dRgQ7kNvgGvy0Vn&_nc_zt=23&_nc_ht=scontent.fcxh3-1.fna&_nc_gid=ARA9J2cpu3xN-3owJJRzNu5&oh=00_AYDoYxTwjSZ1_-rLpPq3Xng-Ic2fghthYlJgG9YhVXF9YA&oe=6789D5A8"
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
