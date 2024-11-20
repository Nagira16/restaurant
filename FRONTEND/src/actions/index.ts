"use server";

import { Endpoint, FetchData, Review } from "@/types";

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
): Promise<Review | null> => {
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
        return data.results as Review;
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
