import React from "react";
import Image from "next/image";
import Link from "next/link";

const OurStory = () => {
    return (
        <div className="bg-white py-16 px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
                <div className="lg:w-1/2 space-y-6">
                    <h1 className="text-5xl font-extrabold text-gray-900">
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
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/menus" passHref>
                            <span className="px-8 py-3 bg-green-600 text-white font-medium rounded-full shadow-lg hover:bg-green-700 transition inline-block">
                                Explore Our Menu
                            </span>
                        </Link>
                        {/* <Link href="/book-table" passHref>
                            <span className="px-8 py-3 border border-green-600 text-green-600 font-medium rounded-full shadow-lg hover:bg-green-50 transition inline-block">
                                Reserve Your Table
                            </span>
                        </Link> */}
                    </div>
                </div>
                <div className="lg:w-1/2">
                    <Image
                        src="https://scontent.fcxh3-1.fna.fbcdn.net/v/t39.30808-6/366970779_842893560668256_6273195866836064384_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=c1Ue60e6-aoQ7kNvgHfVdK2&_nc_zt=23&_nc_ht=scontent.fcxh3-1.fna&_nc_gid=AFGUtls2wJzBwSf5CpuV6J1&oh=00_AYBZMGVRANwgSO29ZtnvpFJ_H2c_ZKHq79JcS7Nbod2-Lw&oe=675E8E5C"
                        alt="Authentic Mexican Cuisine"
                        width={700}
                        height={500}
                        className="rounded-2xl object-cover shadow-lg"
                    />
                </div>
            </section>

            {/* Photo Collage Section */}
            <section className="mt-16 max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                    A Glimpse Into Our World
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        "https://scontent.fcxh3-1.fna.fbcdn.net/v/t39.30808-6/456146478_122215702586011350_8738888829273555534_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_ohc=WNpmKqhw6AoQ7kNvgEM3euY&_nc_zt=23&_nc_ht=scontent.fcxh3-1.fna&_nc_gid=AIrfnYNH_re2wxcWpnPS1E5&oh=00_AYAYGnZMQKeSoLnKVBy9WpcNLenNld9LGaj_lPS0PNQxXg&oe=675E7945",
                        "https://scontent.fcxh3-1.fna.fbcdn.net/v/t39.30808-6/456060217_122215702574011350_8871807547836461731_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_ohc=O7LJhDV1GqcQ7kNvgHh8m6r&_nc_zt=23&_nc_ht=scontent.fcxh3-1.fna&_nc_gid=AnWBr94DachSv3AtH8vnHzw&oh=00_AYAI_4JMFHv0GcVNyy_weF7OF1V39LB6EExvJ9dFfoJ9NA&oe=675E753A",
                        "https://scontent.fcxh3-1.fna.fbcdn.net/v/t39.30808-6/456038049_122215702622011350_5772351759916382284_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_ohc=ziAftyp9f9wQ7kNvgHJDQmq&_nc_zt=23&_nc_ht=scontent.fcxh3-1.fna&_nc_gid=AM9QQSB2F_7mwnuK02oDQ4x&oh=00_AYCWyLxgvgL1pj2AWwA-hm2NJZbJuzyamxiWOrK6gEVNLg&oe=675E74FE",
                        "https://scontent.fcxh3-1.fna.fbcdn.net/v/t39.30808-6/456009413_122215702610011350_6610876060781215558_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_ohc=RKILrvxKagwQ7kNvgGB7GPZ&_nc_zt=23&_nc_ht=scontent.fcxh3-1.fna&_nc_gid=Ax_ZfDlsS5xmBuaM40Rx6pt&oh=00_AYC1t-a3v5pm_OJArL2rzDjURVEJWW_GqCFuNlzi_mFRSg&oe=675E728D",
                        "https://scontent.fcxh3-1.fna.fbcdn.net/v/t39.30808-6/375300391_122123854904011350_3574872586304929988_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_ohc=1uRKhn76LPcQ7kNvgGKbBOA&_nc_zt=23&_nc_ht=scontent.fcxh3-1.fna&_nc_gid=AySj1XThKGYG8uPVz7yf6BG&oh=00_AYDZnvh3oDXIx2MntiY9h_MGLOrjspUaK9UzxUr3IofXHw&oe=675E7898",
                        "https://scontent.fcxh3-1.fna.fbcdn.net/v/t39.30808-6/370382271_122114783954011350_3095403139607663923_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=pgqO_RSNRQAQ7kNvgEK6nkz&_nc_zt=23&_nc_ht=scontent.fcxh3-1.fna&_nc_gid=APXOdtfYKTsWOUVht5MNAa5&oh=00_AYCAonf3Wch_-OuAOIJGqNDIwdQxMBTo1JQ0EYJaGRZMkQ&oe=675E7A54"
                    ].map((src, index) => (
                        <Image
                            key={index}
                            src={src}
                            alt={`Photo ${index + 1}`}
                            width={300}
                            height={200}
                            className="rounded-xl object-cover shadow-lg"
                        />
                    ))}
                </div>
            </section>

            {/* Call to Action */}
            <section className="mt-16 bg-green-100 py-12 text-center rounded-xl shadow-lg">
                <h4 className="text-3xl font-bold text-gray-900">
                    Be Part of Our Story
                </h4>
                <p className="text-lg text-gray-700 mt-4">
                    Join us at Doña Vicky and let us share with you the rich
                    heritage of Mexican cuisine. Whether it’s your first visit
                    or your hundredth, there’s always something new to discover.
                </p>
                <Link href="/book-table" passHref>
                    <span className="px-8 py-3 bg-green-600 text-white font-medium rounded-full shadow-lg hover:bg-green-700 transition mt-6 inline-block">
                        Reserve Your Table
                    </span>
                </Link>
            </section>
        </div>
    );
};

export default OurStory;
