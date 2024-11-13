"use server";

import { Endpoint, FetchData } from "@/types";

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
