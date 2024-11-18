import SingleMenu from "@/components/SingleMenu";
import React from "react";

const SingleMenuPage = ({
    params
}: {
    params: { id: string };
}): JSX.Element => {
    return (
        <div>
            <h1>SingleMenuPage</h1>
            <SingleMenu id={params.id} />
        </div>
    );
};

export default SingleMenuPage;
