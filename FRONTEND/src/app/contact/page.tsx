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
            <div className="mt-8 flex justify-center">
                <Image
                    src="https://scontent.fcxh2-1.fna.fbcdn.net/v/t39.30808-6/367018308_842893104001635_3847409401975983796_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=78skr50YkxQQ7kNvgEWCd73&_nc_zt=23&_nc_ht=scontent.fcxh2-1.fna&_nc_gid=A1EVMltkX6Rgyq7EowCgIuv&oh=00_AYCmNhFecgDld7QwvltNcdJ5f2vDJVTd7XlToIBsY-Difg&oe=6745A951"
                    alt="Wide Contact Image"
                    width={800}
                    height={400}
                    className="rounded-lg shadow-lg"
                />
            </div>
        </section>
    );
};

export default page;
