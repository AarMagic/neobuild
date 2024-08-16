const { validateProyect, deleteEmptyFields, validateId } = require("../helpers/validate");
const ProjectSchema = require("../models/ProjectSchema");

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

        ProjectSchema.findOneAndUpdate({_id: id}, params, {new: true}).then((project) => {
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

module.exports = {
    createProject,
    getProjects,
    getProject,
    deleteProject,
    editProject
}