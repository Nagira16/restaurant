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
import { ChangeEvent, useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { useCart } from "./providers/CartContext";
import { CirclePlus } from "lucide-react";
import BackButton from "./BackButton";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type SingleMenuProps = {
    menu_id: string;
};

const SingleMenu = ({ menu_id }: SingleMenuProps): JSX.Element => {
    const [menu, setMenu] = useState<Menu | null>(null);
    const [quantities, setQuantites] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchMenu = async () => {
            const data = await getAllTablesById<Menu | null>(
                Endpoint.menus,
                menu_id
            );
            if (!data) {
                setLoading(false);
                return;
            }
            setMenu(data);
            setLoading(false);
        };

        fetchMenu();
    }, [menu_id]);

    const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (value > 0) {
            setQuantites(value);
        } else {
            setQuantites(1);
        }
    };

    const isAddToCartDisabled = quantities <= 0;

    return (
        <div className="w-[310px] md:w-[400px] space-y-5 mx-auto">
            <BackButton />
            {loading ? (
                <>
                    <CardHeader>
                        <CardTitle>
                            <Skeleton className="h-[40px] w-full" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-[330px] md:h-[440px] w-full rounded-xl" />
                    </CardContent>
                    <CardFooter className="flex flex-col items-stretch space-y-3">
                        <Skeleton className="h-[20px] w-[70px]" />

                        <CardDescription>
                            <Skeleton className="h-[50px] w-full" />
                        </CardDescription>

                        <div className="flex items-center space-x-5">
                            <Label htmlFor="quantity" className="text-md">
                                Quantity:
                            </Label>
                            <Input value={1} />
                        </div>

                        <Button
                            disabled={isAddToCartDisabled}
                            className="mt-4 px-6 py-3 bg-red-600 text-white font-semibold rounded-2xl hover:bg-red-700"
                        >
                            <span>Add to Cart</span>
                            <CirclePlus />
                        </Button>
                    </CardFooter>
                </>
            ) : (
                menu && (
                    <>
                        <CardHeader>
                            <CardTitle className="text-4xl">
                                {menu.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Image
                                src={menu.image}
                                alt={menu.name}
                                width={300}
                                height={300}
                                style={{ width: "100%", height: "auto" }}
                                priority
                                className="rounded-xl"
                            />
                        </CardContent>
                        <CardFooter className="flex flex-col items-stretch space-y-3">
                            <p>
                                $
                                {parseFloat(
                                    menu.price.toString() || "0"
                                ).toFixed(2)}
                            </p>

                            <CardDescription>
                                {menu.description}
                            </CardDescription>

                            <div className="flex items-center space-x-5">
                                <Label htmlFor="quantity" className="text-md">
                                    Quantity:
                                </Label>
                                <Input
                                    type="number"
                                    value={quantities}
                                    name="quantity"
                                    onChange={handleQuantityChange}
                                    min="1"
                                />
                            </div>

                            <Button
                                onClick={() =>
                                    addToCart({
                                        id: menu_id,
                                        name: menu.name,
                                        price: menu.price,
                                        quantity: quantities,
                                        image: menu.image
                                    })
                                }
                                disabled={isAddToCartDisabled}
                                className="mt-4 px-6 py-3 bg-red-600 text-white font-semibold rounded-2xl hover:bg-red-700"
                            >
                                <span>Add to Cart</span>
                                <CirclePlus />
                            </Button>
                        </CardFooter>
                    </>
                )
            )}
        </div>
    );
};

export default SingleMenu;
