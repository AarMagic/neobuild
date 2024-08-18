const express = require("express");
const ProjectController = require("../controllers/ProjectController");
const multer = require("multer");
const router = express.Router();

const projectsStorage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, './images/projects')
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.trim();
        const newName = fileName.replace(/\s+/g, '_');
        cb(null, "project"+Date.now()+newName)
    }
})

const uploadProject = multer({storage: projectsStorage})

router.get("/projects", ProjectController.getProjects);
router.get("/project/:id", ProjectController.getProject);
router.get("/search/:searchValue", ProjectController.searchProjects);
router.get("/image/:name", ProjectController.image)

router.post("/create", ProjectController.createProject);

router.post("/upload-images/:id", [uploadProject.array("files", 4)], ProjectController.uploadImages);

router.put("/project/:id", ProjectController.editProject);

router.delete("/project/:id", ProjectController.deleteProject);

module.exports = router;