const mongoose = require('../db/connection');

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true},
    author: { type: String, required: true},
    review: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;

