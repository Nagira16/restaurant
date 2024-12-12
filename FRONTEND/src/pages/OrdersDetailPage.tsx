import { getAllTablesById } from "@/actions";
import { Endpoint, ItemOrderDetailsWithMenuInfo, Order_Details } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import BackButton from "@/components/BackButton";

type OrdersDetailPageProps = {
    orderId: string;
};

const OrdersDetailPage = async ({
    orderId
}: OrdersDetailPageProps): Promise<JSX.Element> => {
    const orderDetails = await getAllTablesById<Order_Details | null>(
        Endpoint.orderDetails,
        orderId
    );

    const itemOrderDetails = await getAllTablesById<
        ItemOrderDetailsWithMenuInfo[] | null
    >(Endpoint.itemOrderDetails, orderId);

    if (!orderDetails) {
        return (
            <div className="container mx-auto p-6 text-center text-red-500">
                <p>No order details found.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 space-y-6">
            <BackButton />
            <Card className="shadow-lg hover:shadow-2xl transition-all duration-300">
                <CardHeader className="bg-green-500 text-white rounded-t-xl">
                    <CardTitle className="text-xl font-bold">
                        Order Details
                    </CardTitle>
                </CardHeader>
                <CardContent className="mt-2">
                    <div className="space-y-3">
                        <p className="text-lg font-semibold text-gray-800">
                            <strong>Order ID:</strong>
                            <span className="text-gray-600">
                                {orderDetails.id}
                            </span>
                        </p>
                        <p className="text-lg font-semibold text-gray-800">
                            <strong>Status:</strong>
                            <span
                                className={`${
                                    orderDetails.status === "PENDING"
                                        ? "text-yellow-500"
                                        : "text-green-500"
                                }`}
                            >
                                {orderDetails.status}
                            </span>
                        </p>
                        <p className="text-lg font-semibold text-gray-800">
                            <strong>Total Price:</strong>
                            <span className="font-bold text-blue-600">
                                $
                                {parseFloat(
                                    orderDetails.total_price.toString()
                                ).toFixed(2)}
                            </span>
                        </p>
                        <p className="text-lg font-semibold text-gray-800">
                            <strong>Order Date:</strong>
                            <span className="text-gray-600">
                                {new Date(orderDetails.date).toLocaleString()}
                            </span>
                        </p>
                    </div>
                </CardContent>
            </Card>

            {itemOrderDetails && itemOrderDetails.length > 0 && (
                <Card className="shadow-lg hover:shadow-2xl transition-all duration-300">
                    <CardHeader className="bg-orange-500 text-white rounded-t-xl">
                        <CardTitle className="text-xl font-bold">
                            Items Ordered
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="flex justify-center sm:justify-start sm:space-x-4 flex-wrap">
                            {itemOrderDetails.map((item) => (
                                <li
                                    key={item.id}
                                    className="flex flex-col justify-start items-center md:items-start mt-7 space-y-1"
                                >
                                    <Image
                                        src={item.menu.image!}
                                        alt={item.menu.name!}
                                        width={150}
                                        height={100}
                                        className="rounded-xl h-[200px]"
                                    />
                                    <span className="font-semibold text-gray-700">
                                        {item.menu.name}
                                    </span>
                                    <span className="text-gray-600">
                                        Quantity: {item.quantity}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            )}
            <Card>
                <CardHeader className="bg-red-500 text-white rounded-t-xl">
                    <CardTitle className="text-xl font-bold">
                        Pick Up Location
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                    <div>
                        <p className="text-lg font-semibold">Store Location:</p>
                        <p className="text-gray-600">
                            428 Carrall St, Vancouver, BC V6B 2J7, Canada
                        </p>
                    </div>

                    <div className="mt-4">
                        <p className="text-lg font-semibold">
                            Pick Up Instructions:
                        </p>
                        <p className="text-gray-600">
                            Please come to the main entrance and head to the
                            pick-up counter.
                        </p>
                    </div>

                    <div className="mt-4">
                        <p className="text-lg font-semibold">
                            Location on Map:
                        </p>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2602.755305810403!2d-123.10676632351112!3d49.28103367139255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548671006edf8f2b%3A0x5aeee343927d6445!2sDo%C3%B1a%20Vicky%20Mexican%20Food%20Chinatown!5e0!3m2!1sja!2sca!4v1733905408182!5m2!1sja!2sca"
                            className="border-0 w-full h-[400px] max-w-full"
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default OrdersDetailPage;
