import ReservationSuccessPage from "@/pages/BookTableSuccessPage";

const page = ({ params }: { params: { id: string } }): JSX.Element => {
    return (
        <div>
            <ReservationSuccessPage id={params.id} />
        </div>
    );
};

export default page;
