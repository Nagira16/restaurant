export type Menu = {
    id: string;
    name: string;
    description: string;
    price: number;
    category_id: string;
    image: string;
};

export type User = {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    role_id: string;
    clerk_id: string;
};

export type Table = {
    id: string;
    number: number;
    capacity: number;
    available: boolean;
};

export type Role = {
    id: string;
    role_name: string;
};

export type Review = {
    id: string;
    user_id: string;
    menu_id: string;
    stars: number;
    comments: string;
    created_at: Date;
};
export type Reservation = {
    id: string;
    user_id: string;
    created_at: Date;
    num_of_people: number;
    table_id: string;
    status: string;
    location: string;
    reservationDateTime: Date;
};
export type Payment = {
    id: string;
    user_id: string;
    created_at: Date;
    status: string;
    stripe_id: string | null;
    amount: number;
    currency: string;
    method: string;
};

export type Order_Details = {
    id: string;
    user_id: string;
    status: string;
    payment_id: string;
    total_price: number;
    date: Date;
};

export type Nutrient = {
    id: string;
    menu_id: string;
    calories: number;
    protein: number;
    carbohydrates: number;
    fats: number;
    fiber: number;
    sugar: number;
    sodium: number;
};

export type Item_Order_Details = {
    id: string;
    menu_id: string;
    order_details_id: string;
    quantity: number;
};

export type Category = {
    id: string;
    category_name: string;
};

export type FetchData = {
    message: string;
    counts?: number;
    success: boolean;
    clientSecret?: string;
    results:
        | Menu[]
        | User[]
        | Table[]
        | Role[]
        | Review
        | Review[]
        | Reservation[]
        | Payment[]
        | Order_Details[]
        | Item_Order_Details[]
        | Nutrient
        | Category[]
        | number
        | null;
};

export enum Endpoint {
    admin = "admin",
    users = "users",
    menus = "menus",
    tables = "tables",
    roles = "roles",
    reviews = "reviews",
    reservations = "reservations",
    payments = "payments",
    orderDetails = "orderDetails",
    nutrients = "nutrients",
    categories = "categories",
    itemOrderDetails = "itemOrderDetails"
}

export type UserData = {
    name: string | null;
    email: string;
    phone: string | null;
    address: {} | null;
    image: string;
    clerk_id: string;
};

export type ReviewWithUser = {
    id: string;
    user_id: string;
    menu_id: string;
    stars: number;
    comments: string | null;
    created_at: Date;
    user: { name: string | null; image: string | null };
};

export type CartItem = {
    menu_id: string;
    menu_name: string;
    price: number;
    quantity: number;
};
