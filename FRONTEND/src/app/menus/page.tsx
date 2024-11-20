import MenuList from "@/components/MenuList";
import React from "react";

const MenuPage: React.FC = () => {
    return (
        <div className="text-center space-y-1 mt-4">
            <h1 className="text-5xl font-bold">Our Special Menus</h1>
            <p className="opacity-50">Made with premium ingredients</p>
            <MenuList />
        </div>
    );
};

export default MenuPage;
