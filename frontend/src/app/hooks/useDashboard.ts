"use client";

import { useEffect, useState } from "react";
import { getDashboardApi } from "../services/dashboardService";
import { Dashboard } from "../types/dashboard";

const useDashboard = () => {

   const [dashboard, setDashboard] = useState<Dashboard | null>(null);
   const [loading, setLoading] = useState<boolean>(false);
   const [error, setError] = useState<string>("");

   const getDashboard =
      async (): Promise<void> => {

         try {

            setLoading(true);
            setError("");
            const data = await getDashboardApi();
            setDashboard(data);

         } catch (error: any) {
            setError(
               error?.response?.data?.message ||
               error.message
            );

         } finally {
            setLoading(false);
         }
      };

   useEffect(() => {
      getDashboard();
   }, []);

   return {
      dashboard,
      loading,
      error
   };
};

export default useDashboard;