const Project = require("../models/projectModel");
const Task = require("../models/taskModel");

const createProject = async (req, res) => {

   try {

      const project = await Project.create(req.body);

      return res.status(201).json({
         success: true,
         message: "Project created successfully",
         data: project
      });

   } catch (error) {
      return res.status(500).json({
         success: false,
         message: error.message
      });
   }
};

const getProjects = async (req, res) => {

   try {
      const projects =
         await Project.findAll({
            include: [
               {
                  model: Task
               }
            ],

            order: [["createdAt", "DESC"]]
         });

      return res.status(200).json({
         success: true,
         data: projects
      });

   } catch (error) {

      return res.status(500).json({
         success: false,
         message: error.message
      });
   }
};

const getSingleProject = async (
   req,
   res
) => {

   try {
      const project =
         await Project.findByPk(
            req.params.id,
            {
               include: [
                  {
                     model: Task
                  }
               ]
            }
         );

      if (!project) {
         return res.status(404).json({
            success: false,
            message: "Project not found"
         });
      }

      return res.status(200).json({
         success: true,
         data: project
      });

   } catch (error) {
      return res.status(500).json({
         success: false,
         message: error.message
      });
   }
};

const updateProject = async (
   req,
   res
) => {

   try {
      const project =
         await Project.findByPk(
            req.params.id
         );

      if (!project) {
         return res.status(404).json({
            success: false,
            message: "Project not found"
         });
      }

      await project.update(req.body);

      return res.status(200).json({
         success: true,
         message:
            "Project updated successfully",
         data: project
      });

   } catch (error) {
      return res.status(500).json({
         success: false,
         message: error.message
      });
   }
};

const deleteProject = async (
   req,
   res
) => {

   try {
      const project =
         await Project.findByPk(
            req.params.id
         );

      if (!project) {
         return res.status(404).json({
            success: false,
            message: "Project not found"
         });
      }

      await project.destroy();

      return res.status(200).json({
         success: true,
         message:
            "Project deleted successfully"
      });

   } catch (error) {
      return res.status(500).json({
         success: false,
         message: error.message
      });
   }
};

module.exports = {
   createProject,
   getProjects,
   getSingleProject,
   updateProject,
   deleteProject
};