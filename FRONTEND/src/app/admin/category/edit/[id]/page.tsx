"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Category, FetchData } from "@/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Swal from "sweetalert2";
import { useAuth } from "@clerk/nextjs";
import { Label } from "@/components/ui/label";

const AdminCategoryEdit = ({
    params
}: {
    params: { id: string };
}): JSX.Element => {
    const categoryId: string = params.id;
    const [categoryData, setCategoryData] = useState<Category | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const router: AppRouterInstance = useRouter();
    const { getToken } = useAuth();

    const fetchCategoryData = async (): Promise<void> => {
        const token: string | null = await getToken();

        if (!token) return;

        const res: Response = await fetch(
            `http://localhost:3001/admin/category/${categoryId}`,
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
            setCategoryData(data.results as Category);
            setIsLoading(false);
        } else {
            router.push("/admin");
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        if (categoryData) {
            setCategoryData({
                ...categoryData,
                [e.target.name]: e.target.value
            });
        }
    };

    const handleSave = async (): Promise<void> => {
        const token: string | null = await getToken();

        if (!token || !categoryData) return;

        setIsSaving(true);

        const res = await fetch(
            `http://localhost:3001/admin/category/${categoryId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    category_name: categoryData.category_name
                })
            }
        );

        const data: FetchData = await res.json();
        setIsSaving(false);

        if (data.success) {
            Swal.fire({
                title: data.message,
                icon: "success",
                timer: 5000,
                didClose() {
                    router.push("/admin/category");
                }
            });
        } else {
            Swal.fire({
                title: data.message,
                icon: "error",
                timer: 5000,
                didClose() {
                    router.push("/admin/category");
                }
            });
        }
    };

    useEffect(() => {
        fetchCategoryData();
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
            <h1 className="text-3xl font-bold mb-4">Edit Category</h1>
            {categoryData && (
                <div className="space-y-4">
                    <div>
                        <Label className="block">Name</Label>
                        <Input
                            type="text"
                            name="category_name"
                            value={categoryData.category_name}
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

export default AdminCategoryEdit;
