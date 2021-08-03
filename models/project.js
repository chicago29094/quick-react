const mongoose = require('../db/connection');

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true},
    author: { type: String, required: true},
    review: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = ProjectSchema;
