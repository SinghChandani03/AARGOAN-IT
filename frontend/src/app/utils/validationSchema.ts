import { z } from "zod";

export const taskSchema = z.object({
    title: z.string().min(1, "Title is required"),
    assigned_user: z.string().min(1, "Assigned user is required"),
    due_date: z.string().min(1, "Due date is required"),
    priority: z.string().min(1, "Priority is required"),
    status: z.string().min(1, "Status is required"),
    project_id: z.string().min(1, "Project is required")
});

export const projectSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    status: z.string().min(1, "Status is required"),
    budget: z.string().min(1, "Budget is required"),
    deadline: z.string().min(1, "Deadline is required")
});