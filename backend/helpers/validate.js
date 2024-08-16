const validator = require('validator');

const validateProyect = (params) => {
    let errors = [];
    const validateTitle = !validator.isEmpty(params.title) &&
        validator.isLength(params.title, { min: 5 });

    const validateContent = !validator.isEmpty(params.content) &&
        validator.isLength(params.content, { min: 5 });

    const validateTechnologies = Array.isArray(params.technologies) && params.technologies.length > 0;


    if (!validateTitle) {
        errors.push("The title must be at least 5 characters long")
    }
    if (!validateContent) {
        errors.push("The content must be at least 5 characters long")
    }
    if (!validateTechnologies) {
        errors.push("You must select at least 1 technology")
    }

    return errors.length > 0 ? errors : null
}

const deleteEmptyFields = (params) => {
    Object.keys(params).forEach(key => {
        if (Array.isArray(params[key])&& params[key].length === 0) {
            delete params[key]
        }
    });
};

module.exports = {
    validateProyect,
    deleteEmptyFields
}