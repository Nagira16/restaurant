"use client";

import { UserDelete } from "@/actions";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell
} from "@/components/ui/table";
import { FetchData, UserWithRoleName } from "@/types";
import { useAuth } from "@clerk/nextjs";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AdminUserDashBoard = () => {
    const [allUsers, setAllUsers] = useState<UserWithRoleName[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router: AppRouterInstance = useRouter();
    const { getToken } = useAuth();

    const fetchAllUsers = async () => {
        const token: string | null = await getToken();
        if (token) {
            const res: Response = await fetch(
                "http://localhost:3001/admin/users",
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
                const result = data.results as UserWithRoleName[];
                setAllUsers(result);
                setIsLoading(false);
            } else {
                router.push("/");
            }
        }
    };

    const handleDelete = async (userId: string) => {
        try {
            const deletedUser = await UserDelete(userId);

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
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {allUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{allUsers.length}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role.role_name}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outline"
                                            className="mr-2"
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
