"use client";

import { getAllTables } from "@/actions";
import { Endpoint, Menu } from "@/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import MenuCard from "./MenuCard";
import { Skeleton } from "./ui/skeleton";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";

type MenuListProps = {
    menus: Menu[];
    setMenus: Dispatch<SetStateAction<Menu[]>>;
};

const MenuList = ({ menus, setMenus }: MenuListProps): JSX.Element => {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchMenus();
    }, []);

    const fetchMenus = async () => {
        const results = await getAllTables<Menu>(Endpoint.menus);
        setMenus(results);
        setLoading(false);
    };

    return (
        <div className="flex justify-center items-stretch flex-wrap">
            {loading ? (
                <div className="flex justify-center items-stretch flex-wrap">
                    {Array.from({ length: 11 }).map((_, i) => (
                        <Card key={i} className="flex w-[450px] h-[300px] m-2">
                            <Skeleton className="rounded-l-xl w-[200px] h-full" />
                            <CardContent className="flex flex-col justify-between items-start my-10 text-left">
                                <CardTitle className="text-xl">
                                    <Skeleton className="h-4 w-36" />
                                </CardTitle>
                                <CardDescription>
                                    <Skeleton className="h-32 w-40" />
                                </CardDescription>
                                <div className="flex space-x-2">
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-4 w-5" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                menus?.map((m) => <MenuCard menu={m} key={m.id} />)
            )}
        </div>
    );
};

export default MenuList;
