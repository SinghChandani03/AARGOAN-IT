import API from "./api";
import { Dashboard } from "../types/dashboard";

export const getDashboardApi =
    async (): Promise<Dashboard> => {

        const response =
            await API.get("/dashboard");

        return response.data.data;
    };