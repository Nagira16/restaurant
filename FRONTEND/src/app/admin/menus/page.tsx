"use client";

import { deleteById } from "@/actions";
import AddMenuForm from "@/components/AddMenuForm";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Endpoint, FetchData, Menu, MenuWithCategoryName } from "@/types";
import { useAuth } from "@clerk/nextjs";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AdminMenusDashBoard = () => {
    const [allMenus, setAllMenus] = useState<MenuWithCategoryName[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router: AppRouterInstance = useRouter();
    const { getToken } = useAuth();

    const fetchAllMenus = async () => {
        const token: string | null = await getToken();
        if (token) {
            const res: Response = await fetch(
                "http://localhost:3001/admin/menus",
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
                const result = data.results as MenuWithCategoryName[];
                setAllMenus(result);
                setIsLoading(false);
            } else {
                router.push("/");
            }
        }
    };

    const handleDelete = async (userId: string) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this menu?"
        );

        if (!confirmDelete) return alert("Action Canceled");

        try {
            const deletedMenu = await deleteById<Menu | null>(
                Endpoint.users,
                userId
            );

            if (deletedMenu) {
                fetchAllMenus();
                alert("Menu deleted successfully!");
            } else {
                alert("Failed to delete menu.");
            }
        } catch (error) {
            alert("An error occurred while deleting the menu.");
        }
    };

    useEffect(() => {
        fetchAllMenus();
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
                            Menu Management
                        </h1>
                        <AddMenuForm />
                    </div>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Order</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead className="lg:table-cell hidden">
                                        Price
                                    </TableHead>
                                    <TableHead className="lg:table-cell hidden">
                                        Category Name
                                    </TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {allMenus.map((menu, i) => (
                                    <TableRow key={menu.id}>
                                        <TableCell>{i + 1}</TableCell>
                                        <TableCell>{menu.name}</TableCell>
                                        <TableCell className="lg:table-cell hidden">
                                            $
                                            {parseFloat(
                                                menu.price?.toString() || "0"
                                            ).toFixed(2)}
                                        </TableCell>
                                        <TableCell className="lg:table-cell hidden">
                                            {menu.category?.category_name ||
                                                "N/A"}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outline"
                                                className="mr-2 rounded-xl"
                                                onClick={() =>
                                                    router.push(
                                                        `/admin/menus/edit/${menu.id}`
                                                    )
                                                }
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="rounded-xl"
                                                onClick={() =>
                                                    handleDelete(menu.id)
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

export default AdminMenusDashBoard;
