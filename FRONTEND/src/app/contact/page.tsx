import React from "react";
import Image from "next/image";

const page = () => {
    return (
        <section className="max-w-6xl mx-auto p-8">
            <h1 className="text-5xl font-extrabold mb-6 text-center text-red-600">
                Contact Us
            </h1>
            <p className="text-xl leading-8 text-gray-800 mb-6 text-center">
                We'd love to hear from you! Reach out to us with any questions,
                feedback, or to make a reservation.
            </p>
            <form className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block text-lg font-medium mb-1"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-lg font-medium mb-1"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="message"
                        className="block text-lg font-medium mb-1"
                    >
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        className="w-full p-2 border border-gray-300 rounded"
                        rows={5}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    Send Message
                </button>
            </form>
            <div className="flex justify-center mt-8 space-x-4">
                <Image
                    src="https://scontent.fcxh2-1.fna.fbcdn.net/v/t39.30808-6/382470109_122133831062011350_7272232219426344099_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=9zA6vDCl6rkQ7kNvgHLqMaO&_nc_zt=23&_nc_ht=scontent.fcxh2-1.fna&_nc_gid=AcbBPR9YbmYMY-0f07G9rf5&oh=00_AYBmWNjDqF22mJIZ0USiWaC6fF8bX8ytonjFjOMGWh7kuw&oe=674301B0"
                    alt="Contact Image 1"
                    width={300}
                    height={200}
                    className="rounded-lg shadow-lg"
                />
                <Image
                    src="https://scontent.fcxh2-1.fna.fbcdn.net/v/t39.30808-6/375829053_122124817964011350_1150285826433012919_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=xLzgHHTuH3wQ7kNvgHQvn3f&_nc_zt=23&_nc_ht=scontent.fcxh2-1.fna&_nc_gid=A9nC5twI4kTS_OJZtgeAHGC&oh=00_AYA6mNcI9CLDVq0wlLPKC-zLmBLcdfl3OeneU_wlMSqpvQ&oe=67431E20"
                    alt="Contact Image 2"
                    width={300}
                    height={200}
                    className="rounded-lg shadow-lg"
                />
            </div>
        </section>
    );
};

export default page;
