const express = require("express");
const ProjectController = require("../controllers/ProjectController");
const router = express.Router();

router.get("/projects", ProjectController.getProjects);
router.get("/project/:id", ProjectController.getProject);

router.post("/create", ProjectController.createProject);

router.put("/project/:id", ProjectController.editProject);

router.delete("/project/:id", ProjectController.deleteProject);

module.exports = router