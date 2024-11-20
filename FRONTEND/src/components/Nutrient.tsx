"use client";

import React, { useEffect, useState } from "react";
import { CardHeader, CardTitle, CardContent, CardDescription } from "./ui/card";
import { Endpoint, Nutrient } from "@/types";
import { getAllTablesById } from "@/actions";
import { Skeleton } from "./ui/skeleton";

type NutrientProps = {
    menu_id: string;
};

const MenuNutrient = ({ menu_id }: NutrientProps): JSX.Element => {
    const [nutrient, setNutrient] = useState<Nutrient | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchNutrient = async () => {
            const nutrientData = await getAllTablesById<
                Nutrient | Nutrient[] | null
            >(Endpoint.nutrients, menu_id);

            if (Array.isArray(nutrientData)) {
                setNutrient(nutrientData.length > 0 ? nutrientData[0] : null);
                setLoading(false);
            } else {
                setNutrient(nutrientData);
                setLoading(false);
            }
        };

        fetchNutrient();
    }, [menu_id]);

    return (
        <>
            {loading ? (
                <div className="w-[450px] space-y-5">
                    <CardHeader>
                        <CardTitle className="text-4xl">Nutrients</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription className="space-y-3 text-lg">
                            <h3 className="border-b border-black w-fit flex items-center">
                                Calories:
                                <Skeleton className="h-[20px] w-[40px] mx-1" />
                                kcal
                            </h3>
                            <h3 className="border-b border-black w-fit flex items-center">
                                Total Fat:
                                <Skeleton className="h-[20px] w-[25px] mx-1" />g
                            </h3>
                            <h3 className="border-b border-black w-fit flex items-center">
                                Sodium:
                                <Skeleton className="h-[20px] w-[25px] mx-1" />g
                            </h3>
                            <h3 className="border-b border-black w-fit flex items-center">
                                Total Carbohydrate:
                                <Skeleton className="h-[20px] w-[25px] mx-1" />g
                            </h3>
                            <h3 className="border-b border-black w-fit flex items-center">
                                Dietary Fiber:
                                <Skeleton className="h-[20px] w-[25px] mx-1" />g
                            </h3>
                            <h3 className="border-b border-black w-fit flex items-center">
                                Total Sugars:
                                <Skeleton className="h-[20px] w-[25px] mx-1" />g
                            </h3>
                            <h3 className="border-b border-black w-fit flex items-center">
                                Protein:
                                <Skeleton className="h-[20px] w-[25px] mx-1" />g
                            </h3>
                        </CardDescription>
                    </CardContent>
                </div>
            ) : (
                nutrient && (
                    <div className="w-[450px] space-y-5">
                        <CardHeader>
                            <CardTitle className="text-4xl">
                                Nutrients
                            </CardTitle>
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
                                    Total Carbohydrate: {nutrient.carbohydrates}{" "}
                                    g
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
                )
            )}
        </>
    );
};

export default MenuNutrient;
