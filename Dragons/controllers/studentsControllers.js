const Student = require('../models/Student');
const Course = require('../models/course');

//Getting course details

const student_courseDetails_get = (req, res) => {
  const id = req.params.id;   
  Course.findById(id)
   .then(result => {
     res.render('studentCourseDetails', { course: result, title: 'Student Course Details' });
   })
   .catch(err => {
     console.log(err);
   });
};




// conrtoller to add course to student schedule
 const course_addToSchedule_post = (req, res) => {  
  const id = req.params.id;     
   const course = req.body   
  Student.updateOne(
      { _id: course.studentId },
      { $push: {schedule:
         [{ courseId: course.courseId,
           courseName: course.name, 
           courseDescription: course.description, 
           courseSubArea: course.subArea, 
           courseCredit: course.credits }]} }
   )
       .then((result) => {
         // res.redirect('/courses/coursesIndex');
         res.redirect('/students/showSchedule/'+course.studentId);
       })
       .catch((err) => {
          console.log(err);
       })
 };

 //controller to show students schedule
 const  student_showShedule_get = (req, res) => {  
   const id = req.params.id;   
   Student.findById(id)
    .then(result => {
      res.render('./studentSchedule', { studentDetails: result, title: 'Student Schedule Details' });
    })
    .catch(err => {
      console.log(err);
    });
};

//Deleting one course
const course_in_schedule_delete = (req, res) => {
  console.log(req.params);
   const id = req.params.id;
   
   Student.updateOne({ _id: id },{ $pull: { schedule: {courseId:req.body.courseId} } }) 
   
   .then((result) => {    
    res.redirect('/students/showSchedule/'+id);
 })
     .catch(err => {
       console.log(err);
     });
 }





module.exports={

         student_courseDetails_get,
        course_addToSchedule_post,
        student_showShedule_get,
        course_in_schedule_delete
}