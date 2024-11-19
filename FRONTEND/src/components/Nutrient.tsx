import React from "react";
import { CardHeader, CardTitle, CardContent, CardDescription } from "./ui/card";
import { Endpoint, Nutrient } from "@/types";
import { getAllTablesById } from "@/actions";

type NutrientProps = {
    menu_id: string;
};

const MenuNutrient = async ({
    menu_id
}: NutrientProps): Promise<JSX.Element> => {
    const nutrient = await getAllTablesById<Nutrient | null>(
        Endpoint.nutrients,
        menu_id
    );
    console.log(nutrient);

    return (
        <>
            {nutrient && (
                <div className="w-[450px] space-y-5">
                    <CardHeader>
                        <CardTitle className="text-4xl">Nutrients</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription className="space-y-3 text-lg">
                            <h3 className="border-b border-black w-fit">
                                Calories: {nutrient.calories} kcal
                            </h3>
                            <h3 className="border-b border-black w-fit">
                                Total Fat: {nutrient.fats} g
                            </h3>
                            <h3 className="border-b border-black w-fit">
                                Sodium: {nutrient.sodium} g
                            </h3>
                            <h3 className="border-b border-black w-fit">
                                Total Carbohydrate: {nutrient.carbohydrates} g
                            </h3>
                            <h3 className="border-b border-black w-fit">
                                Dietary Fiber: {nutrient.fiber} g
                            </h3>
                            <h3 className="border-b border-black w-fit">
                                Total Sugars: {nutrient.sugar} g
                            </h3>
                            <h3 className="border-b border-black w-fit">
                                Protein: {nutrient.protein} g
                            </h3>
                        </CardDescription>
                    </CardContent>
                </div>
            )}
        </>
    );
};

export default MenuNutrient;
