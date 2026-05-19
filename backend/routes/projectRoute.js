const express = require("express");
const router = express.Router();

const {
   createProject,
   getProjects,
   getSingleProject,
   updateProject,
   deleteProject
} = require(
   "../controllers/projectController"
);

const isAdmin =
   require("../middleware/roleCheckAdmin");


router.post(
   "/",
   createProject
);

router.get(
   "/",
   getProjects
);

router.get(
   "/:id",
   getSingleProject
);

router.put(
   "/:id",
   updateProject
);

router.delete(
   "/:id",
   isAdmin,
   deleteProject
);


module.exports = router;