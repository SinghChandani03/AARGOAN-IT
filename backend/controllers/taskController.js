const Task = require("../models/taskModel");
const Project = require("../models/projectModel");

const createTask = async (req, res) => {

   try {

      const { project_id } = req.body;

      const project = await Project.findByPk(project_id);

      if (!project) {
         return res.status(404).json({
            success: false,
            message: "Project not found"
         });
      }

      const task = await Task.create(req.body);

      return res.status(201).json({
         success: true,
         message: "Task created successfully",
         data: task
      });

   } catch (error) {
      return res.status(500).json({
         success: false,
         message: error.message
      });
   }
};

const getTasks = async (req, res) => {

   try {
      const tasks =
         await Task.findAll({
            include: [
               {
                  model: Project
               }
            ],

            order: [["createdAt", "DESC"]]
         });

      const updatedTasks =
         tasks.map((task) => {

            const overdue =
               task.status !== "COMPLETED" &&
               new Date(task.due_date)
               < new Date();

            return {
               ...task.toJSON(),
               overdue
            };
         });

      return res.status(200).json({
         success: true,
         data: updatedTasks
      });

   } catch (error) {
      return res.status(500).json({
         success: false,
         message: error.message
      });
   }
};

const getSingleTask = async (
   req,
   res
) => {

   try {
      const task =
         await Task.findByPk(
            req.params.id,
            {
               include: [
                  {
                     model: Project
                  }
               ]
            }
         );

      if (!task) {
         return res.status(404).json({
            success: false,
            message: "Task not found"
         });
      }

      return res.status(200).json({
         success: true,
         data: task
      });

   } catch (error) {
      return res.status(500).json({
         success: false,
         message: error.message
      });
   }
};

const updateTask = async (
   req,
   res
) => {

   try {
      const task =
         await Task.findByPk(
            req.params.id
         );

      if (!task) {
         return res.status(404).json({
            success: false,
            message: "Task not found"
         });
      }

      if (task.status === "COMPLETED") {
         return res.status(400).json({
            success: false,
            message:
               "Completed tasks cannot be edited"
         });
      }
      await task.update(req.body);

      return res.status(200).json({
         success: true,
         message:
            "Task updated successfully",
         data: task
      });

   } catch (error) {
      return res.status(500).json({
         success: false,
         message: error.message
      });
   }
};

const deleteTask = async (
   req,
   res
) => {

   try {
      const task =
         await Task.findByPk(
            req.params.id
         );

      if (!task) {
         return res.status(404).json({
            success: false,
            message: "Task not found"
         });
      }

      await task.destroy();

      return res.status(200).json({
         success: true,
         message:
            "Task deleted successfully"
      });

   } catch (error) {
      return res.status(500).json({
         success: false,
         message: error.message
      });
   }
};

module.exports = {
   createTask,
   getTasks,
   getSingleTask,
   updateTask,
   deleteTask
};