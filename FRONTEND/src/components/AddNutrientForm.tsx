import { addNewNutrient, getAllTables } from "@/actions";
import { Endpoint, Menu, Nutrient, NutrientsWithMenuName } from "@/types";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import {
    Dialog,
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
import Swal from "sweetalert2";

type AddNutrientFormProps = {
    fetchAllNutrients: () => Promise<void>;
};

const AddNutrientForm = ({ fetchAllNutrients }: AddNutrientFormProps) => {
    const [menus, setMenus] = useState<Menu[]>([]);
    const [menu_id, setMenu_id] = useState<string>("");
    const [calories, setCalories] = useState<number>(0);
    const [protein, setProtein] = useState<number>(0);
    const [carbohydrates, setCarbohydrates] = useState<number>(0);
    const [fats, setFats] = useState<number>(0);
    const [fiber, setFiber] = useState<number>(0);
    const [sugar, setSugar] = useState<number>(0);
    const [sodium, setSodium] = useState<number>(0);
    const { getToken } = useAuth();

    const fetchMenus = async (): Promise<void> => {
        const results = await getAllTables<Menu>(Endpoint.menus);
        setMenus(results);
    };

    useEffect(() => {
        fetchMenus();
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const token: string | null = await getToken();

        if (!token) return;

        const newNutrient: Nutrient | null = await addNewNutrient(
            token,
            menu_id,
            calories!,
            protein!,
            carbohydrates!,
            fats!,
            fiber!,
            sugar!,
            sodium!
        );

        if (!newNutrient) return;

        fetchAllNutrients();
        Swal.fire({
            title: "Nutrient Added Successfully",
            icon: "success"
        });
        setMenu_id("");
        setCalories(0);
        setProtein(0);
        setCarbohydrates(0);
        setFats(0);
        setFiber(0);
        setSugar(0);
        setSodium(0);
    };

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        variant="default"
                        className="bg-blue-500 text-white hover:bg-blue-700 rounded-xl"
                    >
                        Add New Nutrient
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Nutrient</DialogTitle>
                        <DialogDescription>
                            Fill in the details below to add a new nutrient.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="menu_id" className="text-right">
                                Category
                            </Label>
                            <select
                                id="menu_id"
                                value={menu_id}
                                onChange={(e) => setMenu_id(e.target.value)}
                                required
                            >
                                <option value="">Select a Menu</option>
                                {menus.map((menu, i) => (
                                    <option value={menu.id} key={i}>
                                        {menu.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="calories" className="text-right">
                                Calories
                            </Label>
                            <Input
                                type="number"
                                id="calories"
                                value={calories}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    setCalories(isNaN(value) ? 0 : value);
                                }}
                                className="col-span-3"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="protein" className="text-right">
                                Protein
                            </Label>
                            <Input
                                type="number"
                                id="protein"
                                value={protein}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    setProtein(isNaN(value) ? 0 : value);
                                }}
                                className="col-span-3"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                                htmlFor="carbohydrates"
                                className="text-right"
                            >
                                Carbohydrates
                            </Label>
                            <Input
                                type="number"
                                id="carbohydrates"
                                value={carbohydrates}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    setCarbohydrates(isNaN(value) ? 0 : value);
                                }}
                                className="col-span-3"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="fats" className="text-right">
                                Fats
                            </Label>
                            <Input
                                type="number"
                                id="fats"
                                value={fats}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    setFats(isNaN(value) ? 0 : value);
                                }}
                                className="col-span-3"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="fiber" className="text-right">
                                Fiber
                            </Label>
                            <Input
                                id="fiber"
                                value={fiber}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    setFiber(isNaN(value) ? 0 : value);
                                }}
                                className="col-span-3"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="sugar" className="text-right">
                                Sugar
                            </Label>
                            <Input
                                id="sugar"
                                value={sugar}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    setSugar(isNaN(value) ? 0 : value);
                                }}
                                className="col-span-3"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="sodium" className="text-right">
                                Sodium
                            </Label>
                            <Input
                                id="sodium"
                                value={sodium}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    setSodium(isNaN(value) ? 0 : value);
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

export default AddNutrientForm;
