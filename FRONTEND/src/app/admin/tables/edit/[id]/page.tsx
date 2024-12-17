"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Endpoint, FetchData, TableType } from "@/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Swal from "sweetalert2";
import { useAuth } from "@clerk/nextjs";
import { Label } from "@/components/ui/label";
import { getAllTablesById } from "@/actions";

const AdminTableEdit = ({
    params
}: {
    params: { id: string };
}): JSX.Element => {
    const tableId: string = params.id;
    const [tableData, setTableData] = useState<TableType | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const router: AppRouterInstance = useRouter();
    const { getToken } = useAuth();

    const fetchRoleData = async (): Promise<void> => {
        const result = await getAllTablesById<TableType>(
            Endpoint.tables,
            tableId
        );

        setTableData(result);
        setIsLoading(false);
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        if (tableData) {
            const { name, value, type, checked } = e.target;

            if (name === "number" || name === "capacity") {
                setTableData({
                    ...tableData,
                    [name]: value ? parseInt(value, 10) : 0
                });
            }

            if (type === "checkbox") {
                setTableData({
                    ...tableData,
                    [name]: checked
                });
            }
        }
    };

    const handleSave = async (): Promise<void> => {
        const token: string | null = await getToken();

        if (!token || !tableData) return;

        setIsSaving(true);

        const res = await fetch(
            `http://localhost:3001/admin/tables/${tableId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    number: tableData.number,
                    capacity: tableData.capacity,
                    available: tableData.available
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
                    router.push("/admin/tables");
                }
            });
        } else {
            Swal.fire({
                title: data.message,
                icon: "error",
                timer: 5000,
                didClose() {
                    router.push("/admin/tables");
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
            <h1 className="text-3xl font-bold mb-4">Edit Table</h1>
            {tableData && (
                <div className="space-y-4">
                    <div>
                        <Label className="block">Table Number</Label>
                        <Input
                            type="number"
                            name="number"
                            value={tableData.number}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <Label className="block">Table Capacity</Label>
                        <Input
                            type="number"
                            name="capacity"
                            value={tableData.capacity}
                            onChange={handleInputChange}
                            min="1"
                        />
                    </div>
                    <div>
                        <Label className="block">Table available</Label>
                        <Input
                            type="checkbox"
                            name="available"
                            checked={tableData.available}
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

export default AdminTableEdit;
