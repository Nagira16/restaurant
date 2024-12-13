"use client";

import { adminDeleteById, getAllTables } from "@/actions";
import AddRoleForm from "@/components/AddRoleForm";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Endpoint, Role } from "@/types";
import { useAuth } from "@clerk/nextjs";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AdminRoleDashBoard = () => {
    const [allRoles, setAllRoles] = useState<Role[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router: AppRouterInstance = useRouter();
    const { getToken } = useAuth();

    const fetchAllRoles = async (): Promise<void> => {
        const result = await getAllTables<Role>(Endpoint.roles);

        setAllRoles(result);
        setIsLoading(false);
    };

    const handleDelete = async (roleId: string): Promise<void> => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this role?"
        );

        if (!confirmDelete) return alert("Action Canceled");

        try {
            const token: string | null = await getToken();
            if (!token) return;

            const deletedRole = await adminDeleteById<Role | null>(
                token,
                Endpoint.roles,
                roleId
            );

            if (deletedRole) {
                fetchAllRoles();
                Swal.fire({
                    title: "Role Deleted Successfully",
                    icon: "success"
                });
            } else {
                Swal.fire({
                    title: "Failed To Delete Role",
                    icon: "warning"
                });
            }
        } catch (error) {
            Swal.fire({
                title: "An Error Occurred While Deleting The Role",
                icon: "error"
            });
        }
    };

    useEffect(() => {
        fetchAllRoles();
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
                            Role Management
                        </h1>
                        <AddRoleForm fetchAllRoles={fetchAllRoles} />
                    </div>
                    <div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Order</TableHead>
                                    <TableHead>Role Name</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {allRoles.map((role, i) => (
                                    <TableRow key={role.id}>
                                        <TableCell>{i + 1}</TableCell>
                                        <TableCell>{role.role_name}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outline"
                                                className="mr-2 rounded-xl"
                                                onClick={() =>
                                                    router.push(
                                                        `/admin/roles/edit/${role.id}`
                                                    )
                                                }
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="rounded-xl"
                                                onClick={() =>
                                                    handleDelete(role.id)
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

export default AdminRoleDashBoard;
