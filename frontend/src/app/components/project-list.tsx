"use client";

import { Project } from "../types/projects";

interface Props {
   projects: Project[];
   onEdit: (project: Project) => void;
   onDelete: (id: number) => void;
}

const ProjectList = ({ projects, onEdit, onDelete }: Props) => {

   if (!projects || projects.length === 0) {
      return (
         <div className="flex justify-center mt-10">
            <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm text-gray-500 shadow-sm">
               No projects found
            </div>
         </div>
      );
   }

   return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

         {projects.map((project: Project) => (
            <div
               key={project.id}
               className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
            >

               <div className="flex items-start justify-between">
                  <div className="flex-1">
                     <h2 className="text-lg font-semibold text-gray-900 truncate">
                        {project.title}
                     </h2>

                     <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {project.description}
                     </p>
                  </div>

                  <span className="ml-3 text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-medium whitespace-nowrap">
                     {project.status}
                  </span>
               </div>

               <div className="mt-5 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                     <span className="text-gray-500">Budget</span>
                     <span className="font-semibold text-gray-900">
                        ₹{project.budget}
                     </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                     <span className="text-gray-500">Deadline</span>
                     <span className="font-semibold text-gray-900">
                        {project.deadline}
                     </span>
                  </div>
               </div>

               <div className="mt-5 flex gap-3">
                  <button
                     onClick={() => onEdit(project)}
                     className="flex-1 bg-gray-100 hover:bg-gray-200 text-sm py-2 rounded-lg font-medium"
                  >
                     Edit
                  </button>

                  <button
                     onClick={() => onDelete(project.id)}
                     className="flex-1 bg-red-100 hover:bg-red-200 text-sm py-2 rounded-lg font-medium text-red-600"
                  >
                     Delete
                  </button>
               </div>
            </div>
         ))}
      </div>
   );
};

export default ProjectList;