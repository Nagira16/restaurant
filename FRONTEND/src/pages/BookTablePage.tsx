"use client";

import { useEffect, useState } from "react";
import {
    CalendarIcon,
    Users,
    MapPin,
    ChevronRight,
    ChevronDown
} from "lucide-react";
import { format, parse, setHours, setMinutes } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Endpoint, TableType } from "@/types";
import { getAllTables, reserveTable } from "@/actions";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const timeSlots = [
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
    "7:30 PM"
];

const locations = [
    "428 Carrall Street Vancouver",
    "831 12th Street, New Westminster"
];

const ReservationForm = (): JSX.Element => {
    const [guests, setGuests] = useState<number>(0);
    const [tableId, setTableId] = useState<string>("");
    const [tables, setTables] = useState<TableType[]>([]);
    const [location, setLocation] = useState<string>();
    const [date, setDate] = useState<Date>();
    const [time, setTime] = useState<string>();
    const { getToken } = useAuth();
    const router: AppRouterInstance = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token: string | null = await getToken();
        if (!date || !time || !guests || !tableId || !location || !token)
            return;

        const [hours, minutes] = time.split(":");
        const dateTime = setMinutes(
            setHours(date, parseInt(hours, 10)),
            parseInt(minutes, 10)
        );

        const result = await reserveTable(
            token,
            guests,
            tableId,
            location,
            dateTime
        );

        if (!result) {
            alert("Reservation Failed");
        } else {
            router.push(`/book-table/success/${result.id}`);
        }
    };
    const fetchTable = async () => {
        const results = await getAllTables<TableType>(Endpoint.tables);
        setTables(results);
    };

    useEffect(() => {
        fetchTable();
    }, []);
    return (
        <Card className="w-full max-w-lg mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl">Reserve a Table</CardTitle>
                <CardDescription>
                    Book your dining experience in a few simple steps
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="guests">Number of Guests</Label>
                        <Select
                            value={guests.toString()}
                            onValueChange={(value: string) =>
                                setGuests(parseInt(value))
                            }
                        >
                            <SelectTrigger id="guests" className="w-full">
                                <SelectValue placeholder="Select number of guests" />
                            </SelectTrigger>
                            <SelectContent className="bg-white shadow-lg rounded-md">
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                    <SelectItem
                                        key={num}
                                        value={num.toString()}
                                    >
                                        <div className="flex items-center">
                                            <Users className="mr-2 h-4 w-4" />
                                            {num}{" "}
                                            {num === 1 ? "Guest" : "Guests"}
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Table</Label>
                        <Select value={tableId} onValueChange={setTableId}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select time">
                                    <div className="flex items-center">
                                        Select Table
                                    </div>
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent className="bg-white shadow-lg rounded-md">
                                {tables.map((table) => (
                                    <SelectItem key={table.id} value={table.id}>
                                        <div className="flex items-center">
                                            Table Number: {table.number} Table
                                            Capacity: {table.capacity}
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Date</label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-full justify-between text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <div className="flex items-center">
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date
                                            ? format(date, "PPP")
                                            : "Pick a date"}
                                    </div>
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-auto p-0 bg-white shadow-lg rounded-md"
                                align="start"
                            >
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                    disabled={(date) => date < new Date()}
                                    className="border border-gray-300 rounded-lg shadow-sm"
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Time</label>
                        <Select value={time} onValueChange={setTime}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent className="bg-white shadow-lg rounded-md">
                                {timeSlots.map((slot) => (
                                    <SelectItem key={slot} value={slot}>
                                        {format(
                                            parse(slot, "h:mm a", new Date()),
                                            "h:mm a"
                                        )}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Location</Label>
                        <Select value={location} onValueChange={setLocation}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select location">
                                    <div className="flex items-center">
                                        <MapPin className="mr-2 h-4 w-4" />
                                        {location || "Select location"}
                                    </div>
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent className="bg-white shadow-lg rounded-md">
                                {locations.map((loc) => (
                                    <SelectItem key={loc} value={loc}>
                                        <div className="flex items-center">
                                            <MapPin className="mr-2 h-4 w-4" />
                                            {loc}
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-red-500 hover:bg-red-700 text-white"
                        disabled={!date || !time || !guests || !location}
                    >
                        Complete Reservation
                        <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default ReservationForm;
