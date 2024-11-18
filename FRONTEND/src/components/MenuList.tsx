"use client";

import { getAllTables } from "@/actions";
import { Endpoint, Menu } from "@/types";
import { useEffect, useState } from "react";
import MenuCard from "./MenuCard";

const MenuList = (): JSX.Element => {
    const [menus, setMenus] = useState<Menu[]>();
    useEffect(() => {
        fetchMenus();
    }, []);

    const fetchMenus = async () => {
        const results = await getAllTables<Menu>(Endpoint.menus);
        setMenus(results);
    };

    return (
        <div className="flex justify-center items-stretch flex-wrap">
            {menus?.map((m) => (
                <MenuCard menu={m} key={m.id} />
            ))}
        </div>
    );
};

export default MenuList;
