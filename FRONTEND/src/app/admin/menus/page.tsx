"use client";

import { adminDeleteById, deleteById } from "@/actions";
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
import Swal from "sweetalert2";

const AdminMenusDashBoard = (): JSX.Element => {
    const [allMenus, setAllMenus] = useState<MenuWithCategoryName[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router: AppRouterInstance = useRouter();
    const { getToken } = useAuth();

    const fetchAllMenus = async (): Promise<void> => {
        const token: string | null = await getToken();
        if (!token) return;

        const res: Response = await fetch("http://localhost:3001/admin/menus", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });

        const data: FetchData = await res.json();

        if (data.success) {
            const result = data.results as MenuWithCategoryName[];
            setAllMenus(result);
            setIsLoading(false);
        } else {
            Swal.fire({
                title: data.message,
                icon: "error"
            });
        }
    };

    const handleDelete = async (menuId: string): Promise<void> => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this menu?"
        );

        if (!confirmDelete) return alert("Action Canceled");

        try {
            const token: string | null = await getToken();
            if (!token) return;

            const deletedMenu = await adminDeleteById<Menu | null>(
                token,
                Endpoint.menus,
                menuId
            );

            if (deletedMenu) {
                fetchAllMenus();
                Swal.fire({
                    title: "Menu Deleted Successfully",
                    icon: "success"
                });
            } else {
                Swal.fire({
                    title: "Failed To Delete Menu",
                    icon: "warning"
                });
            }
        } catch (error) {
            Swal.fire({
                title: "An Error Occurred While Deleting The Menu",
                icon: "error"
            });
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
                    <div className="flex items-center sm:justify-between flex-wrap">
                        <h1 className="text-3xl font-bold mb-4">
                            Menu Management
                        </h1>
                        <AddMenuForm fetchAllMenus={fetchAllMenus} />
                    </div>
                    <div>
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
