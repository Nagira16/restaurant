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
import { addNewCategory } from "@/actions";
import { Category } from "@/types";
import Swal from "sweetalert2";

type AddCategoryFormProps = {
    fetchAllCategories: () => Promise<void>;
};

const AddCategoryForm = ({
    fetchAllCategories
}: AddCategoryFormProps): JSX.Element => {
    const { getToken } = useAuth();
    const [category_name, setCategory_name] = useState<string>("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const token: string | null = await getToken();

        if (!token) return;

        const newCategory: Category | null = await addNewCategory(
            token,
            category_name
        );

        if (!newCategory) return;

        fetchAllCategories();
        Swal.fire({
            title: "Category Added Successfully",
            icon: "success"
        });
        setCategory_name("");
    };

    return (
        <div className="mb-3">
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        variant="default"
                        className="bg-blue-500 text-white hover:bg-blue-700 rounded-xl"
                    >
                        Add New Category
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Category</DialogTitle>
                        <DialogDescription>
                            Fill in the details below to add a new category.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Category Name
                            </Label>
                            <Input
                                id="name"
                                value={category_name}
                                onChange={(e) =>
                                    setCategory_name(e.target.value)
                                }
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
        </div>
    );
};

export default AddCategoryForm;
