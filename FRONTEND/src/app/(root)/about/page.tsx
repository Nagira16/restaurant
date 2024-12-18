import Image from "next/image";
import { ChefHat, Clock, MapPin, UtensilsCrossed } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#FFF9F5]">
            {/* Hero Section */}
            <div className="relative h-[400px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 z-10" />
                <Image
                    src="https://img.freepik.com/premium-photo/authentic-birria-tacos-filled-tender-wallpaper_987764-14625.jpg?w=1060"
                    alt="Mexican cuisine background"
                    width={1920}
                    height={400}
                    className="object-cover w-full h-full"
                    priority
                />
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-white text-center">
                        About Us
                    </h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                {/* Mission Statement */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    {/* <h2 className="text-3xl font-bold text-red-600 mb-6">
                        about us
                    </h2> */}
                    <p className="text-lg text-gray-700 mb-6">
                        Doña Vicky is a place where authentic Mexican flavors
                        meet family tradition. We are proud to serve delicious
                        Mexican dishes made with fresh ingredients and lots of
                        love. Our mission is to provide an unforgettable
                        culinary experience that brings the taste of Mexico to
                        every bite.
                    </p>
                    <p className="text-lg text-gray-700">
                        From tacos to birria, every dish is crafted with a
                        passion for our culture and a commitment to excellence.
                        Join us and be part of our story — where every meal is a
                        celebration.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <ChefHat className="w-12 h-12 mx-auto mb-4 text-red-600" />
                        <h3 className="font-semibold text-xl mb-2">
                            Traditional Recipes
                        </h3>
                        <p className="text-gray-600">
                            Authentic Mexican flavors passed down through
                            generations
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <UtensilsCrossed className="w-12 h-12 mx-auto mb-4 text-red-600" />
                        <h3 className="font-semibold text-xl mb-2">
                            Fresh Ingredients
                        </h3>
                        <p className="text-gray-600">
                            Quality ingredients sourced daily for the best taste
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <Clock className="w-12 h-12 mx-auto mb-4 text-red-600" />
                        <h3 className="font-semibold text-xl mb-2">
                            Family Time
                        </h3>
                        <p className="text-gray-600">
                            Creating memories one meal at a time
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <MapPin className="w-12 h-12 mx-auto mb-4 text-red-600" />
                        <h3 className="font-semibold text-xl mb-2">
                            Local Favorite
                        </h3>
                        <p className="text-gray-600">
                            Proudly serving our community since establishment
                        </p>
                    </div>
                </div>
                <div className="py-16 text-center bg-red-100 rounded-3xl">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Join Us for a Memorable Experience
                    </h2>
                    <p className="text-gray-700 mb-6 text-base">
                        Come taste the authentic flavors of Mexico at Doña
                        Vicky.
                    </p>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 cursor-pointer text-base transition-all">
                        Visit Us Today
                    </button>
                </div>
            </div>
        </div>
    );
}
