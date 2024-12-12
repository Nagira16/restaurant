import SingleMenuPage from "@/pages/SingleMenuPage";
import React from "react";

const page = ({ params }: { params: { id: string } }): JSX.Element => {
    return (
        <div className="text-left my-4">
            <SingleMenuPage menu_id={params.id} />
        </div>
    );
};

export default page;
