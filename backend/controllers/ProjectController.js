const { validateProyect, deleteEmptyFields } = require("../helpers/validate");
const ProjectSchema = require("../models/ProjectSchema");

const create = async (req, res) => {
    let params = req.body;
    //Eliminar parametros vaios
    deleteEmptyFields(params)
    
    const errors = validateProyect(params)
    
    if (errors) {
        return res.status(400).json({
            status: "error",
            errors
        })
    }
    
    const project = new ProjectSchema(params);
    deleteEmptyFields(project._doc)
    try {
        // const savedProject = await project.save();
        return res.status(201).json({
            status: "success",
            project
            // project: savedProject
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "The project has not been saved",
            error: error.message
        })
    }
}

module.exports = {
    create
}