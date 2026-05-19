import { Task } from "./task";

export interface Dashboard {
    totalProjects: number;
    totalTasks: number;
    overdueTasks: number;
    completedPercentage: number;
    recentActivity: Task[];
}