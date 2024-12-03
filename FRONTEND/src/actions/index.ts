"use server";

import {
    CartItem,
    Endpoint,
    FetchData,
    Payment,
    ReviewWithUser,
    UserData
} from "@/types";
import Cookies from "js-cookie";

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
) => {
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
