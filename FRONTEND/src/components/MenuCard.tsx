"use client";

import { Menu } from "@/types";
import {
    Card,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter
} from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getReviewRate } from "@/actions";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

type MenuCardProps = {
    menu: Menu;
};

const MenuCard = ({ menu }: MenuCardProps): JSX.Element => {
    const [rating, setRating] = useState<number | null>(0);
    const [counter, setCounter] = useState<number | null>(0);
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
            <Card className="flex flex-col sm:flex-row w-[320px] sm:w-[450px] h-fit sm:h-[300px] m-2">
                <Image
                    src={menu.image}
                    alt={menu.name}
                    width={200}
                    height={100}
                    className="w-full sm:w-[200px] rounded-t-xl sm:rounded-l-xl"
                />
                <CardContent className="flex flex-col justify-between items-start my-5 sm:my-10 text-left">
                    <CardTitle className="text-xl">{menu.name}</CardTitle>
                    <CardDescription>{menu.description}</CardDescription>
                    <div className="flex space-x-2">
                        {rating !== null && (
                            <Rating
                                value={rating}
                                readOnly
                                className="max-w-[80px]"
                            />
                        )}
                        {rating !== null && (
                            <p className="text-sm">({counter})</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};

export default MenuCard;
