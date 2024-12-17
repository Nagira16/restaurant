import { Order_Details, OrderDetailsStatus } from "@/types";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTrigger
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Dispatch, SetStateAction } from "react";
import { updateOrderDetails } from "@/actions";
import Swal from "sweetalert2";

type EditOrderDetailStatusProps = {
    orderDetailId: string;
    status: OrderDetailsStatus | null;
    setStatus: Dispatch<SetStateAction<OrderDetailsStatus | null>>;
    fetchAllOrderDetails: () => Promise<void>;
};

const EditOrderDetailStatus = ({
    orderDetailId,
    status,
    setStatus,
    fetchAllOrderDetails
}: EditOrderDetailStatusProps): JSX.Element => {
    const handleEditStatus = async () => {
        if (!status) return;

        const result: Order_Details | string = await updateOrderDetails(
            orderDetailId,
            status
        );

        if (typeof result === "string") {
            Swal.fire({
                title: result,
                icon: "error"
            });
        } else {
            fetchAllOrderDetails();
        }
    };

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        variant="default"
                        className="bg-blue-500 text-white hover:bg-blue-700 rounded-xl"
                    >
                        Edit Status
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <form action={handleEditStatus} className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">
                                Status
                            </Label>
                            <select
                                id="status"
                                value={status!}
                                onChange={(e) =>
                                    setStatus(
                                        e.target.value as OrderDetailsStatus
                                    )
                                }
                                className="col-span-3 p-2 border rounded-md"
                                required
                            >
                                <option value={status!}>
                                    Current Status: {status}
                                </option>
                                <option value="PENDING">PENDING</option>
                                <option value="PREPARING">PREPARING</option>
                                <option value="COMPLETED">COMPLETED</option>
                                <option value="CANCELED">CANCELED</option>
                                <option value="PICKUP">PICKUP</option>
                            </select>
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

export default EditOrderDetailStatus;
