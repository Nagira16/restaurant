import { useState } from "react";
import { Dialog } from "@radix-ui/react-dialog";
import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useAuth } from "@clerk/nextjs";
import Swal from "sweetalert2";
import { TableType } from "@/types";
import { addNewTable } from "@/actions";

type AddTableFormProps = {
    fetchAllTables: () => Promise<void>;
};

const AddTableForm = ({ fetchAllTables }: AddTableFormProps): JSX.Element => {
    const [number, setNumber] = useState<number>(0);
    const [capacity, setCapacity] = useState<number>(0);
    const [available, setAvailable] = useState<boolean>(true);
    const { getToken } = useAuth();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const token: string | null = await getToken();

        if (!token) return;

        const newTable: TableType | null = await addNewTable(
            token,
            number,
            capacity,
            available
        );

        if (!newTable) return;

        fetchAllTables();
        Swal.fire({
            title: "Table Added Successfully",
            icon: "success"
        });
        setNumber(0);
        setCapacity(0);
        setAvailable(true);
    };

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        variant="default"
                        className="bg-blue-500 text-white hover:bg-blue-700 rounded-xl"
                    >
                        Add New Table
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Table</DialogTitle>
                        <DialogDescription>
                            Fill in the details below to add a new table.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Table Number
                            </Label>
                            <Input
                                id="number"
                                type="number"
                                value={number}
                                onChange={(e) =>
                                    setNumber(parseFloat(e.target.value))
                                }
                                className="col-span-3"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Table Capacity
                            </Label>
                            <Input
                                id="capacity"
                                type="number"
                                min="0"
                                value={capacity}
                                onChange={(e) =>
                                    setCapacity(parseFloat(e.target.value))
                                }
                                className="col-span-3"
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right">
                                Available
                            </Label>
                            <Input
                                id="available"
                                type="checkbox"
                                checked={available}
                                onChange={(e) => {
                                    setAvailable(e.target.checked);
                                }}
                                className="col-span-3"
                                required
                            />
                        </div>

                        <DialogFooter>
                            <Button
                                type="submit"
                                className="bg-blue-500 text-white hover:bg-blue-700 rounded-xl"
                            >
                                Save changes
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AddTableForm;
