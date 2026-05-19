const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Project = sequelize.define(
   "Project",
   {
      title: {
         type: DataTypes.STRING,
         allowNull: false
      },

      description: {
         type: DataTypes.TEXT,
         allowNull: false
      },

      budget: {
         type: DataTypes.DECIMAL(10, 2),
         allowNull: false
      },

      deadline: {
         type: DataTypes.DATEONLY,
         allowNull: false
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
      tableName: "projects",
      timestamps: true,
   }
);

module.exports = Project;