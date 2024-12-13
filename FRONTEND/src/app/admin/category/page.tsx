"use client";

import { adminDeleteById } from "@/actions";
import AddCategoryForm from "@/components/AddCategoryForm";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Category, Endpoint, FetchData, Menu } from "@/types";
import { useAuth } from "@clerk/nextjs";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AdminCategoryDashBoard = (): JSX.Element => {
    const [allCategories, setAllCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router: AppRouterInstance = useRouter();
    const { getToken } = useAuth();

    const fetchAllCategories = async () => {
        const token: string | null = await getToken();
        if (!token) return;

        const res: Response = await fetch(
            "http://localhost:3001/admin/categories",
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
            const result = data.results as Category[];
            setAllCategories(result);
            setIsLoading(false);
        } else {
            router.push("/");
        }
    };

    const handleDelete = async (categoryId: string) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this category?"
        );

        if (!confirmDelete) return alert("Action Canceled");

        try {
            const token: string | null = await getToken();
            if (!token) return;

            const deletedCategory = await adminDeleteById<Category | null>(
                token,
                Endpoint.category,
                categoryId
            );

            if (deletedCategory) {
                fetchAllCategories();
                alert("category deleted successfully!");
            } else {
                alert("Failed to delete category.");
            }
        } catch (error) {
            alert("An error occurred while deleting the category.");
        }
    };

    useEffect(() => {
        fetchAllCategories();
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
                    <div className="flex justify-between">
                        <h1 className="text-3xl font-bold mb-4">
                            Category Management
                        </h1>
                        <AddCategoryForm
                            fetchAllCategories={fetchAllCategories}
                        />
                    </div>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Order</TableHead>
                                    <TableHead className="lg:table-cell hidden">
                                        Category Name
                                    </TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {allCategories.map((category, i) => (
                                    <TableRow key={category.id}>
                                        <TableCell>{i + 1}</TableCell>
                                        <TableCell>
                                            {category.category_name}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outline"
                                                className="mr-2 rounded-xl"
                                                onClick={() =>
                                                    router.push(
                                                        `/admin/category/edit/${category.id}`
                                                    )
                                                }
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="rounded-xl"
                                                onClick={() =>
                                                    handleDelete(category.id)
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

export default AdminCategoryDashBoard;
