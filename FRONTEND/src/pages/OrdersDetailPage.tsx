import { getAllTablesById } from "@/actions";
import {
    Endpoint,
    FetchData,
    ItemOrderDetailsWithMenuInfo,
    Order_Details
} from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import BackButton from "@/components/BackButton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import LocationCard from "@/components/LocationCard";

type OrdersDetailPageProps = {
    orderId: string;
};

const OrdersDetailPage = async ({
    orderId
}: OrdersDetailPageProps): Promise<JSX.Element> => {
    // const orderDetails = await getAllTablesById<Order_Details | null>(
    //     Endpoint.orderDetails,
    //     orderId
    // );

    const res: Response = await fetch(
        `http://localhost:3001/orderDetails/${orderId}?nocache=` +
            new Date().getTime()
    );

    const data: FetchData = await res.json();

    const orderDetails = data.results as Order_Details;

    const itemOrderDetails = await getAllTablesById<
        ItemOrderDetailsWithMenuInfo[] | null
    >(Endpoint.itemOrderDetails, orderId);

    const getStatusColor = (status: string) => {
        const colors = {
            COMPLETED: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
            PENDING: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
            PREPARING: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
            PICKUP: "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20"
        } as const;

        return (
            colors[status as keyof typeof colors] ||
            "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
        );
    };

    return (
        <div className="container mx-auto p-6 space-y-6">
            <BackButton />
            <Card>
                <CardHeader className="bg-green-500/10">
                    <CardTitle className="text-xl text-green-700">
                        Order Details
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <dl className="grid gap-4">
                        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                            <dt className="text-sm font-medium text-gray-500">
                                Order ID
                            </dt>
                            <dd className="text-sm font-mono text-gray-900">
                                {orderDetails.id}
                            </dd>
                        </div>
                        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                            <dt className="text-sm font-medium text-gray-500">
                                Status
                            </dt>
                            <dd>
                                <Badge
                                    variant="secondary"
                                    className={getStatusColor(
                                        orderDetails.status
                                    )}
                                >
                                    {orderDetails.status}
                                </Badge>
                            </dd>
                        </div>
                        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                            <dt className="text-sm font-medium text-gray-500">
                                Total Price
                            </dt>
                            <dd className="text-sm font-medium text-gray-900">
                                $
                                {parseFloat(
                                    orderDetails.total_price.toString()
                                ).toFixed(2)}
                            </dd>
                        </div>
                        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                            <dt className="text-sm font-medium text-gray-500">
                                Order Date
                            </dt>
                            <dd className="text-sm text-gray-900">
                                {new Date(orderDetails.date).toLocaleString()}
                            </dd>
                        </div>
                    </dl>
                </CardContent>
            </Card>

            {itemOrderDetails && itemOrderDetails.length > 0 && (
                <Card>
                    <CardHeader className="bg-orange-500/10">
                        <CardTitle className="text-xl text-orange-700">
                            Items Ordered
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="grid gap-6">
                            {itemOrderDetails.map((item) => (
                                <div key={item.id}>
                                    <div className="flex gap-4">
                                        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                                            <Image
                                                src={item.menu.image!}
                                                alt={item.menu.name!}
                                                className="object-cover"
                                                fill
                                            />
                                        </div>
                                        <div className="flex flex-1 flex-col">
                                            <div className="flex flex-col sm:flex-row justify-between">
                                                <h4 className="text-base font-medium text-gray-900">
                                                    {item.menu.name}
                                                </h4>
                                                <p className="text-sm text-gray-600">
                                                    Quantity: {item.quantity}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <Separator />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            <LocationCard />
        </div>
    );
};

export default OrdersDetailPage;
