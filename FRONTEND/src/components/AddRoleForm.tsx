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
import { addNewRole } from "@/actions";
import { Category, Role } from "@/types";
import Swal from "sweetalert2";

type AddRoleFormProps = {
    fetchAllRoles: () => Promise<void>;
};

const AddRoleForm = ({ fetchAllRoles }: AddRoleFormProps): JSX.Element => {
    const { getToken } = useAuth();
    const [role_name, setRole_name] = useState<string>("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const token: string | null = await getToken();

        if (!token) return;

        const newRole: Role | null = await addNewRole(token, role_name);

        if (!newRole) return;

        fetchAllRoles();
        Swal.fire({
            title: "Role Added Successfully",
            icon: "success"
        });
        setRole_name("");
    };

    return (
        <div className="mb-3">
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        variant="default"
                        className="bg-blue-500 text-white hover:bg-blue-700 rounded-xl"
                    >
                        Add New Role
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Role</DialogTitle>
                        <DialogDescription>
                            Fill in the details below to add a new role.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Role Name
                            </Label>
                            <Input
                                id="role_name"
                                value={role_name}
                                onChange={(e) => setRole_name(e.target.value)}
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

export default AddRoleForm;
