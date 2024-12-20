import { Reservation, ReservationStatus } from "@/types";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTitle,
    DialogTrigger
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Dispatch, SetStateAction } from "react";
import Swal from "sweetalert2";
import { updateReservations } from "@/actions";

type EditReservationStatusProps = {
    currentStatus: ReservationStatus;
    reservationId: string;
    status: ReservationStatus | null;
    setStatus: Dispatch<SetStateAction<ReservationStatus | null>>;
    fetchAllReservations: () => Promise<void>;
};

const EditReservationStatus = ({
    currentStatus,
    reservationId,
    status,
    setStatus,
    fetchAllReservations
}: EditReservationStatusProps) => {
    const handleEditStatus = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!status) return;

        const result: Reservation | string = await updateReservations(
            reservationId,
            status
        );

        if (typeof result === "string") {
            Swal.fire({
                title: result,
                icon: "error"
            });
        } else {
            fetchAllReservations();
            Swal.fire({
                title: "Status Saved Successfully",
                icon: "success",
                timer: 1500
            });
        }
    };
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="mr-2 rounded-xl">
                        Edit Status
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogTitle>Edit Reservation Status</DialogTitle>
                    <form
                        onSubmit={handleEditStatus}
                        className="grid gap-4 py-4"
                    >
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">
                                Status
                            </Label>
                            <select
                                id="status"
                                value={status || ""}
                                onChange={(e) =>
                                    setStatus(
                                        e.target.value as ReservationStatus
                                    )
                                }
                                className="col-span-3 p-2 border rounded-md"
                                required
                            >
                                <option value="" disabled>
                                    Current: {currentStatus}
                                </option>
                                <option value="PENDING">PENDING</option>
                                <option value="CONFIRMED">CONFIRMED</option>
                                <option value="COMPLETED">COMPLETED</option>
                                <option value="CANCELED">CANCELED</option>
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

export default EditReservationStatus;
