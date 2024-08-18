const { validateProyect, deleteEmptyFields, validateId, validateString } = require("../helpers/validate");
const ProjectSchema = require("../models/ProjectSchema");
const fs = require("fs");
const allowedExtensions = ['.png', '.jpg', '.jpeg'];
const path = require('path');

const getProjects = async (req, res) => {
    try {
        let page = Number.parseInt(req.query.page)
        page ??= 1;
        if (page < 1) {
            page = 1;
        }
        const options = {
            page,
            limit: 3
        };
        const data = await ProjectSchema.paginate({}, options);
        return res.status(200).send({
            status: "success",
            projects: data
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Failed to retrieve projects",
            error: error.message
        })
    }
}

const getProject = async (req, res) => {
    try {
        const id = req.params.id;

        let idValidated = validateId(id);

        if (!idValidated) {
            throw new Error("ID is not valid")
        }

        const project = await ProjectSchema.findById(id);

        if (!project) {
            return res.status(404).json({
                status: "error",
                message: "Project not found"
            });
        }

        return res.status(200).json({
            status: "success",
            project
        });


    } catch (error) {
        return res.status(500).json({
            status: "error",
            error: error.message
        })
    }

}

const createProject = async (req, res) => {
    let params = req.body;
    deleteEmptyFields(params)
    const errors = validateProyect(params)

    if (errors) {
        return res.status(400).json({
            status: "error",
            error: errors
        })
    }

    const project = new ProjectSchema(params);
    deleteEmptyFields(project._doc)
    try {
        const savedProject = await project.save();
        return res.status(201).json({
            status: "success",
            savedProject
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "The project has not been saved",
            error: error.message
        })
    }
}

const editProject = (req, res) => {
    try {
        const id = req.params.id;
        let params = req.body;

        let idValidated = validateId(id);

        if (!idValidated) {
            throw new Error("ID is not valid");
        }

        validateProyect(params);

        ProjectSchema.findOneAndUpdate({ _id: id }, params, { new: true }).then((project) => {
            return res.status(200).json({
                status: "success",
                project
            })
        }).catch((error) => {
            return res.status(400).json({
                status: "error",
                error: error.message
            })
        })
    } catch (error) {
        return res.status(400).json({
            status: "error",
            error: error.message
        })
    }
}

const deleteProject = (req, res) => {
    try {
        const id = req.params.id;

        let idValidated = validateId(id);

        if (!idValidated) {
            throw new Error("ID is not valid")
        }

        ProjectSchema.findOneAndDelete({ _id: id }).then((project) => {
            return res.status(200).json({
                status: "success",
                project
            })
        }).catch((error) => {
            return res.status(400).json({
                status: "error",
                error: error.message
            })
        })

    } catch (error) {
        return res.status(500).json({
            status: "error",
            error: error
        })
    }
}

const searchProjects = (req, res) => {
    try {
        const searchValue = req.params.searchValue
        const searchValidated = validateString(searchValue);
        if (!searchValidated) {
            throw new Error("Please enter a valid search");
        }

        ProjectSchema.find(
            {
                "$or": [
                    { "title": { "$regex": searchValidated, "$options": "i" } },
                    { "content": { "$regex": searchValidated, "$options": "i" } },
                    { "keys": { "$regex": searchValidated }, "options": "i" }
                ]
            }
        ).sort({ date: -1 })
            .exec().then(projects => {
                return res.status(200).json({
                    status: "success",
                    projects
                })
            }).catch(error => {
                return res.status(400).json({
                    status: "error",
                    error
                })
            })

    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: error.message
        })
    }
}

const uploadImages = async (req, res) => {
    try {
        const id = req.params.id;
        let idValidated = validateId(id);

        if (!idValidated) {
            throw new Error("ID is not valid")
        }

        const project = await ProjectSchema.findById(id)

        if (!project) {
            throw new Error("The project does not exist")
        }

        const files = req.files;

        if (!files) {
            throw new Error("No file uploaded")
        }

        if (project.images.length + req.files.length > 4) {
            throw new Error("The project can have at most 4 images.")
        }

        files.map(file => {
            const ext = path.extname(file.originalname).toLowerCase()
            if (!allowedExtensions.includes(ext)) {
                throw new Error("The extension is invalid")
            }
        })

        project.images = project.images || [];

        const fileNames = files.map(file => file.filename)

        let imagesArray = project.images.concat(fileNames)

        project.images = imagesArray;

        await project.save();

        return res.status(200).json({
            status: "200",
            project
        })
    } catch (error) {
        req.files.map(file => {
            console.log(file)
            fs.unlink(file.path, (error) => {
                if (error) {
                    console.error("Error deleting file", error)
                    return res.status(400).json({
                        status: "error",
                        message: "Error deleting file"
                    })
                }
            })
        })
        return res.status(400).json({
            status: "error",
            message: error.message
        })
    }
}

const image = (req, res) => {
    try {
        const image = req.params.name;
        if (!image) {
            throw new Error("The name of the image has not been indicated")
        }

        const imageValidated = validateString(image)

        if (!imageValidated) {
            throw new Error("Image must be at least 3 characters long")
        }

        const url = `./images/projects/${imageValidated}`

        fs.access(url, fs.constants.F_OK, (error) => {
            if (error) {
                return res.status(400).json({
                    status: "error",
                    message: "The image does not exists"
                })
            }
            return res.sendFile(path.resolve(url))
        })
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: error.message
        })
    }
}

module.exports = {
    createProject,
    getProjects,
    getProject,
    deleteProject,
    editProject,
    searchProjects,
    uploadImages,
    image
}