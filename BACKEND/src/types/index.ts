import { User } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export type ReviewWithUser = {
    id: string;
    user_id: string;
    menu_id: string;
    stars: number;
    comments: string | null;
    created_at: Date;
    user: { name: string | null; image: string | null };
};

export type ItemOrderDetailsWithMenuInfo = {
    id: string;
    order_details_id: string;
    menu_id: string;
    quantity: number;
    menu: { name: string | null; image: string | null };
};

export type UserWithRoleName = {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    image: string | null;
    address: string | null;
    role_id: string;
    clerk_id: string;
    role: {
        role_name: string;
    };
};

export type RoleWithUserName = {
    id: string;
    role_name: string;
    users: { name: string }[];
};

export type MenuWithCategoryName = {
    name: string;
    id: string;
    description: string | null;
    price: Decimal;
    category_id: string | null;
    image: string | null;
    category: {
        category_name: string;
    } | null;
};
