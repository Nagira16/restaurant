"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Category, Endpoint, FetchData, Role } from "@/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Swal from "sweetalert2";
import { useAuth } from "@clerk/nextjs";
import { Label } from "@/components/ui/label";
import { getAllTablesById } from "@/actions";

const AdminRoleEdit = ({ params }: { params: { id: string } }): JSX.Element => {
    const roleId: string = params.id;
    const [roleData, setRoleData] = useState<Role | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const router: AppRouterInstance = useRouter();
    const { getToken } = useAuth();

    const fetchRoleData = async (): Promise<void> => {
        const result = await getAllTablesById<Role>(Endpoint.roles, roleId);

        setRoleData(result);
        setIsLoading(false);
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        if (roleData) {
            setRoleData({
                ...roleData,
                [e.target.name]: e.target.value
            });
        }
    };

    const handleSave = async (): Promise<void> => {
        const token: string | null = await getToken();

        if (!token || !roleData) return;

        setIsSaving(true);

        const res = await fetch(`http://localhost:3001/admin/roles/${roleId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                role_name: roleData.role_name
            })
        });

        const data: FetchData = await res.json();
        setIsSaving(false);

        if (data.success) {
            Swal.fire({
                title: data.message,
                icon: "success",
                timer: 5000,
                didClose() {
                    router.push("/admin/roles");
                }
            });
        } else {
            Swal.fire({
                title: data.message,
                icon: "error",
                timer: 5000,
                didClose() {
                    router.push("/admin/roles");
                }
            });
        }
    };

    useEffect(() => {
        fetchRoleData();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen grid place-content-center animate-pulse">
                Loading...
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Edit Role</h1>
            {roleData && (
                <div className="space-y-4">
                    <div>
                        <Label className="block">Name</Label>
                        <Input
                            type="text"
                            name="role_name"
                            value={roleData.role_name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            className="rounded-xl"
                            onClick={() => router.back()}
                        >
                            Back
                        </Button>
                        <Button
                            variant="outline"
                            onClick={handleSave}
                            className="rounded-xl"
                            disabled={isSaving}
                        >
                            {isSaving ? "Saving..." : "Save"}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminRoleEdit;
