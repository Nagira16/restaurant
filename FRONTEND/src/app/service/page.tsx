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
                <div className="bg-white shadow-md rounded-lg p-6 text-center">
                    <Image
                        src="https://scontent.fcxh2-1.fna.fbcdn.net/v/t39.30808-6/395752194_122143637396011350_2153682814446257606_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=tTLQ_Z7GhwIQ7kNvgHLjwjt&_nc_zt=23&_nc_ht=scontent.fcxh2-1.fna&_nc_gid=A6VDClGIljh6GmBjE9ybnTV&oh=00_AYA6eUydtEq1Qs2KrsNdcwfrZ8AHLhwtXy2V8aMUVzhp0g&oe=67445A12"
                        alt="Dine-In"
                        width={300}
                        height={300}
                        className="mx-auto rounded-lg"
                    />
                    <h2 className="text-2xl font-semibold text-gray-800 mt-4">
                        Dine-In
                    </h2>
                    <p className="mt-2 text-gray-600">
                        Enjoy a cozy atmosphere with authentic Mexican dishes
                        prepared fresh daily.
                    </p>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6 text-center">
                    <Image
                        src="https://scontent.fcxh2-1.fna.fbcdn.net/v/t39.30808-6/393680795_122141911502011350_8394217561904025029_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_ohc=UkXgRu5RDXoQ7kNvgHMziaN&_nc_zt=23&_nc_ht=scontent.fcxh2-1.fna&_nc_gid=AfbEgv9SPjb2tgejiGVGbjz&oh=00_AYBW5L_6r0v31As4_RrAH6zj9Osmwo5FWTNTAz8WFIDyFQ&oe=6744544B"
                        alt="Takeaway"
                        width={300}
                        height={300}
                        className="mx-auto rounded-lg"
                    />
                    <h2 className="text-2xl font-semibold text-gray-800 mt-4">
                        Takeaway
                    </h2>
                    <p className="mt-2 text-gray-600">
                        Craving Mexican food on the go? Order your favorite
                        dishes and enjoy them wherever you are.
                    </p>
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
