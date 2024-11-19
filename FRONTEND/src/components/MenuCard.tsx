import { Menu } from "@/types";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter
} from "./ui/card";
import Image from "next/image";
import Link from "next/link";

type MenuCardProps = {
    menu: Menu;
};

const MenuCard = ({ menu }: MenuCardProps) => {
    return (
        <Link href={`/menus/${menu.id}`}>
            <Card className="flex w-[450px] h-[300px] m-2">
                <Image
                    src={menu.image}
                    alt={menu.name}
                    width={200}
                    height={100}
                    className=" rounded-l-xl"
                />
                <CardContent className="flex flex-col justify-between items-start my-10">
                    <CardTitle className="text-xl">{menu.name}</CardTitle>
                    <CardDescription>{menu.description}</CardDescription>
                    <p className="font-semibold">${menu.price} CAD</p>
                </CardContent>
            </Card>
        </Link>
    );
};

export default MenuCard;
