"use server";

import {
    Endpoint,
    FetchData,
    Item_Order_Details,
    Order_Details,
    Payment,
    ReviewWithUser,
    User,
    UserData
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
        console.log(data.results);

        return data.results as T;
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

export const saveUser = async (user: UserData) => {
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
    console.log(data.message);
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

    if (!data.success) {
        console.log("==============", data.message);
        return null;
    } else {
        console.log("==============", data.message);
        console.log("Payments", data.results);
        return data.clientSecret || null;
    }
};

export const updatePaymentStatus = async (
    stripe_id: string,
    status: "SUCCESS" | "FAILED"
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
