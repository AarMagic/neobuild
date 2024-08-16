const { Schema, model } = require("mongoose");

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
    repositories: {
        type: [String],
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

ProjectSchema.index({ title: 1, date: -1 });

module.exports = model("Project", ProjectSchema)