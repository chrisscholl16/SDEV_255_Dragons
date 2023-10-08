const express = require('express');
//const blogController = require('../controllers/blogController')
const Course = require('../models/course')

const router = express.Router();
 
   
 
 //Courses Pages
 router.get ('/add' , (req, res) => {
    res.render('addCourse' , { title : 'Add Course'}); 
 });   

 //getting all courses list
 router.get ('/coursesIndex' , (req, res) => { 
    Course.find().sort({ createdAt: -1 })
       .then((result) => {
          res.render('coursesIndex', { title: 'All Courses', courses: result })//geting all courses details and send result to course Index page
       })
       .catch((err) => {
          console.log(err);
       }); 
 });
 
 // Adding 1 course to DB
 router.post('/add', (req, res) => {
    const course = new Course(req.body);
    course.save()
       .then((result) => {
          res.redirect('./coursesIndex');
       })
       .catch((err) => {
          console.log(err);
       })
 });
 
 //Getting one course details and send it to Course Details page
 router.get('/:id',  (req, res) => {
    const id = req.params.id;   
    Course.findById(id)
     .then(result => {
       res.render('courseDetails', { course: result, title: 'Course Details' });
     })
     .catch(err => {
       console.log(err);
     });
 });
 
 //Deleting one course
 router.delete('/:id', (req, res) => {
    const id = req.params.id;
    
    Course.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: './coursesIndex' });
      })
      .catch(err => {
        console.log(err);
      });
  });
 

  module.exports = router;