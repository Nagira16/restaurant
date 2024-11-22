"use client";

import { SelectValue } from "@radix-ui/react-select";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import {
    ReadonlyURLSearchParams,
    useRouter,
    useSearchParams
} from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { getAllTablesById } from "@/actions";
import { Endpoint, Menu } from "@/types";
import { Dispatch, SetStateAction, useEffect } from "react";

type MenuFilterProps = {
    setMenus: Dispatch<SetStateAction<Menu[]>>;
};

const MenuFilter = ({ setMenus }: MenuFilterProps): JSX.Element => {
    const searchParams: ReadonlyURLSearchParams | null = useSearchParams();
    const router: AppRouterInstance = useRouter();

    useEffect(() => {
        const fetchByCategory = async (search: string) => {
            const filteredMenus = await getAllTablesById<Menu[] | null>(
                Endpoint.categories,
                search
            );
            if (filteredMenus) {
                setMenus(filteredMenus);
            }
        };

        const search: string | null = searchParams!.get("search");
        if (search) {
            fetchByCategory(search);
        }
    }, [searchParams]);

    return (
        <div className="flex justify-end mr-6 my-3 sm:m-0  md:absolute top-2 md:right-2 xl:right-8 z-40">
            <Select
                onValueChange={(value: string) =>
                    router.push(`?search=${value}`)
                }
            >
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Appetizers">Appetizers</SelectItem>
                    <SelectItem value="Main Course">Main Course</SelectItem>
                    <SelectItem value="Beverages">Beverages</SelectItem>
                    <SelectItem value="Extra">Extra</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export default MenuFilter;
