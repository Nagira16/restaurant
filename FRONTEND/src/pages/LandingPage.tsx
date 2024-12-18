"use client";

import React from "react";
import { SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

const LandingPage: React.FC = () => {
    const { isSignedIn } = useUser();

    const dishes = [
        {
            src: "https://scontent.fcxh3-1.fna.fbcdn.net/v/t39.30808-6/458921322_122220809468011350_4146606072115599973_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_ohc=m-nydNT1KtYQ7kNvgHXrrZJ&_nc_zt=23&_nc_ht=scontent.fcxh3-1.fna&_nc_gid=A1WubAsyYOdqxsYTwEEonMj&oh=00_AYANeyBXZrYeW2ZYCbeyLCe50yrO6e0uZkG0AUPpndNzxg&oe=6766E3AC",
            alt: "Quesabirrias",
            title: "Quesabirrias",
            description:
                "Savory quesabirrias filled with melted cheese and served with rich consomé."
        },
        {
            src: "https://scontent.fcxh3-1.fna.fbcdn.net/v/t39.30808-6/459194862_122221632032011350_1706414817946160732_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=XYfefPfAz9kQ7kNvgGWaVBU&_nc_zt=23&_nc_ht=scontent.fcxh3-1.fna&_nc_gid=Aef9hvziRUXzjWDAxc8WDIx&oh=00_AYC4TTKTclGZqvYmmJ0OitRhTUmK1aXyImMDidYZdxgF5Q&oe=6766DC7D",
            alt: "Birria en Caldo",
            title: "Birria en Caldo",
            description:
                "Traditional birria stew, slow-cooked with aromatic spices for a rich, hearty flavor."
        },
        {
            src: "https://scontent.fcxh3-1.fna.fbcdn.net/v/t39.30808-6/459161284_122221884386011350_423131921714823147_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=ot6beN6C96cQ7kNvgE5-_Nl&_nc_zt=23&_nc_ht=scontent.fcxh3-1.fna&_nc_gid=AKDnf7G_kcy4gnqcFFN64Zg&oh=00_AYDR4pYmdlWnorY9qOdoT-_v0M3IJeRghdi8fYa8y-bTFQ&oe=6766BC4B",
            alt: "Taco de Birria",
            title: "Taco de Birria",
            description: "Crispy birria tacos served with consomé for dipping."
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
            imgSrc: "https://img.freepik.com/premium-photo/professional-chef-woman-smiling-kitchen-uniform_763111-6720.jpg?w=740"
        },
        {
            name: "Chef Luis Ramirez",
            experience: "8 Years Experience",
            description: "Focuses on authentic mole and regional specialties.",
            imgSrc: "https://img.freepik.com/premium-photo/portrait-chef-standing-crossed-arms_763111-6723.jpg?w=740"
        }
    ];

    return (
        <div className="bg-white py-8 px-8">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 h-auto pt-0 mt-0 mb-12">
                <div className="max-w-xl text-center lg:text-left">
                    <h1 className="text-6xl font-bold text-gray-900 mb-4 leading-tight">
                        Experience the True Taste of{" "}
                        <span className="text-green-600">Doña Vicky</span>
                    </h1>
                    <p className="text-gray-700 text-xl mb-6">
                        Welcome to Doña Vicky, where birria takes center stage.
                        Enjoy the bold and authentic flavors that celebrate
                        Mexico’s rich culinary heritage. From our savory
                        quesabirrias to our heartwarming birria stew and
                        perfectly crafted birria tacos, every dish is a
                        testament to tradition and passion.
                    </p>
                    <div className="flex justify-center lg:justify-start gap-4">
                        <Link href="/about">
                            <button className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 text-lg w-40 text-center">
                                Learn More
                            </button>
                        </Link>
                        {!isSignedIn && (
                            <SignInButton mode="modal">
                                <button className="px-6 py-3 bg-white text-black border border-black rounded-full hover:bg-gray-100 text-lg w-40 text-center">
                                    Sign In
                                </button>
                            </SignInButton>
                        )}
                    </div>
                </div>
                <div className="w-full lg:w-1/2">
                    <Image
                        src="https://www.thecookierookie.com/wp-content/uploads/2024/05/street-tacos-recipe-2.jpg"
                        alt="Birria Dish"
                        width={700}
                        height={600}
                        className="rounded-3xl shadow-lg object-cover"
                    />
                </div>
            </div>

            {/* Our Signature Dishes */}
            <div className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="flex flex-col items-center">
                        {/* Subtítulo */}
                        <p className="text-lg text-gray-500 uppercase tracking-widest mb-2">
                            Experience Excellence
                        </p>
                        {/* Título Principal */}
                        <h2 className="text-5xl font-bold text-gray-900 mb-4">
                            Our Signature Dishes
                        </h2>
                        {/* Separador */}
                        <div className="w-24 h-1 bg-green-500 rounded-full mb-8"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {dishes.map((dish, index) => (
                            <div
                                key={index}
                                className="relative group text-center bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 transform hover:scale-105 hover:-translate-y-2"
                            >
                                <div className="overflow-hidden rounded-2xl">
                                    <Image
                                        src={dish.src}
                                        alt={dish.alt}
                                        width={500}
                                        height={600}
                                        objectFit="cover"
                                        className="rounded-2xl transform transition-transform duration-500 group-hover:scale-110 group-hover:translate-y-[-10px]"
                                    />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mt-6">
                                    {dish.title}
                                </h3>
                                <p className="text-gray-700 mt-2 text-lg">
                                    {dish.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Meet Our Chefs */}
            <div className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto text-center">
                    {/* <h3 className="text-4xl font-bold text-gray-900 mb-12">
                        Meet Our Chefs
                    </h3> */}
                    <div className="flex flex-col items-center mb-12">
                        <h3 className="text-4xl font-bold text-gray-900 mb-4">
                            Meet Our Chefs
                        </h3>
                        {/* Separador */}
                        <div className="w-24 h-1 bg-green-500 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {chefs.map((chef, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-lg p-6 text-center"
                            >
                                <Image
                                    src={chef.imgSrc}
                                    alt={chef.name}
                                    width={250}
                                    height={350}
                                    className="rounded-full mx-auto mb-4 object-cover"
                                />
                                <h4 className="text-2xl font-semibold text-gray-900">
                                    {chef.name}
                                </h4>
                                <p className="text-green-600 font-medium mb-2">
                                    {chef.experience}
                                </p>
                                <p className="text-gray-600">
                                    {chef.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="py-16 text-center bg-green-100 rounded-3xl">
                <h4 className="text-3xl font-bold text-gray-900 mb-4">
                    Want to Reserve a Table?
                </h4>
                <p className="text-gray-700 mb-6 text-lg">
                    Join us for an unforgettable dining experience at Doña
                    Vicky.
                </p>
                <Link href="/book-table">
                    <span className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 cursor-pointer text-lg">
                        Book a Table
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default LandingPage;
