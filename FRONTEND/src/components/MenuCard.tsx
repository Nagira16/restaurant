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

type MenuCardProps = {
    menu: Menu;
};

const MenuCard = ({ menu }: MenuCardProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{menu.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <Image src={menu.image} alt={menu.name} />
                <CardDescription>{menu.description}</CardDescription>
            </CardContent>
            <CardFooter>$ {menu.price} CAD</CardFooter>
        </Card>
    );
};

export default MenuCard;
