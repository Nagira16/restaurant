"use server";

import {
    Category,
    Endpoint,
    FetchData,
    Item_Order_Details,
    Menu,
    Nutrient,
    Order_Details,
    OrderDetailsStatus,
    Payment,
    PaymentStatus,
    ReviewWithUser,
    Role,
    TableType,
    UserData,
    UserWithRoleName
} from "@/types";

export const getAllTables = async <T>(endpoint: Endpoint): Promise<T[]> => {
    const res: Response = await fetch(`http://localhost:3001/${endpoint}`);
    const data: FetchData = await res.json();
    if (!data.success) {
        console.log("==============", data.message);
        return [];
    } else {
        console.log("==============", data.message);
        return data.results as T[];
    }
};

export const getAllTablesById = async <T>(
    endpoint: Endpoint,
    id: string
): Promise<T | null> => {
    const res: Response = await fetch(
        `http://localhost:3001/${endpoint}/${id}`
    );
    const data: FetchData = await res.json();
    if (!data.success) {
        console.log("==============", data.message);
        return null;
    } else {
        console.log("==============", data.message);

        return data.results as T;
    }
};

export const getUserByClerkId = async (
    id: string
): Promise<UserWithRoleName | null> => {
    const res: Response = await fetch(
        `http://localhost:3001/${Endpoint.users}/clerk/${id}`
    );
    const data: FetchData = await res.json();
    if (!data.success) {
        console.log("==============", data.message);
        return null;
    } else {
        console.log("==============", data.message);

        return data.results as UserWithRoleName;
    }
};

export const createNewReview = async (
    token: string,
    menu_id: string,
    rating: number,
    comments: string
): Promise<ReviewWithUser | null> => {
    const res: Response = await fetch(`http://localhost:3001/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            menu_id,
            rating,
            comments
        })
    });

    const data: FetchData = await res.json();
    console.log(data);

    if (!data.success) {
        console.log("==============", data.message);
        return null;
    } else {
        console.log("==============", data.message);
        return data.results as ReviewWithUser;
    }
};

export const getReviewRate = async (
    menu_id: string
): Promise<{ results: number; counts: number } | null> => {
    const res: Response = await fetch(
        `http://localhost:3001/reviews/rate/${menu_id}`
    );
    const data: FetchData = await res.json();
    if (!data.success) {
        console.log("==============", data.message);
        return null;
    } else {
        console.log("==============", data.message);
        return {
            results: data.results as number,
            counts: data.counts as number
        };
    }
};

export const saveUser = async (user: UserData): Promise<UserWithRoleName> => {
    const res: Response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            image: user.image,
            clerk_id: user.clerk_id
        })
    });

    const data: FetchData = await res.json();
    console.log("--------------", data.message);

    return data.results as UserWithRoleName;
};

export const getClientSecret = async (
    token: string,
    total: number,
    method: string
): Promise<string | null> => {
    console.log(total);

    const res: Response = await fetch("http://localhost:3001/payments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            total,
            currency: "cad",
            method
        })
    });

    const data: FetchData = await res.json();

    // FIXE//////////////////////////////////////////

    if (!data.success) {
        console.log("HELLO");

        console.log("==============", data.message);
        return null;
    } else {
        console.log("==============", data.message);
        console.log("Payments", data.results);
        return data.clientSecret || null;
    }
};

//////////////////////////////////////

export const updatePaymentStatus = async (
    stripe_id: string,
    status: PaymentStatus
): Promise<null | Payment> => {
    const res: Response = await fetch(
        `http://localhost:3001/payments/${stripe_id}`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                stripe_id,
                status
            })
        }
    );

    const data: FetchData = await res.json();

    if (!data.success) {
        console.log("==============", data.message);
        return null;
    } else {
        console.log("==============", data.message);
        return data.results as Payment;
    }
};

export const saveOrderDetails = async (
    token: string,
    payment_id: string,
    total_price: number
): Promise<Order_Details | null> => {
    const res: Response = await fetch("http://localhost:3001/orderDetails", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            payment_id,
            total_price
        })
    });

    const data: FetchData = await res.json();

    if (!data.success) {
        console.log("==============", data.message);
        return null;
    } else {
        console.log("==============", data.message);
        return data.results as Order_Details;
    }
};

