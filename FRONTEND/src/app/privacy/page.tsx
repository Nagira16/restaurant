import React from "react";

const PrivacyPolicyPage = () => {
    return (
        <div className="bg-gray-50 py-12">
            {/* Header Section */}
            <div className="max-w-6xl mx-auto px-6 text-center">
                <h1 className="text-4xl font-bold text-gray-800">
                    Privacy Policy
                </h1>
                <p className="mt-4 text-gray-600 text-lg">
                    At Doña Vicky, your privacy is our priority. This policy
                    outlines how we collect, use, and protect your personal
                    information.
                </p>
            </div>

            {/* Content Section */}
            <div className="max-w-6xl mx-auto px-6 mt-12 space-y-8">
                {/* Section 1 */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        1. Information We Collect
                    </h2>
                    <p className="mt-2 text-gray-600">
                        We may collect the following types of information:
                    </p>
                    <ul className="list-disc pl-6 text-gray-600 mt-2">
                        <li>
                            Personal identification information (name, email,
                            phone number).
                        </li>
                        <li>
                            Reservation details (date, time, and preferences).
                        </li>
                        <li>
                            Payment information for reservations and services.
                        </li>
                        <li>
                            Usage data when you visit our website, such as IP
                            address and browsing behavior.
                        </li>
                    </ul>
                </div>

                {/* Section 2 */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        2. How We Use Your Information
                    </h2>
                    <p className="mt-2 text-gray-600">
                        The information we collect is used to:
                    </p>
                    <ul className="list-disc pl-6 text-gray-600 mt-2">
                        <li>Process reservations and payments.</li>
                        <li>
                            Provide customer support and respond to inquiries.
                        </li>
                        <li>Improve our services and website experience.</li>
                        <li>
                            Send promotional emails or special offers (only if
                            you’ve opted in).
                        </li>
                    </ul>
                </div>

                {/* Section 3 */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        3. Sharing Your Information
                    </h2>
                    <p className="mt-2 text-gray-600">
                        We do not sell, trade, or rent your personal information
                        to third parties. However, we may share your information
                        in the following cases:
                    </p>
                    <ul className="list-disc pl-6 text-gray-600 mt-2">
                        <li>
                            To comply with legal obligations or respond to
                            lawful requests from public authorities.
                        </li>
                        <li>
                            With trusted service providers who assist in
                            operating our website or processing payments.
                        </li>
                        <li>
                            To protect the rights, property, or safety of Doña
                            Vicky, our customers, or others.
                        </li>
                    </ul>
                </div>

                {/* Section 4 */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        4. Data Security
                    </h2>
                    <p className="mt-2 text-gray-600">
                        We implement strict measures to protect your personal
                        information from unauthorized access, alteration,
                        disclosure, or destruction. However, no method of
                        transmission over the internet is 100% secure, and we
                        cannot guarantee absolute security.
                    </p>
                </div>

                {/* Section 5 */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        5. Your Rights
                    </h2>
                    <p className="mt-2 text-gray-600">You have the right to:</p>
                    <ul className="list-disc pl-6 text-gray-600 mt-2">
                        <li>
                            Access the personal data we have collected about
                            you.
                        </li>
                        <li>
                            Request corrections or updates to your information.
                        </li>
                        <li>
                            Request the deletion of your personal data, subject
                            to legal obligations.
                        </li>
                        <li>
                            Opt out of receiving promotional communications.
                        </li>
                    </ul>
                </div>

                {/* Section 6 */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        6. Changes to This Policy
                    </h2>
                    <p className="mt-2 text-gray-600">
                        Doña Vicky reserves the right to update this privacy
                        policy at any time. Changes will be posted on this page,
                        and we encourage you to review it periodically to stay
                        informed about how we protect your information.
                    </p>
                </div>

                {/* Section 7 */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        7. Contact Us
                    </h2>
                    <p className="mt-2 text-gray-600">
                        If you have questions or concerns about this privacy
                        policy or the handling of your data, please contact us
                        via our{" "}
                        <a
                            href="/contact"
                            className="text-green-600 hover:underline"
                        >
                            Contact Us page
                        </a>
                        .
                    </p>
                </div>
            </div>

            {/* Footer Section */}
            <div className="max-w-6xl mx-auto px-6 mt-12 text-center">
                <p className="text-gray-600">
                    Thank you for trusting Doña Vicky with your personal
                    information. Your privacy is important to us!
                </p>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
