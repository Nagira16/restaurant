"use client";

import { Endpoint, Menu } from "@/types";
import {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "./ui/card";
import Image from "next/image";
import { getAllTablesById } from "@/actions";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { useCart } from "./providers/CartContext";
import { CirclePlus, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

type SingleMenuProps = {
    menu_id: string;
};

const SingleMenu = ({ menu_id }: SingleMenuProps): JSX.Element => {
    const [menu, setMenu] = useState<Menu | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router: AppRouterInstance = useRouter();
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchMenu = async () => {
            const data = await getAllTablesById<Menu | null>(
                Endpoint.menus,
                menu_id
            );
            setMenu(data);
            setLoading(false);
        };

        fetchMenu();
    }, [menu_id]);

    return (
        <>
            <button onClick={() => router.push("/menus")}>
                <ChevronLeft className=" mt-5 ml-5" />
            </button>
            {loading ? (
                <div className="w-[400px] space-y-5">
                    <CardHeader>
                        <CardTitle>
                            <Skeleton className="h-[40px] w-[300px]" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-[430px] w-[350px] rounded-xl" />
                    </CardContent>
                    <CardFooter>
                        <CardDescription>
                            <Skeleton className="h-[70px] w-[350px]" />
                        </CardDescription>
                    </CardFooter>
                </div>
            ) : (
                menu && (
                    <div className="w-[400px] space-y-5">
                        <CardHeader>
                            <CardTitle className="text-4xl">
                                {menu.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Image
                                src={menu.image}
                                alt={menu.name}
                                width={400}
                                height={300}
                                className="rounded-xl"
                            />
                        </CardContent>
                        <CardFooter className="w-full grid space-y-3">
                            <p>
                                $
                                {parseFloat(
                                    menu.price.toString() || "0"
                                ).toFixed(2)}
                            </p>
                            <CardDescription>
                                {menu.description}
                            </CardDescription>
                            <Button
                                onClick={() =>
                                    addToCart({
                                        id: menu_id,
                                        name: menu.name,
                                        price: menu.price,
                                        quantity: 1,
                                        image: menu.image
                                    })
                                }
                                className="mt-4 px-6 py-3 bg-red-600 text-white font-semibold rounded-2xl hover:bg-red-700"
                            >
                                <span>Add to Cart</span>
                                <CirclePlus />
                            </Button>
                        </CardFooter>
                    </div>
                )
            )}
        </>
    );
};

export default SingleMenu;
