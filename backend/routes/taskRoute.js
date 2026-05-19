const express = require("express");
const router = express.Router();

const {
   createTask,
   getTasks,
   getSingleTask,
   updateTask,
   deleteTask
} = require(
   "../controllers/taskController"
);

const isAdmin = require("../middleware/roleCheckAdmin");

router.post(
   "/",
   createTask
);

router.get(
   "/",
   getTasks
);

router.get(
   "/:id",
   getSingleTask
);

router.put(
   "/:id",
   updateTask
);

router.delete(
   "/:id",
   isAdmin,
   deleteTask
);


module.exports = router;