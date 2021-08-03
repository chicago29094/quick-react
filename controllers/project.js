const express = require('express');
const router = express.Router();
const { requireToken } = require('../middleware/auth');
const Project = require('../models/project');

// User Project Routes
// Index Route - List all user quick-react projects
router.get('/:user_id', requireToken, async (req, res) => {
    try {
        console.log(req.user);
        const userProjects = await Project.findById(req.params.user_id)
        res.status(200).json(userProjects)
    } catch (error) {
        console.error(error)
    }
})

// Show Route - Show the requested quick-react project
router.get('/project/:project_id', requireToken, async (req, res) => {
    try {
        console.log(req.user);
        const project = await User.findOne({'project._id': req.params.project_id})
        res.status(200).json(project)
    } catch (error) {
        console.error
    }
})

// Create Route - Add a new user quick-react project
router.post('/', requireToken, async (req, res) => {
    try {
        console.log(req.user);
        const newProject = await Project.create(req.body, {new: true})
        res.status(201).json(newProject)
    } catch (error) {
        console.error(error)
    }
})

// Delete Route - Delete a user quick-react project 
router.delete('/:project_id', requireToken, async (req, res) => {
    try {
        console.log(req.user);
        const user = await Project.findOne({'project._id': req.params.project_id})

        res.status(204).json(newUser)

    } catch (error) {
        console.error(error)
    }
})

// Update Route
router.put('/:project_id', requireToken, async (req, res) => {
    try {
        console.log(req.user);
        const project = await Project.findOne({'project._id': req.params.project_id})
        book.set(req.body)
        user.save()
        const newUser = await User.findByIdAndUpdate(user._id, user, {new: true})
        res.status(201).json(newUser)
    } catch (error) {
        console.error(error)
    }
})


module.exports = router