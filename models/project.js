/*
 * Load Required Dependencies
 */
const mongoose = require('../db/connection');

/*
 * MongoDB / Mongoose Data Schema for Quick-React Projects
 */
const ProjectSchema = new mongoose.Schema({
    project_directory: { type: String, required: true},
    project_name: { type: String, required: true},
    project_description: { type: String, required: false},
    project_markup: { type: String, required: false },
    project_filepath: { type: String, required: false },
    project_archive: { type: Buffer, required: false },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

/*
 * Create a reference pointer to export to other modules
 */
const Project = mongoose.model('Project', ProjectSchema);

/*
 * Export project reference pointer
 */
module.exports = Project;

