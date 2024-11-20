import React from "react";
import { Card } from "../components/ui/card";
import SingleMenu from "@/components/SingleMenu";
import MenuNutrient from "@/components/Nutrient";
import Reviews from "@/components/ReviewsCard";

type SingleMenuPageProps = {
    menu_id: string;
};

const SingleMenuPage = ({ menu_id }: SingleMenuPageProps): JSX.Element => {
    return (
        <>
            <Card className="flex items-start justify-center flex-wrap lg:flex-nowrap space-x-14  h-full w-[450px] lg:w-[900px] mx-auto">
                <div>
                    <SingleMenu menu_id={menu_id} />
                </div>
                <div>
                    <MenuNutrient menu_id={menu_id} />
                    <Reviews menu_id={menu_id} />
                </div>
            </Card>
        </>
    );
};

export default SingleMenuPage;
