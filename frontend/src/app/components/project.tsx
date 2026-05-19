"use client";

import { useState } from "react";
import useProjects from "../hooks/useProject";
import ProjectList from "../components/project-list";
import CreateModal from "../components/create-model";
import { Project } from "../types/projects";
import { deleteProjectApi } from "../services/projectService";
import { toast } from "react-hot-toast";

const Projects = () => {
   const {
      projects,
      getProjects,
      loading,
      error
   } = useProjects();
   const [openModal, setOpenModal] = useState(false);
   const [mode, setMode] = useState<"CREATE" | "EDIT">("CREATE");
   const [selectedProject, setSelectedProject] = useState<Project | null>(null);

   const handleCreate = () => {
      setMode("CREATE");
      setSelectedProject(null);
      setOpenModal(true);
   };

   const handleEdit = (project: Project) => {
      setMode("EDIT");
      setSelectedProject(project);
      setOpenModal(true);
   };

   const handleDelete = async (id: number) => {
      try {
         await deleteProjectApi(id);
         toast.success("Project deleted successfully");
         await getProjects();
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
      <div className="min-h-screen bg-gray-100">
         <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 md:p-6 mb-6 flex justify-between items-center">

               <div>
                  <h1 className="text-xl md:text-1xl font-bold text-gray-900">
                     Project Dashboard
                  </h1>
               </div>

               <button
                  onClick={handleCreate}
                  className="bg-black text-white px-5 py-2 rounded-xl text-sm hover:bg-gray-800"
               >
                  + Create
               </button>

            </div>

            <ProjectList
               projects={projects}
               onEdit={handleEdit}
               onDelete={handleDelete}
            />

            <CreateModal
               open={openModal}
               onClose={() => setOpenModal(false)}
               mode={mode}
               entity="PROJECT"
               project={selectedProject}
               refreshProjects={getProjects}
            />

         </div>
      </div>
   );
};

export default Projects;