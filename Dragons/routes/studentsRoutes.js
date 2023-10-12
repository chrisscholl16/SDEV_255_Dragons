const express = require('express');
const studentsController = require('../controllers/studentsControllers')

const router = express.Router();   
 

 //Student adding course to schedule
 router.post('/addToSchedule', studentsController.course_addToSchedule_post);
 

  module.exports = router;