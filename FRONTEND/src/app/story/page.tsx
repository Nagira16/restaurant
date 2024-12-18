import React from "react";
import Image from "next/image";
import Link from "next/link";

const OurStory = () => {
    return (
        <div className="bg-white py-16 px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 space-y-16">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:gap-16 gap-12">
                <div className="lg:w-1/2 space-y-8">
                    <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
                        Our Story
                    </h1>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        It all began with a dream to bring the authentic flavors
                        of México to Vancouver. At Doña Vicky, we’re not just
                        serving food; we’re sharing traditions, culture, and a
                        love for the vibrant, colorful, and soulful world of
                        Mexican cuisine.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Inspired by family recipes passed down through
                        generations, every dish is a tribute to our heritage.
                        Known for our signature birria en consomé and flavorful
                        tacos, every bite is a celebration of authentic Mexican
                        cuisine. These dishes have become the heart of our menu,
                        loved by locals and visitors alike for their rich taste
                        and traditional preparation.
                    </p>
                    <Link
                        href="/menus"
                        className="px-6 py-2 bg-green-600 text-white font-medium rounded-md shadow-lg hover:bg-green-700 hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 inline-block"
                    >
                        Explore Our Menu
                    </Link>
                </div>
                <div className="lg:w-1/2">
                    <div className="relative">
                        <Image
                            src="https://www.isabeleats.com/wp-content/uploads/2024/04/birria-tacos-recipe-5.jpg"
                            alt="Authentic Mexican Cuisine"
                            width={700}
                            height={500}
                            className="rounded-lg object-cover shadow-lg"
                        />
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="mt-16 bg-green-50 py-12 text-center rounded-lg shadow-lg max-w-6xl mx-auto space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">
                    Be Part of Our Story
                </h2>
                <p className="text-lg text-gray-700">
                    Join us at Doña Vicky and let us share with you the rich
                    heritage of Mexican cuisine. Whether it’s your first visit
                    or your hundredth, there’s always something new to discover.
                </p>
                <Link
                    href="/book-table"
                    className="inline-block px-8 py-3 bg-green-600 text-white font-medium rounded-md shadow-lg hover:bg-green-700 hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                >
                    Reserve Your Table
                </Link>
            </section>
        </div>
    );
};

export default OurStory;