export const saveItemOrderDetails = async (
    token: string,
    order_details_id: string,
    menu_id: string,
    quantity: number
) => {
    const res: Response = await fetch(
        "http://localhost:3001/itemOrderDetails",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                order_details_id,
                menu_id,
                quantity
            })
        }
    );

    const data: FetchData = await res.json();

    if (!data.success) {
        console.log("==============", data.message);
        return null;
    } else {
        console.log("==============", data.message);
        return data.results as Item_Order_Details;
    }
};

export const getAllOrderDetails = async (token: string) => {
    const res: Response = await fetch(`http://localhost:3001/orderDetails`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    });

    const data: FetchData = await res.json();

    if (!data.success) {
        console.log("==============", data.message);
        return null;
    } else {
        console.log("==============", data.message);
        return data.results as Order_Details[];
    }
};

export const deleteById = async <T>(
    endpoint: Endpoint,
    id: string
): Promise<T | null> => {
    const res: Response = await fetch(
        `http://localhost:3001/${endpoint}/${id}`,
        {
            method: "DELETE"
        }
    );

    const data: FetchData = await res.json();

    if (!data.success) {
        console.log("Error:", data.message);
        return null;
    } else {
        console.log("Success:", data.message);
        return data.results as T;
    }
};

export const adminDeleteById = async <T>(
    token: string,
    endpoint: Endpoint,
    id: string
): Promise<T | null> => {
    const res: Response = await fetch(
        `http://localhost:3001/admin/${endpoint}/${id}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data: FetchData = await res.json();

    if (!data.success) {
        console.log("Error:", data.message);
        return null;
    } else {
        console.log("Success:", data.message);
        return data.results as T;
    }
};

export const addNewCategory = async (
    token: string,
    category_name: string
): Promise<Category | null> => {
    const res: Response = await fetch("http://localhost:3001/admin/category", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            category_name
        })
    });

    const data: FetchData = await res.json();

    if (!data.success) {
        console.log("==============", data.message);
        return null;
    } else {
        console.log("==============", data.message);
        return data.results as Category;
    }
};

export const addNewRole = async (
    token: string,
    role_name: string
): Promise<Role | null> => {
    const res: Response = await fetch("http://localhost:3001/admin/roles", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            role_name
        })
    });

    const data: FetchData = await res.json();

    if (!data.success) {
        console.log("==============", data.message);
        return null;
    } else {
        console.log("==============", data.message);
        return data.results as Role;
    }
};

export const addNewMenu = async (
    token: string,
    name: string,
    description: string | null,
    price: number,
    category_name: string,
    image: string
): Promise<Menu | null> => {
    const res: Response = await fetch("http://localhost:3001/admin/menus", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            name,
            description,
            price,
            category_name,
            image
        })
    });

    const data: FetchData = await res.json();

    if (!data.success) {
        console.log("==============", data.message);
        return null;
    } else {
        console.log("==============", data.message);
        return data.results as Menu;
    }
};

export const addNewTable = async (
    token: string,
    number: number,
    capacity: number,
    available: boolean
): Promise<TableType | null> => {
    const res: Response = await fetch("http://localhost:3001/admin/menus", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ number, capacity, available })
    });

    const data: FetchData = await res.json();

    if (!data.success) {
        console.log("==============", data.message);
        return null;
    } else {
        console.log("==============", data.message);
        return data.results as TableType;
    }
};

export const addNewNutrient = async (
    token: string,
    menu_id: string,
    calories: number,
    protein: number,
    carbohydrates: number,
    fats: number,
    fiber: number,
    sugar: number,
    sodium: number
): Promise<Nutrient | null> => {
    const res: Response = await fetch("http://localhost:3001/admin/nutrients", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            menu_id,
            calories,
            protein,
            carbohydrates,
            fats,
            fiber,
            sugar,
            sodium
        })
    });

    const data: FetchData = await res.json();

    if (!data.success) {
        console.log("==============", data.message);
        return null;
    } else {
        console.log("==============", data.message);
        return data.results as Nutrient;
    }
};

export const updateOrderDetails = async (
    orderDetailId: string,
    status: OrderDetailsStatus
): Promise<Order_Details | string> => {
    const res: Response = await fetch(
        `http://localhost:3001/orderDetails/${orderDetailId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                status
            })
        }
    );

    const data: FetchData = await res.json();

    if (!data.success) {
        console.log("==============", data.message);
        return data.message;
    } else {
        console.log("==============", data.message);
        return data.results as Order_Details;
    }
};
