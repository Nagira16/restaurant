import React from "react";
import Image from "next/image";

const page = () => {
    return (
        <section className="max-w-6xl mx-auto p-8 rounded-lg shadow-lg">
            <h1 className="text-5xl font-extrabold mb-6 text-center text-red-600">
                About Doña Vicky
            </h1>
            <p className="text-xl leading-8 text-gray-800 mb-6">
                Doña Vicky is a place where authentic Mexican flavors meet
                family tradition. We are proud to serve delicious Mexican dishes
                made with fresh ingredients and lots of love. Our mission is to
                provide an unforgettable culinary experience that brings the
                taste of Mexico to every bite.
            </p>
            <p className="text-xl leading-8 text-gray-800 mb-6">
                From tacos to birria, every dish is crafted with a passion for
                our culture and a commitment to excellence. Join us and be part
                of our story — where every meal is a celebration.
            </p>
            <div className="flex flex-wrap sm:flex-nowrap justify-center mt-8 space-y-4 sm:space-y-0 space-x-0 sm:space-x-4">
                <Image
                    src="https://scontent.fcxh2-1.fna.fbcdn.net/v/t39.30808-6/459161284_122221884386011350_423131921714823147_n.jpg?stp=cp6_dst-jpg&_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=Kh2cIkb6GZcQ7kNvgFDkL-H&_nc_zt=23&_nc_ht=scontent.fcxh2-1.fna&_nc_gid=AuYCYL3JARZ7f0IqtigT7Zc&oh=00_AYA2XhtI9x0fyXaT75VKxM8E6kNqjurwf6L-1kjfqOGtYA&oe=6742EB8B"
                    alt="Authentic Mexican Dish"
                    width={300}
                    height={200}
                    className="rounded-lg shadow-lg"
                />
                <Image
                    src="https://scontent.fcxh2-1.fna.fbcdn.net/v/t39.30808-6/459194862_122221632032011350_1706414817946160732_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=HVEEuXmHO1MQ7kNvgHIFEoL&_nc_zt=23&_nc_ht=scontent.fcxh2-1.fna&_nc_gid=ArGPNH4okxOKfc6mq5NJ3wo&oh=00_AYAnqbfSauU9WCY8JKUnx19spHbLTKs7g2jvMIfwCP_xWA&oe=67430BBD"
                    alt="Another Mexican Dish"
                    width={300}
                    height={200}
                    className="rounded-lg shadow-lg"
                />
            </div>
        </section>
    );
};

export default page;
