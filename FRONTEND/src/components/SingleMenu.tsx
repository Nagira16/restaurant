"use client";

import { Endpoint, Menu } from "@/types";
import { Button } from "./ui/button";
import { useCart } from "./providers/CartContext";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ChangeEvent, useEffect, useState } from "react";
import { getAllTablesById } from "@/actions";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";

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
        <div className="space-y-6">
            {loading ? (
                <>
                    <Skeleton className="h-[610px] w-full rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-[30px] w-[200px] rounded-xl" />

                        <Skeleton className="h-[25px] w-[200px] rounded-xl" />

                        <Skeleton className="h-[20px] w-[500px] rounded-xl" />
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <div className="grid gap-2">
                                <Label
                                    htmlFor="quantity"
                                    className="text-sm font-medium leading-none"
                                >
                                    Quantity
                                </Label>
                                <Input
                                    type="number"
                                    id="quantity"
                                    defaultValue="1"
                                    min="1"
                                    value={quantities}
                                    className="w-24"
                                    disabled={true}
                                />
                            </div>
                        </div>
                        <Button
                            className="w-full rounded-xl"
                            size="lg"
                            disabled={true}
                        >
                            Add to Cart
                        </Button>
                    </div>
                </>
            ) : (
                menu && (
                    <>
                        <div className="relative aspect-square overflow-hidden rounded-xl">
                            <Image
                                src={menu.image}
                                alt={menu.name}
                                className="object-cover"
                                fill
                                priority
                            />
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold">{menu.name}</h1>
                            <p className="text-xl font-semibold text-primary">
                                $ {parseInt(menu.price.toString()).toFixed(2)}
                            </p>
                            <p className="text-muted-foreground">
                                {menu.description}
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <div className="grid gap-2">
                                    <Label
                                        htmlFor="quantity"
                                        className="text-sm font-medium leading-none"
                                    >
                                        Quantity
                                    </Label>
                                    <Input
                                        type="number"
                                        id="quantity"
                                        defaultValue="1"
                                        min="1"
                                        value={quantities}
                                        className="w-24 rounded-xl"
                                        onChange={handleQuantityChange}
                                    />
                                </div>
                            </div>
                            <Button
                                className="w-full rounded-xl bg-red-600 text-white hover:bg-red-700"
                                size="lg"
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
                            >
                                Add to Cart
                            </Button>
                        </div>
                    </>
                )
            )}
        </div>
    );
};

export default SingleMenu;
