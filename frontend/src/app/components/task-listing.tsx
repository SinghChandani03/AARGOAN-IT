"use client";

import { Task } from "../types/task";

interface Props {
   tasks: Task[];
   onEdit: (task: Task) => void;
   onDelete: (id: number) => void;
}

const TaskList = ({ tasks, onEdit, onDelete }: Props) => {
   if (!tasks || tasks.length === 0) {
      return (
         <div className="flex justify-center mt-10">
            <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm text-gray-500 shadow-sm">
               No tasks found
            </div>
         </div>
      );
   }

   return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {tasks.map((task) => {
            const isOverdue =
               new Date(task.due_date) < new Date() &&
               task.status !== "COMPLETED";

            return (
               <div
                  key={task.id}
                  className={`bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition ${isOverdue ? "border-red-300 bg-red-50" : ""
                     }`}
               >
                  <div className="flex justify-between items-start gap-3">
                     <h2 className="text-lg font-semibold text-gray-900">
                        {task.title}
                     </h2>

                     <span className="text-xs px-2 py-1 rounded-full bg-gray-100">
                        {task.priority}
                     </span>
                  </div>

                  <div className="mt-3 space-y-1 text-sm text-gray-600">
                     <p>Assigned: {task.assigned_user}</p>
                     <p>Due: {task.due_date}</p>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                     <span className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                        {task.status}
                     </span>

                     {isOverdue && (
                        <span className="text-xs text-red-600 font-semibold">
                           Overdue
                        </span>
                     )}
                  </div>

                  <div className="mt-5 flex gap-3">
                     <button
                        onClick={() => onEdit(task)}
                        disabled={task.status === "COMPLETED"}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-sm py-2 rounded-lg font-medium disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                     >
                        Edit
                     </button>
                     
                     <button
                        onClick={() => onDelete(task.id)}
                        className="flex-1 bg-red-100 hover:bg-red-200 text-sm py-2 rounded-lg font-medium text-red-600"
                     >
                        Delete
                     </button>
                  </div>
               </div>
            );
         })}
      </div>
   );
};

export default TaskList;