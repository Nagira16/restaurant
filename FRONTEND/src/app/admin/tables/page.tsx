"use client";

import { adminDeleteById, getAllTables } from "@/actions";
import AddTableForm from "@/components/AddTableForm";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Endpoint, TableType } from "@/types";
import { useAuth } from "@clerk/nextjs";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AdminTablesDashBoard = () => {
    const [allTables, setAllTables] = useState<TableType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router: AppRouterInstance = useRouter();
    const { getToken } = useAuth();

    const fetchAllTables = async (): Promise<void> => {
        const token: string | null = await getToken();
        if (!token) return;

        const result = await getAllTables<TableType>(Endpoint.tables);
        setAllTables(result);
        setIsLoading(false);
    };

    const handleDelete = async (tableId: string): Promise<void> => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this table?"
        );

        if (!confirmDelete) return alert("Action Canceled");

        try {
            const token: string | null = await getToken();
            if (!token) return;

            const deletedTable = await adminDeleteById<TableType | null>(
                token,
                Endpoint.tables,
                tableId
            );

            if (deletedTable) {
                fetchAllTables();
                Swal.fire({
                    title: "Table Deleted Successfully",
                    icon: "success"
                });
            } else {
                Swal.fire({
                    title: "Failed To Delete Table",
                    icon: "warning"
                });
            }
        } catch (error) {
            Swal.fire({
                title: "An Error Occurred While Deleting The Table",
                icon: "error"
            });
        }
    };

    useEffect(() => {
        fetchAllTables();
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
                            Table Management
                        </h1>
                        <AddTableForm fetchAllTables={fetchAllTables} />
                    </div>
                    <div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Order</TableHead>
                                    <TableHead>Table Number</TableHead>
                                    <TableHead className="lg:table-cell hidden">
                                        Capacity
                                    </TableHead>
                                    <TableHead className="lg:table-cell hidden">
                                        Available
                                    </TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {allTables.map((table, i) => (
                                    <TableRow key={table.id}>
                                        <TableCell>{i + 1}</TableCell>
                                        <TableCell>{table.number}</TableCell>
                                        <TableCell>{table.capacity}</TableCell>
                                        <TableCell className="lg:table-cell hidden">
                                            {table.available
                                                ? "Available"
                                                : "Unavailable"}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outline"
                                                className="mr-2 rounded-xl"
                                                onClick={() =>
                                                    router.push(
                                                        `/admin/tables/edit/${table.id}`
                                                    )
                                                }
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="rounded-xl"
                                                onClick={() =>
                                                    handleDelete(table.id)
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

export default AdminTablesDashBoard;
