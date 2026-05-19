"use client";

import { useEffect, useState, useCallback } from "react";
import { getProjectsApi } from "../services/projectService";
import { Project } from "../types/projects";

const useProjects = () => {

   const [projects, setProjects] = useState<Project[]>([]);
   const [loading, setLoading] = useState<boolean>(false);
   const [error, setError] = useState<string>("");

   const getProjects = useCallback(async (): Promise<void> => {
      try {
         setLoading(true);
         setError("");
         const data = await getProjectsApi();
         setProjects(data);
      } catch (error: any) {
         setError(error?.response?.data?.message || error.message);
      } finally {
         setLoading(false);
      }
   }, []);

   useEffect(() => {
      getProjects();
   }, [getProjects]);

   return {
      projects,
      loading,
      error,
      getProjects
   };
};

export default useProjects;