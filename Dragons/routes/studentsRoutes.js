const express = require('express');
const studentsController = require('../controllers/studentsControllers')

const router = express.Router();   
 
//Student retrieving his schedule
router.get('/showSchedule/:id', studentsController.student_showShedule_get);

 //Student adding course to schedule
 router.post('/addToSchedule', studentsController.course_addToSchedule_post);




 

  module.exports = router;