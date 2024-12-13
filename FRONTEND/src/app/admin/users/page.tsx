"use client";

import { deleteById } from "@/actions";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell
} from "@/components/ui/table";
import { Endpoint, FetchData, User, UserWithRoleName } from "@/types";
import { useAuth } from "@clerk/nextjs";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AdminUserDashBoard = (): JSX.Element => {
    const [allUsers, setAllUsers] = useState<UserWithRoleName[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router: AppRouterInstance = useRouter();
    const { getToken } = useAuth();

    const fetchAllUsers = async (): Promise<void> => {
        const token: string | null = await getToken();
        if (!token) return;

        const res: Response = await fetch("http://localhost:3001/admin/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });

        const data: FetchData = await res.json();

        if (data.success) {
            const result = data.results as UserWithRoleName[];
            setAllUsers(result);
            setIsLoading(false);
        } else {
            router.push("/");
        }
    };

    const handleDelete = async (userId: string): Promise<void> => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) return alert("Action Canceled");

        try {
            const deletedUser = await deleteById<User | null>(
                Endpoint.users,
                userId
            );

            if (deletedUser) {
                fetchAllUsers();
                alert("User deleted successfully!");
            } else {
                alert("Failed to delete user.");
            }
        } catch (error) {
            alert("An error occurred while deleting the user.");
        }
    };

    useEffect(() => {
        fetchAllUsers();
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
                    <h1 className="text-3xl font-bold mb-4">User Management</h1>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead className="lg:table-cell hidden">
                                    Email
                                </TableHead>
                                <TableHead className="lg:table-cell hidden">
                                    Role
                                </TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {allUsers.map((user, i) => (
                                <TableRow key={user.id}>
                                    <TableCell>{i + 1}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell className="lg:table-cell hidden">
                                        {user.email}
                                    </TableCell>
                                    <TableCell className="lg:table-cell hidden">
                                        {user.role.role_name}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outline"
                                            className="mr-2 rounded-xl"
                                            onClick={() =>
                                                router.push(
                                                    `/admin/users/edit/${user.id}`
                                                )
                                            }
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="rounded-xl"
                                            onClick={() =>
                                                handleDelete(user.id)
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </>
            )}
        </div>
    );
};

export default AdminUserDashBoard;
