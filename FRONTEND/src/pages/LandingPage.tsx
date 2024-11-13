// import React from "react";
// import { SignInButton } from "@clerk/nextjs";

// const LandingPage: React.FC = () => {
//     return (
//         <div className="bg-white py-16 px-8">
//             <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between min-h-[70vh]">
//                 <div className="max-w-lg">
//                     <h1 className="text-4xl font-bold text-gray-900 mb-4">
//                         Experience the True Taste of{" "}
//                         <span className="text-green-600">Doña Vicky</span>
//                     </h1>
//                     <p className="text-gray-700 mb-4 text-lg">
//                         Welcome to our authentic Mexican restaurant, where every
//                         dish bursts with flavor and every visit feels like a
//                         fiesta. Join us for a vibrant dining experience that
//                         celebrates the rich culinary traditions of Mexico.
//                     </p>
//                     <div className="flex space-x-4">
//                         <a
//                             href="/learn-more"
//                             className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800"
//                         >
//                             Learn More
//                         </a>
//                         <SignInButton mode="modal">
//                             <button className="px-6 py-3 border border-black rounded hover:bg-gray-100">
//                                 Sign In
//                             </button>
//                         </SignInButton>
//                     </div>
//                 </div>
//                 <div className="mt-8 lg:mt-0 lg:ml-12 w-full lg:w-1/2 h-72 bg-gray-300 flex items-center justify-center">
//                     {/* Placeholder for an image */}
//                     <span className="text-gray-500">Image Placeholder</span>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LandingPage;

import React from "react";
import { SignInButton } from "@clerk/nextjs";

const LandingPage: React.FC = () => {
    return (
        <div className="bg-white py-16 px-10 md:px-16 lg:px-24">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between min-h-[70vh]">
                <div className="max-w-lg">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Experience the True Taste of{" "}
                        <span className="text-green-600">Doña Vicky</span>
                    </h1>
                    <p className="text-gray-700 mb-4 text-lg">
                        Welcome to our authentic Mexican restaurant, where every
                        dish bursts with flavor and every visit feels like a
                        fiesta. Join us for a vibrant dining experience that
                        celebrates the rich culinary traditions of Mexico.
                    </p>
                    <div className="flex space-x-4">
                        <a
                            href="/learn-more"
                            className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800"
                        >
                            Learn More
                        </a>
                        <SignInButton mode="modal">
                            <button className="px-6 py-3 border border-black rounded hover:bg-gray-100">
                                Sign In
                            </button>
                        </SignInButton>
                    </div>
                </div>
                <div className="mt-8 lg:mt-0 lg:ml-12 w-full lg:w-1/2 h-72 bg-gray-300 flex items-center justify-center">
                    {/* Placeholder for an image */}
                    <span className="text-gray-500">Image Placeholder</span>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
