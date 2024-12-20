import BookTableHistoryDetails from "@/pages/BookTableHistoryDetails";

const page = ({ params }: { params: { id: string } }): JSX.Element => {
    return (
        <div>
            <BookTableHistoryDetails id={params.id} />
        </div>
    );
};

export default page;
