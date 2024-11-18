import { getAllTablesById } from "@/actions";
import { Endpoint, Menu, Nutrients } from "@/types";
import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "./ui/card";
import Image from "next/image";

type SingleMenuProps = {
    id: string;
};

const SingleMenu = async ({ id }: SingleMenuProps) => {
    console.log(id);

    const menu = await getAllTablesById<Menu | null>(Endpoint.menus, id);
    const nutrient = await getAllTablesById<Nutrients | null>(
        Endpoint.nutrients,
        id
    );
    console.log(menu?.name, nutrient);

    return (
        <>
            <Card className="flex justify-center space-x-10 h-full w-[900px] mx-auto">
                {menu && (
                    <div className="w-[450px] space-y-5">
                        <CardHeader>
                            <CardTitle className="text-4xl">
                                {menu.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Image
                                src={menu.image}
                                alt={menu.name}
                                width={450}
                                height={300}
                            />
                        </CardContent>
                        <CardFooter>
                            <CardDescription className="">
                                {menu.description}
                            </CardDescription>
                        </CardFooter>
                    </div>
                )}
                {nutrient && (
                    <div className="w-[450px] space-y-5">
                        <CardHeader>
                            <CardTitle className="text-4xl">
                                Nutrients
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="space-y-3 text-lg">
                                <h3>Calories: {nutrient.calories} kcal</h3>
                                <h3>Total Fat: {nutrient.fats} g</h3>
                                <h3>Sodium: {nutrient.sodium} g</h3>
                                <h3>
                                    Total Carbohydrate: {nutrient.carbohydrates}{" "}
                                    g
                                </h3>
                                <h3>Dietary Fiber: {nutrient.fiber} g</h3>
                                <h3>Total Sugars: {nutrient.sugar} g</h3>
                                <h3>Protein: {nutrient.protein} g</h3>
                            </CardDescription>
                        </CardContent>
                    </div>
                )}
            </Card>
        </>
    );
};

export default SingleMenu;
