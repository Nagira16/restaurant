import OrdersDetailPage from "@/pages/OrdersDetailPage";

const page = ({ params }: { params: { id: string } }): JSX.Element => {
    const id: string = params.id;

    return (
        <div>
            <OrdersDetailPage orderId={id} />
        </div>
    );
};

export default page;
