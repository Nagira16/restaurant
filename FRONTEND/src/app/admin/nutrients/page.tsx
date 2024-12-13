"use client";

import { adminDeleteById } from "@/actions";
import AddNutrientForm from "@/components/AddNutrientForm";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {
    Endpoint,
    FetchData,
    Menu,
    Nutrient,
    NutrientsWithMenuName
} from "@/types";
import { useAuth } from "@clerk/nextjs";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AdminNutrientsDashBoard = (): JSX.Element => {
    const [allNutrients, setAllNutrients] = useState<NutrientsWithMenuName[]>(
        []
    );
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router: AppRouterInstance = useRouter();
    const { getToken } = useAuth();

    const fetchAllNutrients = async (): Promise<void> => {
        const token: string | null = await getToken();
        if (!token) return;

        const res: Response = await fetch(
            "http://localhost:3001/admin/nutrients",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data: FetchData = await res.json();

        if (data.success) {
            const result = data.results as NutrientsWithMenuName[];
            setAllNutrients(result);
            setIsLoading(false);
        } else {
            router.push("/");
        }
    };

    const handleDelete = async (nutrientId: string) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this nutrient?"
        );

        if (!confirmDelete) return alert("Action Canceled");

        try {
            const token: string | null = await getToken();
            if (!token) return;

            const deletedNutrient = await adminDeleteById<Nutrient | null>(
                token,
                Endpoint.nutrients,
                nutrientId
            );

            if (deletedNutrient) {
                fetchAllNutrients();
                alert("nutrient deleted successfully!");
            } else {
                alert("Failed to delete nutrient.");
            }
        } catch (error) {
            alert("An error occurred while deleting the nutrient.");
        }
    };

    useEffect(() => {
        fetchAllNutrients();
    }, []);

    return (
        <div>
            {isLoading ? (
                <>
                    <div className="min-h-screen grid place-content-center animate-pulse">
                        Loading...
                    </div>
                </>
            ) : (
                <>
                    <div className="flex items-center sm:justify-between flex-wrap">
                        <h1 className="text-3xl font-bold mb-4">
                            Nutrient Management
                        </h1>
                        <AddNutrientForm
                            fetchAllNutrients={fetchAllNutrients}
                        />
                    </div>
                    <div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Order</TableHead>
                                    <TableHead>Menu Name</TableHead>
                                    <TableHead>Calories</TableHead>
                                    <TableHead className="lg:table-cell hidden">
                                        Carbohydrates
                                    </TableHead>
                                    <TableHead className="lg:table-cell hidden">
                                        Fats
                                    </TableHead>
                                    <TableHead className="lg:table-cell hidden">
                                        Fiber
                                    </TableHead>
                                    <TableHead className="lg:table-cell hidden">
                                        Protein
                                    </TableHead>
                                    <TableHead className="lg:table-cell hidden">
                                        Sodium
                                    </TableHead>
                                    <TableHead className="lg:table-cell hidden">
                                        Sugar
                                    </TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {allNutrients.map((nutrient, i) => (
                                    <TableRow key={nutrient.id}>
                                        <TableCell>{i + 1}</TableCell>
                                        <TableCell>
                                            {nutrient.menu.name}
                                        </TableCell>
                                        <TableCell>
                                            {nutrient.calories} kcal
                                        </TableCell>
                                        <TableCell className="lg:table-cell hidden">
                                            {nutrient.carbohydrates} g
                                        </TableCell>
                                        <TableCell className="lg:table-cell hidden">
                                            {nutrient.fats} g
                                        </TableCell>
                                        <TableCell className="lg:table-cell hidden">
                                            {nutrient.fiber} g
                                        </TableCell>
                                        <TableCell className="lg:table-cell hidden">
                                            {nutrient.protein} g
                                        </TableCell>
                                        <TableCell className="lg:table-cell hidden">
                                            {nutrient.sodium} g
                                        </TableCell>
                                        <TableCell className="lg:table-cell hidden">
                                            {nutrient.sugar} g
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outline"
                                                className="mr-2 rounded-xl"
                                                onClick={() =>
                                                    router.push(
                                                        `/admin/nutrients/edit/${nutrient.id}`
                                                    )
                                                }
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="rounded-xl"
                                                onClick={() =>
                                                    handleDelete(nutrient.id)
                                                }
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminNutrientsDashBoard;
