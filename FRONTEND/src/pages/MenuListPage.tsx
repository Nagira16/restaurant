"use client";

import MenuFilter from "@/components/MenuFilter";
import MenuList from "@/components/MenuList";
import { Menu } from "@/types";
import React, { useState } from "react";

const MenuListPage: React.FC = () => {
    const [menus, setMenus] = useState<Menu[]>([]);

    return (
        <div className="text-center space-y-1 mt-4">
            <div className="relative w-full">
                <h1 className="text-3xl sm:text-4xl font-bold">
                    Our Special Menus
                </h1>
                <p className="opacity-50">Made with premium ingredients</p>
                <MenuFilter setMenus={setMenus} />
            </div>
            <MenuList menus={menus} setMenus={setMenus} />
        </div>
    );
};

export default MenuListPage;
