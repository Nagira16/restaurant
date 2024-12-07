const page = ({ params }: { params: { id: string } }): JSX.Element => {
    console.log(params.id);

    return <div>OrderConfirm</div>;
};

export default page;
