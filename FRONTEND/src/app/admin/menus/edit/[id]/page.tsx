"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { FetchData, MenuWithCategoryName } from "@/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Swal from "sweetalert2";
import { useAuth } from "@clerk/nextjs";
import { Label } from "@/components/ui/label";

const AdminMenuEdit = ({ params }: { params: { id: string } }): JSX.Element => {
    const menuId: string = params.id;
    const [menuData, setMenuData] = useState<MenuWithCategoryName | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const router: AppRouterInstance = useRouter();
    const { getToken } = useAuth();

    const fetchMenuData = async (): Promise<void> => {
        const token: string | null = await getToken();

        if (!token) return;

        const res: Response = await fetch(
            `http://localhost:3001/admin/menus/${menuId}`,
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
            setMenuData(data.results as MenuWithCategoryName);
            setIsLoading(false);
        } else {
            router.push("/admin");
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        if (menuData) {
            setMenuData({
                ...menuData,
                [e.target.name]: e.target.value
            });
        }
    };

    const handleSave = async (): Promise<void> => {
        const token: string | null = await getToken();

        if (!token || !menuData) return;

        setIsSaving(true);

        const res = await fetch(`http://localhost:3001/admin/menus/${menuId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                name: menuData.name,
                description: menuData.description,
                price: menuData.price,
                category_name: menuData.category?.category_name,
                image: menuData.image
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
                    router.push("/admin/menus");
                }
            });
        } else {
            Swal.fire({
                title: data.message,
                icon: "error",
                timer: 5000,
                didClose() {
                    router.push("/admin/menus");
                }
            });
        }
    };

    useEffect(() => {
        fetchMenuData();
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
            <h1 className="text-3xl font-bold mb-4">Edit Menu</h1>
            {menuData && (
                <div className="space-y-4">
                    <div>
                        <Label className="block">Name</Label>
                        <Input
                            type="text"
                            name="name"
                            value={menuData.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <Label className="block">Image</Label>
                        <Input
                            type="text"
                            name="image"
                            value={
                                menuData.image ||
                                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR15hCF5P6XrxJBMjZIlDjkSSxWwjOaNSlHJw&s"
                            }
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <Label className="block">Price</Label>
                        <Input
                            type="number"
                            name="price"
                            value={menuData.price}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <Label className="block">Description</Label>
                        <Input
                            type="text"
                            name="description"
                            value={menuData.description || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <Label className="block">Category Name</Label>
                        <Input
                            type="text"
                            name="category"
                            value={menuData.category?.category_name || ""}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setMenuData({
                                    ...menuData,
                                    category: { category_name: e.target.value }
                                })
                            }
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

export default AdminMenuEdit;
