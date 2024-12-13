"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FetchData, Nutrient } from "@/types";
import { useAuth } from "@clerk/nextjs";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AdminNutrientEdit = ({
    params
}: {
    params: { id: string };
}): JSX.Element => {
    const nutrientId: string = params.id;
    const [nutrientData, setNutrientData] = useState<Nutrient | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const router: AppRouterInstance = useRouter();
    const { getToken } = useAuth();

    const fetchNutrientData = async (): Promise<void> => {
        const token: string | null = await getToken();

        if (!token) return;

        const res: Response = await fetch(
            `http://localhost:3001/admin/nutrients/${nutrientId}`,
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
            setNutrientData(data.results as Nutrient);
            setIsLoading(false);
        } else {
            router.push("/admin");
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        if (nutrientData) {
            setNutrientData({
                ...nutrientData,
                [e.target.name]: e.target.value
            });
        }
    };

    const handleSave = async (): Promise<void> => {
        const token: string | null = await getToken();

        if (!token || !nutrientData) return;

        setIsSaving(true);

        const res = await fetch(
            `http://localhost:3001/admin/nutrients/${nutrientId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    calories: nutrientData.calories,
                    protein: nutrientData.protein,
                    carbohydrates: nutrientData.carbohydrates,
                    fats: nutrientData.fats,
                    fiber: nutrientData.fiber,
                    sugar: nutrientData.sugar,
                    sodium: nutrientData.sodium
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
                    router.push("/admin/nutrients");
                }
            });
        } else {
            Swal.fire({
                title: data.message,
                icon: "error",
                timer: 5000,
                didClose() {
                    router.push("/admin/nutrients");
                }
            });
        }
    };

    useEffect(() => {
        fetchNutrientData();
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
            <h1 className="text-3xl font-bold mb-4">Edit Nutrient</h1>
            {nutrientData && (
                <div className="space-y-4">
                    <div>
                        <Label className="block">Calories</Label>
                        <Input
                            type="number"
                            name="calories"
                            value={nutrientData.calories}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <Label className="block">Protein</Label>
                        <Input
                            type="number"
                            name="protein"
                            value={nutrientData.protein}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <Label className="block">Carbohydrates</Label>
                        <Input
                            type="number"
                            name="carbohydrates"
                            value={nutrientData.carbohydrates}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <Label className="block">Fats</Label>
                        <Input
                            type="number"
                            name="fats"
                            value={nutrientData.fats}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <Label className="block">Fiber</Label>
                        <Input
                            type="number"
                            name="fiber"
                            value={nutrientData.fiber}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <Label className="block">Sodium</Label>
                        <Input
                            type="number"
                            name="sodium"
                            value={nutrientData.sodium}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <Label className="block">Sugar</Label>
                        <Input
                            type="number"
                            name="sugar"
                            value={nutrientData.sugar}
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

export default AdminNutrientEdit;
