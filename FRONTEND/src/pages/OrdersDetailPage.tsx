import { getAllTablesById } from "@/actions";
import { Endpoint, ItemOrderDetailsWithMenuInfo, Order_Details } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import BackButton from "@/components/BackButton";

type OrdersDetailPageProps = {
    orderId: string;
};

const OrdersDetailPage = async ({ orderId }: OrdersDetailPageProps) => {
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
                    <CardHeader className="bg-red-500 text-white rounded-t-xl">
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
        </div>
    );
};

export default OrdersDetailPage;
