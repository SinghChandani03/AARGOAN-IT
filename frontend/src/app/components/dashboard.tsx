"use client";

import useDashboard from "../hooks/useDashboard";
import { Task } from "../types/task";

const Dashboard = () => {

   const { dashboard, loading, error } = useDashboard();

   if (loading) {
      return (
         <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="h-12 w-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
         </div>
      );
   }

   if (error) {
      return (
         <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white border border-red-200 text-red-600 px-5 py-3 rounded-xl text-sm w-full max-w-sm text-center">
               {error}
            </div>
         </div>
      );
   }

   if (!dashboard) {
      return (
         <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <h1 className="text-lg md:text-xl font-semibold text-center">
               No Dashboard Data Found
            </h1>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
         <div className="max-w-7xl mx-auto">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
               <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Dashboard
               </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

               <div className="bg-white p-4 md:p-5 rounded-xl shadow-sm border">
                  <p className="text-sm text-gray-500">Total Projects</p>
                  <h2 className="text-xl md:text-2xl font-bold mt-2">
                     {dashboard.totalProjects}
                  </h2>
               </div>

               <div className="bg-white p-4 md:p-5 rounded-xl shadow-sm border">
                  <p className="text-sm text-gray-500">Total Tasks</p>
                  <h2 className="text-xl md:text-2xl font-bold mt-2">
                     {dashboard.totalTasks}
                  </h2>
               </div>

               <div className="bg-white p-4 md:p-5 rounded-xl shadow-sm border">
                  <p className="text-sm text-gray-500">Overdue Tasks</p>
                  <h2 className="text-xl md:text-2xl font-bold mt-2 text-red-500">
                     {dashboard.overdueTasks}
                  </h2>
               </div>

               <div className="bg-white p-4 md:p-5 rounded-xl shadow-sm border">
                  <p className="text-sm text-gray-500">Completed %</p>
                  <h2 className="text-xl md:text-2xl font-bold mt-2 text-green-600">
                     {dashboard.completedPercentage.toFixed(2)}%
                  </h2>
               </div>

            </div>

            <div className="mt-6 md:mt-10 bg-white rounded-xl border shadow-sm p-4 md:p-6">

               <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-5">
                  Recent Activity
               </h2>

               <div className="space-y-3 md:space-y-4">

                  {dashboard.recentActivity.map((task: Task) => (
                     <div
                        key={task.id}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b pb-3"
                     >

                        <div>
                           <p className="font-medium text-sm md:text-base">
                              {task.title}
                           </p>

                           <p className="text-xs md:text-sm text-gray-500">
                              Assigned to: {task.assigned_user}
                           </p>
                        </div>

                        <span className="self-start sm:self-auto text-xs px-3 py-1 bg-gray-100 rounded-full">
                           {task.status}
                        </span>

                     </div>
                  ))}

               </div>
            </div>
         </div>

      </div>
   );
};

export default Dashboard;