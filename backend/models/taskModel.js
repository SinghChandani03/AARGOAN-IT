const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Project = require("../models/projectModel");

const Task = sequelize.define(
   "Task",
   {
      title: {
         type: DataTypes.STRING,
         allowNull: false
      },

      assigned_user: {
         type: DataTypes.STRING,
         allowNull: false
      },

      due_date: {
         type: DataTypes.DATEONLY,
         allowNull: false
      },

      priority: {
         type: DataTypes.ENUM(
            "LOW",
            "MEDIUM",
            "HIGH"
         ),

         allowNull: false,
         defaultValue: "MEDIUM"
      },

      status: {
         type: DataTypes.ENUM(
            "PENDING",
            "IN_PROGRESS",
            "COMPLETED"
         ),

         allowNull: false,
         defaultValue: "PENDING"
      }
   },
   {
      tableName: "tasks",
      timestamps: true,
   }
);

Project.hasMany(Task, {
   foreignKey: "project_id",
   onDelete: "CASCADE"
});

Task.belongsTo(Project, {
   foreignKey: "project_id"
});


module.exports = Task;