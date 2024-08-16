const express = require("express");
const ProjectController = require("../controllers/ProjectController");
const router = express.Router();

router.post("/create", ProjectController.create)

module.exports = router