const mongoose = require('../db/connection');

const ProjectSchema = new mongoose.Schema({
    project_directory: { type: String, required: true},
    project_name: { type: String, required: true},
    project_description: { type: String, required: false},
    project_markup: { type: String, required: false },
    project_filepath: { type: String, required: false },
    project_archive: { type: Buffer, required: false },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;

