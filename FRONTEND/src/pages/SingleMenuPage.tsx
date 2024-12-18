import React from "react";
import { Card } from "../components/ui/card";
import SingleMenu from "@/components/SingleMenu";
import MenuNutrient from "@/components/Nutrient";
import Reviews from "@/components/ReviewsCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type SingleMenuPageProps = {
    menu_id: string;
};

const SingleMenuPage = ({ menu_id }: SingleMenuPageProps): JSX.Element => {
    return (
        <div className="min-h-screen bg-background flex justify-center items-center">
            <div className="container px-4 py-6 mx-auto max-w-7xl">
                <div className="flex items-center mb-6">
                    <Link
                        href="/menus"
                        className="inline-flex items-center text-sm font-medium transition-colors hover:text-primary"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Menu
                    </Link>
                </div>
                <div className="grid gap-6 lg:grid-cols-2 grid-cols-1">
                    <SingleMenu menu_id={menu_id} />
                    <div className="space-y-6">
                        <MenuNutrient menu_id={menu_id} />
                        <Reviews menu_id={menu_id} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleMenuPage;
