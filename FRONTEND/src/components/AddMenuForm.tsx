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

const AddMenuForm = () => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [categoryName, setCategoryName] = useState<string>("");
    const [image, setImage] = useState<string>("");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        console.log("Menu Added:", {
            name,
            description,
            price,
            categoryName,
            image
        });

        setName("");
        setDescription("");
        setPrice(0);
        setCategoryName("");
        setImage("");
    };

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        variant="default"
                        className="bg-blue-500 text-white hover:bg-blue-700 rounded-xl"
                    >
                        Add New Menu
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Menu</DialogTitle>
                        <DialogDescription>
                            Fill in the details below to add a new menu.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="col-span-3"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Input
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="col-span-3"
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right">
                                Price
                            </Label>
                            <Input
                                id="price"
                                type="number"
                                value={price}
                                onChange={(e) =>
                                    setPrice(parseFloat(e.target.value))
                                }
                                className="col-span-3"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                                htmlFor="categoryName"
                                className="text-right"
                            >
                                Category
                            </Label>
                            <select
                                id="categoryName"
                                value={categoryName}
                                onChange={(e) =>
                                    setCategoryName(e.target.value)
                                }
                                className="col-span-3 p-2 border rounded-md"
                                required
                            >
                                <option value="">Select a Category</option>
                                <option value="Appetizers">Appetizers</option>
                                <option value="Main Course">Main Course</option>
                                <option value="Desserts">Desserts</option>
                                <option value="Beverages">Beverages</option>
                                <option value="Extra">Extra</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="image" className="text-right">
                                Image URL
                            </Label>
                            <Input
                                id="image"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
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

export default AddMenuForm;
