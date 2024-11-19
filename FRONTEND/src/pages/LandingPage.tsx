import React from "react";
import { SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

const LandingPage: React.FC = () => {
    const features = [
        "Fresh and locally sourced ingredients",
        "Authentic Mexican spices, herbs, and chilies",
        "Traditional dishes with a modern twist",
        "Classic street food favorites",
        "A wide variety of salsas, tacos, and specialties",
        "Delicious beverages and desserts"
    ];

    const dishes = [
        {
            src: "https://hips.hearstapps.com/hmg-prod/images/grilled-chicken-street-tacos-2-1672869118.jpg?crop=0.9059089973234508xw:1xh;center,top&resize=980:*",
            alt: "Mexican Dish 1"
        },
        {
            src: "https://hips.hearstapps.com/hmg-prod/images/mexican-chicken-casserole-vertical-6421f46f8cb14.jpg?crop=0.834xw:1.00xh;0.0308xw,0&resize=980:*",
            alt: "Mexican Dish 2"
        }
    ];

    const chefs = [
        {
            name: "Chef Juan Perez",
            experience: "15 Years Experience",
            description:
                "Specializes in traditional Mexican street food and gourmet tacos.",
            imgSrc: "https://img.freepik.com/premium-photo/professional-chef-man-showing-sign-delicious-male-chef-white-uniform-with-perfect-sign_763111-6717.jpg?w=740"
        },
        {
            name: "Chef Maria Gomez",
            experience: "10 Years Experience",
            description:
                "Expert in desserts and sweets, bringing creative spins to classic dishes.",
            imgSrc: "https://img.freepik.com/premium-photo/professional-chef-man-showing-sign-delicious-male-chef-white-uniform-with-perfect-sign_763111-6717.jpg?w=740"
        },
        {
            name: "Chef Luis Ramirez",
            experience: "8 Years Experience",
            description: "Focuses on authentic mole and regional specialties.",
            imgSrc: "https://img.freepik.com/premium-photo/professional-chef-man-showing-sign-delicious-male-chef-white-uniform-with-perfect-sign_763111-6717.jpg?w=740"
        }
    ];

    return (
        <div className="bg-white py-16 px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between min-h-[70vh]">
                <div className="max-w-lg">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">
                        Experience the True Taste of{" "}
                        <span className="text-green-600">Doña Vicky</span>
                    </h1>
                    <p className="text-gray-700 mb-6 text-xl">
                        Welcome to our authentic Mexican restaurant, where every
                        dish bursts with flavor and every visit feels like a
                        fiesta. Join us for a vibrant dining experience that
                        celebrates the rich culinary traditions of Mexico.
                    </p>
                    <div className="flex space-x-4 items-center">
                        <Link href="/learn-more" passHref>
                            <span className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 cursor-pointer text-lg inline-flex items-center justify-center">
                                Learn More
                            </span>
                        </Link>
                        <SignInButton mode="modal">
                            <button className="px-6 py-3 border border-black rounded-full hover:bg-gray-100 text-lg inline-flex items-center justify-center">
                                Sign In
                            </button>
                        </SignInButton>
                    </div>
                </div>
                <div className="mt-8 lg:mt-0 lg:ml-12 w-full lg:w-1/2 h-auto flex items-center justify-center">
                    <span className="text-gray-500">
                        <Image
                            src="https://media.gettyimages.com/id/1316454127/es/foto/salsas-mexicanas-de-salsa-guacamole-salsa-cheedar-salsa-de-tomate-y-pico-de-gallo-con-patatas.jpg?s=612x612&w=0&k=20&c=djroCjmnGoooHypkFzg37B3UKcmOEuSGQGgzRncgdbI="
                            alt="Mexican Sauces"
                            width={400}
                            height={300}
                            className="object-cover rounded-2xl max-w-full"
                        />
                    </span>
                </div>
            </div>

            <div className="py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
                        <div className="lg:w-[45%] mb-8 lg:mb-0">
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">
                                Key Features of Doña Vicky include
                            </h2>
                            <p className="text-gray-700 mb-4 text-lg">
                                Mexican cuisine is renowned for its bold
                                flavors, unique ingredients, and rich cultural
                                history. At Doña Vicky, we are proud to bring
                                you:
                            </p>
                            <ul className="list-disc pl-5 text-gray-700 mb-6 space-y-2">
                                {features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                            <Link href="/read-more" passHref>
                                <span className="inline-block px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 cursor-pointer">
                                    Read More
                                </span>
                            </Link>
                        </div>
                        <div className="lg:w-[55%] flex space-x-4">
                            {dishes.map((dish, index) => (
                                <Image
                                    key={index}
                                    src={dish.src}
                                    alt={dish.alt}
                                    width={300}
                                    height={400}
                                    className="object-cover rounded-lg shadow-lg"
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-16">
                    <h3 className="text-2xl font-bold text-gray-900 mb-8">
                        Meet Our Chefs
                    </h3>
                    <p className="text-gray-700 mb-8 text-lg">
                        At Doña Vicky, our team of chefs brings years of
                        culinary expertise and a deep love for Mexican cuisine.
                        Their passion for authentic flavors, creativity, and
                        traditional cooking techniques ensures that every dish
                        served is a masterpiece.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {chefs.map((chef, index) => (
                            <div
                                key={index}
                                className="bg-white p-8 rounded-lg shadow-lg text-center"
                            >
                                <div className="w-40 h-40 mx-auto mb-4">
                                    <Image
                                        src={chef.imgSrc}
                                        alt={chef.name}
                                        width={160}
                                        height={160}
                                        className="object-cover rounded-full"
                                    />
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-2">
                                    {chef.name}
                                </h4>
                                <p className="text-lg text-green-600 mb-1">
                                    {chef.experience}
                                </p>
                                <p className="text-gray-600 mb-4">
                                    {chef.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-16 text-center">
                    <h4 className="text-2xl font-bold text-gray-900 mb-4">
                        Want to Reserve a Table?
                    </h4>
                    <p className="text-gray-700 mb-4">
                        We invite you to enjoy an unforgettable dining
                        experience at Doña Vicky. Please note that our
                        reservation policies may vary to ensure the best
                        experience for our guests. Make sure to review our
                        guidelines before making a reservation.
                    </p>
                    <Link href="/book-table" passHref>
                        <span className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 cursor-pointer">
                            Book a Table
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
