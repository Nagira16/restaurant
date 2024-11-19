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

type SingleMenuProps = {
    menu_id: string;
};

const SingleMenu = async ({
    menu_id
}: SingleMenuProps): Promise<JSX.Element> => {
    const menu = await getAllTablesById<Menu | null>(Endpoint.menus, menu_id);

    return (
        <>
            {menu && (
                <div className="w-[400px] space-y-5">
                    <CardHeader>
                        <CardTitle className="text-4xl">{menu.name}</CardTitle>
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
                        <CardDescription className="">
                            {menu.description}
                        </CardDescription>
                    </CardFooter>
                </div>
            )}
        </>
    );
};

export default SingleMenu;
