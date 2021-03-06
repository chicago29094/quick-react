const express = require('express');
const router = express.Router();
const { requireToken } = require('../middleware/auth');
const Project = require('../models/project');
const {NaryNode, NaryTree} = require('../utility/NaryTree');
const {QuickReactElement, QuickReact} = require('../utility/QuickReact');
const fs = require('fs');
const path = require('path');
var AdmZip = require('adm-zip');



let errorFlag=false;
let errorMessage="";

/**
 * User Project Routes: Index Route: List all quick-react projects for logged in user
 */
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

/**
 * Show Route: Show the requested quick-react project for the logged in user
 */
router.get('/:project_id', requireToken, async (req, res) => {

    errorFlag=false;
    if ( (req.user===undefined) || (req.user._id===undefined)) {
        errorMessage="An invalid or incomplete request has been submitted to the API."; 
        errorFlag=true;
    }    

    if ( (req.params.project_id===undefined) || (req.params.project_id.length!=24) )  {
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

/**
 * Create Route: Add a new quick-react project to the user's account
 */
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

    if ( (req.body.project_directory===undefined) || (req.body.project_directory===null) ) {
        errorMessage="Projects need to include a project directory.";  
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
        project_directory: req.body.project_directory,
        project_name: req.body.project_name,
        project_description: req.body.project_description,
        project_markup: req.body.project_markup,
        project_filepath: req.body.project_filepath,
        project_archive: req.body.project_archive,
        user_id: req.user._id
    }

    //console.log(projectRecord);

    try {
        const newProject = await Project.create(projectRecord)
        res.status(201).json(newProject)
    } catch (error) {
        console.error(error)
        return res.status(503).json({"ErrorMessage": "Your request could not be processed."})    
    }
})

/**
 * Delete Route: Delete a user quick-react project 
 */
router.delete('/:project_id', requireToken, async (req, res) => {

    errorFlag=false;
    if ( (req.user===undefined) || (req.user._id===undefined)) {
        errorMessage="An invalid or incomplete request has been submitted to the API."; 
        errorFlag=true;
    }    

    if ( (req.params.project_id===undefined) || (req.params.project_id.length!=24) )  {
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

/**
 * Update Route: Update the information and code for a Quick-React project.
 */
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

        if ( (req.body.project_directory===undefined) || (req.body.project_directory===null) ) {
            errorMessage="Projects need to include a project directory.";  
            errorFlag=true;
        }

        if ( (req.body.project_name===undefined) || (req.body.project_name===null) ) {
            errorMessage="Projects need to include a project name.";  
            errorFlag=true;
        }

        if ( (req.params.project_id===undefined) || (req.params.project_id.length!=24) )  {
            errorMessage="An invalid or incomplete request has been submitted to the API."; 
            errorFlag=true;
        }
         
        if (errorFlag===true) {
            return res.status(400).json({"ErrorMessage": errorMessage})    
        }    
    
        const projectRecord = {
            project_directory: req.body.project_directory,
            project_name: req.body.project_name,
            project_description: req.body.project_description,
            project_markup: req.body.project_markup,
            project_filepath: req.body.project_filepath,
            project_archive: req.body.project_archive,
        }

        const updatedProject = await Project.findOneAndUpdate( { "_id": req.params.project_id, "user_id": req.user._id}, projectRecord, {new: true, useFindAndModify: false } );
        //console.log(updatedProject);
        if ( (updatedProject===undefined) || (updatedProject===null) ) {
            res.status(400).json({"ErrorMessage": `project ${req.params.project_id} no match`})  
        }
        else if (updatedProject) {
            res.status(200).json({"Message": `project ${req.params.project_id} successfully updated`});
        }
    } catch (error) {
        console.error(error);
        return res.status(503).json({"ErrorMessage": "Your request could not be processed."});
    }
})

/**
 * Download Route: Download the directories and files for a Quick-React project in ZIP archive format
 */
router.put('/download/:project_id', requireToken, async (req, res) => {
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

        if ( (req.body.project_directory===undefined) || (req.body.project_directory===null) ) {
            errorMessage="Projects need to include a project directory.";  
            errorFlag=true;
        }

        if ( (req.body.project_name===undefined) || (req.body.project_name===null) ) {
            errorMessage="Projects need to include a project name.";  
            errorFlag=true;
        }

        if ( (req.params.project_id===undefined) || (req.params.project_id.length!=24) )  {
            errorMessage="An invalid or incomplete request has been submitted to the API."; 
            errorFlag=true;
        }
         
        if (errorFlag===true) {
            return res.status(400).json({"ErrorMessage": errorMessage})    
        }    
    
        const projectRecord = {
            project_directory: req.body.project_directory,
            project_name: req.body.project_name,
            project_description: req.body.project_description,
            project_markup: req.body.project_markup,
            project_filepath: req.body.project_filepath,
            project_archive: req.body.project_archive,
        }

        const updatedProject = await Project.findOneAndUpdate( { "_id": req.params.project_id, "user_id": req.user._id}, projectRecord, {new: true, useFindAndModify: false } );
        // console.log(updatedProject);
        if ( (updatedProject===undefined) || (updatedProject===null) ) {
            res.status(400).json({"ErrorMessage": `project ${req.params.project_id} no match`})  
        }

        const quickReact = new QuickReact();
        const tree = quickReact.parseMarkup(req.body.project_markup);
        userID= '' + req.user._id;
        projectID = '' + req.params.project_id;
        filename = '' + `${projectID}.zip`;
        quickReact.generateProjectFiles(userID, projectID, tree);

        res.status(200);
        res.setHeader('Content-Disposition', 'attachment; filename=' + filename);
        res.setHeader('Content-Transfer-Encoding', 'binary');
        res.setHeader('Content-Type', 'application/octet-stream');

        const zipFilepath=path.join(__dirname, '..', 'projects', userID, 'ziparchives', `${projectID}.zip`);
        console.log(zipFilepath);
        res.sendFile(zipFilepath)
      
    } catch (error) {
        console.error(error);
        return res.status(503).json({"ErrorMessage": "Your request could not be processed."});
    }
})


module.exports = router