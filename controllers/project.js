const express = require('express');
const router = express.Router();
const { requireToken } = require('../middleware/auth');
const Project = require('../models/project');


let errorFlag=false;
let errorMessage="";

// User Project Routes
// Index Route - List all quick-react projects for logged in user
router.get('/', requireToken, async (req, res) => {

    errorFlag=false;
    if ( (req.user===undefined) || (req.user._id===undefined)) {
        errorMessage="An invalid or incomplete request has been submitted to the API."; 
        errorFlag=true;
    }    
    if (errorFlag===true) {
        return res.status(400).json({"ErrorMessage": errorMessage})    
    }    

    try {
        const userProjects = await Project.find( {'user_id': req.user._id } )
        res.status(200).json(userProjects)
    } catch (error) {
        console.error(error)
        return res.status(503).json({"ErrorMessage": "Your request could not be processed."})           
    }
})

// Show Route - Show the requested quick-react project for the logged in user
router.get('/:project_id', requireToken, async (req, res) => {

    errorFlag=false;
    if ( (req.user===undefined) || (req.user._id===undefined)) {
        errorMessage="An invalid or incomplete request has been submitted to the API."; 
        errorFlag=true;
    }    

    if (errorFlag===true) {
        return res.status(400).json({"ErrorMessage": errorMessage})    
    }    

    try {
        const project = await Project.findOne( {'_id': req.params.project_id, 'user_id': req.user._id} )
        res.status(200).json(project)
    } catch (error) {
        console.error
        return res.status(503).json({"ErrorMessage": "Your request could not be processed."})           
    }
})

// Create Route - Add a new user quick-react project
router.post('/', requireToken, async (req, res) => {
        
    errorFlag=false;
    if ( (req.user===undefined) || (req.user._id===undefined)) {
        errorMessage="An invalid or incomplete request has been submitted to the API."; 
        errorFlag=true;
    }    

    if ( (req.body===undefined) ) {
        errorMessage="An invalid or incomplete request has been made to the API."; 
        errorFlag=true;
    }
    if ( (req.body.project_name===undefined) || (req.body.project_name===null) ) {
        errorMessage="Projects need to include a project name.";  
        errorFlag=true;
    }
 
    if (errorFlag===true) {
        return res.status(400).json({"ErrorMessage": errorMessage})    
    }    

    const projectRecord = {
        project_name: req.body.project_name,
        project_description: req.body.project_description,
        project_markup: req.body.project_markup,
        project_filepath: req.body.project_filepath,
        project_archive: req.body.project_archive,
        user_id: req.user._id
    }

    console.log(projectRecord);

    try {
        const newProject = await Project.create(projectRecord)
        res.status(201).json(newProject)
    } catch (error) {
        console.error(error)
        return res.status(503).json({"ErrorMessage": "Your request could not be processed."})    
    }
})

// Delete Route - Delete a user quick-react project 
router.delete('/:project_id', requireToken, async (req, res) => {

    errorFlag=false;
    if ( (req.user===undefined) || (req.user._id===undefined)) {
        errorMessage="An invalid or incomplete request has been submitted to the API."; 
        errorFlag=true;
    }    

    if (errorFlag===true) {
        return res.status(400).json({"ErrorMessage": errorMessage})    
    } 

    try {
        // console.log(req.user);
        const deletedProject = await Project.deleteOne({'_id': req.params.project_id, 'user_id': req.user._id},
            (error, result) => {
                if (error) {
                    res.status(400).json({"ErrorMessage": `${error}`})  
                }
                else if (result.ok===1) {
                    res.status(200).json({"Message": `project ${req.params.project_id} successfully deleted`});
                }
                else {
                    res.status(400).json({"ErrorMessage": `project ${req.params.project_id} no match`});
                }
            }        
        )
    } catch (error) {
        console.error(error)
        return res.status(503).json({"ErrorMessage": "Your request could not be processed."})    
    }
})

// Update Route
router.put('/:project_id', requireToken, async (req, res) => {
    try {

        errorFlag=false;
        if ( (req.user===undefined) || (req.user._id===undefined)) {
            errorMessage="An invalid or incomplete request has been submitted to the API."; 
            errorFlag=true;
        }    
    
        if ( (req.body===undefined) ) {
            errorMessage="An invalid or incomplete request has been made to the API."; 
            errorFlag=true;
        }
        if ( (req.body.name===undefined) || (req.body.name===null) ) {
            errorMessage="Projects need to include a project name.";  
            errorFlag=true;
        }
     
        if (errorFlag===true) {
            return res.status(400).json({"ErrorMessage": errorMessage})    
        }    
    
        const projectRecord = {
            project_name: req.body.project_name,
            project_description: req.body.project_description,
            project_markup: req.body.project_markup,
            project_filepath: req.body.project_filepath,
            project_archive: req.body.project_archive,
            user_id: req.user._id
        }
                
        const updatedProject = await User.findByIdAndUpdate( { "_id": req.params.project_id, "user_id": req.user._id}, {new: true} );
        res.status(201).json(updatedProject);
    } catch (error) {
        console.error(error);
        return res.status(503).json({"ErrorMessage": "Your request could not be processed."});
    }
})


module.exports = router