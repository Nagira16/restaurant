"use client";

import React, { useEffect, useState } from "react";
import {
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
    Card
} from "./ui/card";
import { Endpoint, Nutrient } from "@/types";
import { getAllTablesById } from "@/actions";
import { Skeleton } from "./ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";

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
            } else {
                setNutrient(nutrientData);
            }
            setLoading(false);
        };

        fetchNutrient();
    }, [menu_id]);

    if (loading) {
        return (
            <Card>
                <Skeleton className="h-[350px] w-full" />
            </Card>
        );
    }

    return (
        <Card>
            {nutrient ? (
                <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Nutrients</h2>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">
                                    Calories
                                </TableCell>
                                <TableCell className="text-right">
                                    {nutrient.calories} kcal
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">
                                    Total Fat
                                </TableCell>
                                <TableCell className="text-right">
                                    {nutrient.fats} g
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">
                                    Sodium
                                </TableCell>
                                <TableCell className="text-right">
                                    {nutrient.sodium} g
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">
                                    Total Carbohydrate
                                </TableCell>
                                <TableCell className="text-right">
                                    {nutrient.carbohydrates} g
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">
                                    Dietary Fiber
                                </TableCell>
                                <TableCell className="text-right">
                                    {nutrient.fiber} g
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">
                                    Total Sugars
                                </TableCell>
                                <TableCell className="text-right">
                                    {nutrient.sugar} g
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">
                                    Protein
                                </TableCell>
                                <TableCell className="text-right">
                                    {nutrient.protein} g
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            ) : (
                <CardContent className="h-full min-h-[150px] flex justify-center items-center">
                    <p className="text-gray-500">No nutrient data available.</p>
                </CardContent>
            )}
        </Card>
    );
};

export default MenuNutrient;
