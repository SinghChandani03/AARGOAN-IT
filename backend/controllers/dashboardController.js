const { Op } = require("sequelize");
const Project = require("../models/projectModel");
const Task = require("../models/taskModel");

const getDashboard = async (
   req,
   res
) => {

   try {

      const totalProjects = await Project.count();
      const totalTasks = await Task.count();
      const overdueTasks =
         await Task.count({
            where: {
               due_date: {
                  [Op.lt]: new Date()
               },

               status: {
                  [Op.ne]: "COMPLETED"
               }
            }
         });

      const completedTasks =
         await Task.count({
            where: {
               status: "COMPLETED"
            }
         });

      const completedPercentage =
         totalTasks === 0
            ? 0
            : (
               completedTasks / totalTasks
            ) * 100;

      const recentActivity =
         await Task.findAll({
            limit: 5,

            order: [
               ["createdAt", "DESC"]
            ]
         });


      return res.status(200).json({
         success: true,

         data: {
            totalProjects,
            totalTasks,
            overdueTasks,
            completedPercentage,
            recentActivity
         }
      });

   } catch (error) {

      return res.status(500).json({
         success: false,
         message: error.message
      });
   }
};

module.exports = {
   getDashboard
};