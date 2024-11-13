"use client";

import { getAllTables } from "@/actions";
import { Endpoint, Menu } from "@/types";
import { useEffect, useState } from "react";
import MenuCard from "./MenuCard";

const MenuList = (): JSX.Element => {
    const [menus, setMenus] = useState<Menu[]>();
    useEffect(() => {
        const fetchMenus = async () => {
            const results = await getAllTables<Menu>(Endpoint.menus);
            setMenus(results);
        };
        fetchMenus();
    }, []);

    return (
        <div>
            <h1>MenuList</h1>
            <div>
                {menus?.map((m) => (
                    <MenuCard menu={m} key={m.id} />
                ))}
            </div>
        </div>
    );
};

export default MenuList;
