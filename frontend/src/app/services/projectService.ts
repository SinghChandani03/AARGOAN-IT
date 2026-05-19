import API from "./api";
import { Project } from "../types/projects";

export const getProjectsApi =
    async (): Promise<Project[]> => {

        const response =
            await API.get("/projects");

        return response.data.data;
    };

export const createProjectApi =
    async (
        data: Omit<
            Project,
            "id" |
            "createdAt" |
            "updatedAt"
        >
    ): Promise<Project> => {

        const response =
            await API.post(
                "/projects",
                data
            );

        return response.data.data;
    };

export const updateProjectApi = async (
    id: number,
    data: Partial<Project>
): Promise<Project> => {

    const response = await API.put(
        `/projects/${id}`,
        data
    );

    return response.data.data;
};

export const deleteProjectApi =
    async (
        id: number
    ): Promise<void> => {

        await API.delete(
            `/projects/${id}`,
            {
                headers: {
                    role: "ADMIN"
                }
            }
        );
    };