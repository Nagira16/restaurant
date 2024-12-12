import React from "react";

const TermsAndConditionsPage = () => {
    return (
        <div className="bg-gray-50 py-12">
            {/* Header Section */}
            <div className="max-w-6xl mx-auto px-6 text-center">
                <h1 className="text-4xl font-bold text-gray-800">
                    Terms and Conditions
                </h1>
                <p className="mt-4 text-gray-600 text-lg">
                    Welcome to Doña Vicky! By accessing our website or visiting
                    our restaurant, you agree to these terms and conditions.
                    Please read them carefully.
                </p>
            </div>

            {/* Content Section */}
            <div className="max-w-6xl mx-auto px-6 mt-12 space-y-8">
                {/* Section 1 */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        1. General Information
                    </h2>
                    <p className="mt-2 text-gray-600">
                        Doña Vicky operates under the laws of Canada. These
                        terms and conditions govern your use of our website,
                        services, and your visits to our restaurant locations.
                    </p>
                </div>

                {/* Section 2 */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        2. Reservations and Payments
                    </h2>
                    <p className="mt-2 text-gray-600">
                        Reservations can be made online or in person. A deposit
                        may be required to secure your booking. Full payment for
                        services is required at the time of service. Payments
                        can be made using cash, credit cards, or other payment
                        methods accepted by Doña Vicky.
                    </p>
                    <p className="mt-2 text-gray-600">
                        Late arrivals may result in the cancellation of your
                        reservation after a grace period of 15 minutes.
                    </p>
                </div>

                {/* Section 3 */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        3. Cancellation and Refund Policy
                    </h2>
                    <p className="mt-2 text-gray-600">
                        Refunds for canceled reservations are at the discretion
                        of the management and may be subject to a cancellation
                        fee. Refunds will not be provided for no-shows or
                        cancellations made less than 24 hours before the
                        reservation time.
                    </p>
                    <p className="mt-2 text-gray-600">
                        In the case of canceled events or unforeseen
                        circumstances, Doña Vicky will contact customers
                        directly to offer refunds or reschedule options.
                    </p>
                </div>

                {/* Section 4 */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        4. Use of Our Website
                    </h2>
                    <p className="mt-2 text-gray-600">
                        By accessing our website, you agree not to misuse the
                        information or functionality provided. This includes,
                        but is not limited to, uploading harmful content,
                        attempting unauthorized access, or copying material
                        without permission.
                    </p>
                    <p className="mt-2 text-gray-600">
                        Doña Vicky reserves the right to restrict access to our
                        website at our discretion for violations of these terms.
                    </p>
                </div>

                {/* Section 5 */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        5. Customer Conduct
                    </h2>
                    <p className="mt-2 text-gray-600">
                        Customers are expected to behave respectfully toward our
                        staff and other guests. Any form of harassment,
                        discrimination, or disruptive behavior will result in
                        immediate removal from the premises and may lead to
                        further legal action.
                    </p>
                </div>

                {/* Section 6 */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        6. Privacy Policy
                    </h2>
                    <p className="mt-2 text-gray-600">
                        Doña Vicky values your privacy. Any personal information
                        collected during reservations, website visits, or other
                        interactions will be handled in accordance with our
                        privacy policy. We do not sell or share your information
                        with third parties without your consent.
                    </p>
                </div>

                {/* Section 7 */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        7. Changes to Terms
                    </h2>
                    <p className="mt-2 text-gray-600">
                        Doña Vicky reserves the right to modify these terms and
                        conditions at any time. Changes will be effective
                        immediately upon posting on our website. Continued use
                        of our services constitutes acceptance of the revised
                        terms.
                    </p>
                </div>

                {/* Section 8 */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        8. Liability
                    </h2>
                    <p className="mt-2 text-gray-600">
                        Doña Vicky is not responsible for any personal injury,
                        loss, or damage incurred during visits to our locations,
                        except where caused by negligence on our part. Customers
                        are responsible for their personal belongings while on
                        our premises.
                    </p>
                </div>

                {/* Section 9 */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        9. Contact Information
                    </h2>
                    <p className="mt-2 text-gray-600">
                        If you have questions about these terms and conditions,
                        you can contact us directly via our{" "}
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
                    Thank you for choosing Doña Vicky. We hope to provide you
                    with an exceptional dining experience!
                </p>
            </div>
        </div>
    );
};

export default TermsAndConditionsPage;
