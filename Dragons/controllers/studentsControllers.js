const Student = require('../models/Student');




 const course_addToSchedule_post = (req, res) => {
   console.log(req.body);
   console.log(req.body.courseId);
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
          res.redirect('/courses/coursesIndex');
       })
       .catch((err) => {
          console.log(err);
       })
 };

module.exports={

    
        course_addToSchedule_post
}