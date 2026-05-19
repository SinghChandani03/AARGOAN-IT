"use client";

import { useEffect, useState, useCallback } from "react";
import { getTasksApi } from "../services/taskService";
import { Task } from "../types/task";

const useTasks = () => {

   const [tasks, setTasks] = useState<Task[]>([]);
   const [loading, setLoading] = useState<boolean>(false);
   const [error, setError] = useState<string>("");

   const getTasks = useCallback(async (): Promise<void> => {
      try {
         setLoading(true);
         setError("");
         const data = await getTasksApi();
         setTasks(data);
      } catch (error: any) {
         setError(error?.response?.data?.message || error.message);
      } finally {
         setLoading(false);
      }
   }, []);

   useEffect(() => {
      getTasks();
   }, [getTasks]);

   return {
      tasks,
      loading,
      error,
      getTasks
   };
};

export default useTasks;