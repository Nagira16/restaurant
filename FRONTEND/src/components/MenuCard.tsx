"use client";

import { Menu } from "@/types";
import { Card, CardTitle, CardContent } from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getReviewRate } from "@/actions";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Button } from "./ui/button";
import { CirclePlus } from "lucide-react";
import { useCart } from "./providers/CartContext";

type MenuCardProps = {
    menu: Menu;
};

const MenuCard = ({ menu }: MenuCardProps): JSX.Element => {
    const [rating, setRating] = useState<number | null>(0);
    const [counter, setCounter] = useState<number | null>(0);
    const { addToCart } = useCart();

    useEffect(() => {
        fetchRating();
    }, []);

    const fetchRating = async () => {
        const data: { results: number; counts: number } | null =
            await getReviewRate(menu.id);

        if (data) {
            setRating(data.results);
            setCounter(data.counts);
        }
    };

    return (
        <Link href={`/menus/${menu.id}`}>
            <Card className="flex shadow-lg hover:shadow-2xl transition-all duration-300">
                <Image
                    src={menu.image}
                    alt={menu.name}
                    width={200}
                    height={150}
                    priority
                    className="max-w-32 object-cover rounded-l-xl rounded-tr-none"
                />

                <CardContent className="flex flex-col space-y-2 items-start my-5 sm:mt-10 text-left">
                    <CardTitle className="text-xl">{menu.name}</CardTitle>
                    <div className="flex space-x-2">
                        {rating !== null && (
                            <Rating
                                value={rating}
                                readOnly
                                className="max-w-[70px]"
                            />
                        )}
                        {rating !== null && (
                            <p className="text-sm">({counter})</p>
                        )}
                    </div>
                    <div className="mt-5">
                        <Button
                            onClick={() =>
                                addToCart({
                                    id: menu.id,
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
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};

export default MenuCard;
