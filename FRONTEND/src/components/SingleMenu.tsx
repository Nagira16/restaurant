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

type SingleMenuProps = {
    menu_id: string;
};

const SingleMenu = ({ menu_id }: SingleMenuProps): JSX.Element => {
    const [menu, setMenu] = useState<Menu | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

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
                        <CardFooter>
                            <CardDescription>
                                {menu.description}
                            </CardDescription>
                        </CardFooter>
                    </div>
                )
            )}
        </>
    );
};

export default SingleMenu;
