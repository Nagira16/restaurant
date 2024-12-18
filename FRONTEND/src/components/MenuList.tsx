"use client";

import { getAllTables } from "@/actions";
import { Endpoint, Menu } from "@/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import MenuCard from "./MenuCard";
import { Skeleton } from "./ui/skeleton";
import { Card, CardContent, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { CirclePlus } from "lucide-react";

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

    setTimeout(() => {
        if (menus.length <= 0) {
            return (
                <div className="h-[100px] gird place-content-center font-bold text-lg">
                    Menus Not Found
                </div>
            );
        }
    }, 5000);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 py-8 gap-6 lg:gap-12 mx-2">
            {loading ? (
                <>
                    {Array.from({ length: 11 }).map((_, i) => (
                        <Card key={i} className="flex shadow-lg ">
                            <Skeleton className="w-full max-w-32 h-[200px] srounded-l-xl rounded-tr-none" />

                            <CardContent className="flex flex-col justify-between space-y-2 items-start my-5 sm:mt-10">
                                <CardTitle className="text-xl">
                                    <Skeleton className="h-5 w-36" />
                                </CardTitle>

                                <div className="flex space-x-2">
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-4 w-5" />
                                </div>

                                <div className="mt-5">
                                    <Button className="mt-4 px-6 py-3 bg-red-600 text-white font-semibold rounded-2xl hover:bg-red-700">
                                        <span>Add to Cart</span>
                                        <CirclePlus />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </>
            ) : (
                menus.map((m) => <MenuCard menu={m} key={m.id} />)
            )}
        </div>
    );
};

export default MenuList;
