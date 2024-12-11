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
