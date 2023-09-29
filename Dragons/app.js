const express = require('express');
const morgan = require('morgan');
const { render } = require('ejs');

//Express app
const app = express();

//register view engine
app.set ('view engine', 'ejs'); //set lets us set some settings it looks into views folder for ejs files

//Middleware and static files

app.use(express.static('public'));

app.use(morgan('dev'));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
  });
  



//listen for request
app.listen(3000); //starting the server
 

//Routes

//Home page
app.get ('/' , (req, res) => {
    res.render('index' , { title : 'Home'}); 
});                                       

//Courses Pages
app.get ('/courses' , (req, res) => {  
   res.render('courses' , { title : 'Courses'}); 
});

app.get ('/courseDetails' , (req, res) => {  
    res.render('courseDetails' , { title : 'Course Details'}); 
 });

 app.get ('/coursesIndex' , (req, res) => {  
   res.render('coursesIndex' , { title : 'Courses Index'}); 
});

//teachers page
app.get ('/teachers' , (req, res) => {  
    res.render('teachers' , { title : 'Teachers'}); 
 });

//students page
app.get ('/students' , (req, res) => {  
    res.render('students' , { title : 'Students'}); 
 });


 // 404 page
 app.use((req, res) => {    
   res.status(404).render('404' , { title : '404'}); 
});
