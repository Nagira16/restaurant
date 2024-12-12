"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FetchData, UserWithRoleName } from "@/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Swal from "sweetalert2";

const AdminUserEdit = ({ params }: { params: { id: string } }) => {
    const userId: string = params.id;
    const [userData, setUserData] = useState<UserWithRoleName | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const router: AppRouterInstance = useRouter();

    const fetchUserData = async () => {
        const res: Response = await fetch(
            `http://localhost:3001/users/${userId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        const data: FetchData = await res.json();
        if (data.success) {
            setUserData(data.results as UserWithRoleName);
            setIsLoading(false);
        } else {
            router.push("/admin");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (userData) {
            setUserData({
                ...userData,
                [e.target.name]: e.target.value
            });
        }
    };

    const handleSave = async () => {
        if (!userData) return;

        setIsSaving(true);

        const res = await fetch(`http://localhost:3001/users/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                address: userData.address,
                role_name: userData.role.role_name
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
                    router.push("/admin");
                }
            });
        } else {
            Swal.fire({
                title: data.message,
                icon: "error",
                timer: 5000,
                didClose() {
                    router.push("/admin");
                }
            });
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Edit User</h1>
            {userData && (
                <div className="space-y-4">
                    <div>
                        <label className="block">Name</label>
                        <Input
                            type="text"
                            name="name"
                            value={userData.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className="block">Email</label>
                        <Input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className="block">Role</label>
                        <Input
                            type="text"
                            name="role_name"
                            value={userData.role.role_name}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                                setUserData({
                                    ...userData,
                                    role: { role_name: e.target.value }
                                })
                            }
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            onClick={() => router.push("/admin")}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleSave}
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

export default AdminUserEdit;
