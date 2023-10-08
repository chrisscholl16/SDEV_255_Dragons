const express = require('express');
const morgan = require('morgan');
const { render } = require('ejs');
const mongoose = require('mongoose');
const Course = require('./models/course')

//Express app
const app = express();

//Connecting to the  mongo database
const dbURI = 'mongodb+srv://dragons:Passw0rd@mongodb.ho5iekl.mongodb.net/mongodb?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
   .then((result) => app.listen(3000))//listening for request and starting the server
   .catch((err) => console.log(err));

//register view engine
app.set ('view engine', 'ejs'); //set lets us set some settings it looks into views folder for ejs files

//Middleware and static files

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
  });
  
//mongoose and mongo sandbox routes
//app.get('/add-course', (req, res) => {
   //const course = new Course({
      //name: 'Math',
      //desc: 'Adding, subtracting, multiplying and dividing',
      //subArea: 'Numbers',
      //numcred: '3'
   //});

   //course.save()
      //.then((result) => {
         //res.send(result)
      //})
      //.catch((err) => {
         //console.log(err);
      //});
//});

//app.get('/all-courses', (req, res) => {
   //Course.find()
      //.then((result) => {
         //res.send(result);
      //})
      //.catch((err) => {
         //console.log(err);
      //});
//});

//app.get('/single-course', (req, res) => {
   //Course.findById('65172157106402157c38d1a0')
      //.then((result) => {
        //res.send(result)
      //})
      //.catch((err) => {
        //console.log(err);
      //});
//});

//Routes

//Home page
app.get ('/' , (req, res) => {
    res.render('index' , { title : 'Home'}); 
});        

app.get ('/courses/add' , (req, res) => {
   res.render('addCourse' , { title : 'Add Course'}); 
});   

  

//Courses Pages
app.get ('/courses/Index' , (req, res) => { 
   Course.find().sort({ createdAt: -1 })
      .then((result) => {
         res.render('coursesIndex', { title: 'All Courses', courses: result })//geting all courses details and send result to course Index page
      })
      .catch((err) => {
         console.log(err);
      }); 
});

// Adding 1 course to DB
app.post('/courses/add', (req, res) => {
   const course = new Course(req.body);
   course.save()
      .then((result) => {
         res.redirect('/courses/Index');
      })
      .catch((err) => {
         console.log(err);
      })
});

//Getting one course details and send it to Course Details page
app.get('/courses/:id',  (req, res) => {
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
app.delete('/courses/:id', (req, res) => {
   const id = req.params.id;
   
   Course.findByIdAndDelete(id)
     .then(result => {
       res.json({ redirect: '/courses/Index' });
     })
     .catch(err => {
       console.log(err);
     });
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
