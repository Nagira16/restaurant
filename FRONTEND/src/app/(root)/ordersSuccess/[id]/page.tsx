import OrderSuccessPage from "@/pages/OrderSuccessPage";

const page = ({ params }: { params: { id: string } }): JSX.Element => {
    const id: string = params.id;

    return (
        <div>
            <OrderSuccessPage orderId={id} />
        </div>
    );
};

export default page;
