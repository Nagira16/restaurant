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
            <Card className="grid grid-cols-1 lg:grid-cols-2 space-x-0 lg:space-x-14  h-full w-[310px] md:w-[450px] lg:w-[900px] mx-auto">
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
