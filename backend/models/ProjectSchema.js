const { Schema, model } = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const ProjectSchema = Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    technologies: {
        type: [String],
        required: true
    },
    keys: {
        type: [String],
        required: false
    },
    images: {
        type: [String],
        required: false
    },
    repository: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

ProjectSchema.index({ title: 1, date: -1 });
ProjectSchema.plugin(mongoosePaginate)
module.exports = model("Project", ProjectSchema)