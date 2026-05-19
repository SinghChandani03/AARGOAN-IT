import API from "./api";
import { Task } from "../types/task";

export const getTasksApi =
    async (): Promise<Task[]> => {

        const response = await API.get("/tasks");
        return response.data.data;
    };

export const createTaskApi =
    async (
        data: Omit<
            Task,
            "id" |
            "createdAt" |
            "updatedAt"
        >
    ): Promise<Task> => {

        const response =
            await API.post(
                "/tasks",
                data
            );

        return response.data.data;
    };

export const updateTaskApi =
    async (
        id: number,
        data: Partial<Task>
    ): Promise<Task> => {

        const response =
            await API.put(
                `/tasks/${id}`,
                data
            );

        return response.data.data;
    };

export const deleteTaskApi =
    async (
        id: number
    ): Promise<void> => {

        await API.delete(
            `/tasks/${id}`,
            {
                headers: {
                    role: "ADMIN"
                }
            }
        );
    };