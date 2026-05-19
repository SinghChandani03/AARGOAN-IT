"use client";

import { useState } from "react";
import useTasks from "../hooks/useTask";
import useProjects from "../hooks/useProject";
import TaskList from "../components/task-listing";
import CreateModal from "../components/create-model";
import { Task } from "../types/task";
import { deleteTaskApi } from "../services/taskService";
import { toast } from "react-hot-toast";

const Tasks = () => {

   const {
      tasks,
      getTasks,
      loading,
      error
   } = useTasks();

   const { projects } = useProjects();
   const [openModal, setOpenModal] = useState(false);
   const [mode, setMode] = useState<"CREATE" | "EDIT">("CREATE");
   const [selectedTask, setSelectedTask] = useState<Task | null>(null);

   const handleCreate = () => {
      setSelectedTask(null);
      setMode("CREATE");
      setOpenModal(true);
   };

   const handleEdit = (task: Task) => {
      setSelectedTask(task);
      setMode("EDIT");
      setOpenModal(true);
   };

   const handleDelete = async (id: number) => {
         try {
            await deleteTaskApi(id);
            toast.success("Task deleted successfully");
            await getTasks();
         } catch (error: any) {
            toast.error(
               error?.response?.data?.message || "Something went wrong"
            );
         }
      };

   if (loading) {
      return (
         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="h-12 w-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
         </div>
      );
   }

   if (error) {
      return (
         <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white border border-red-200 text-red-600 px-5 py-3 rounded-xl shadow-sm text-sm">
               {error}
            </div>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-gray-100 p-6">

         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 md:p-6 mb-6 flex justify-between items-center">
            <div>
               <h1 className="text-xl md:text-1xl font-bold text-gray-900">
                  Task Dashboard
               </h1>
            </div>

            <button
               onClick={handleCreate}
               className="bg-black text-white px-4 py-2 rounded-lg"
            >
               + Create
            </button>
         </div>

         <TaskList
            tasks={tasks}
            onEdit={handleEdit}
            onDelete={handleDelete}
         />

         <CreateModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            mode={mode}
            entity="TASK"
            task={selectedTask}
            projects={projects}
            refreshTasks={getTasks}
         />

      </div>
   );
};

export default Tasks;