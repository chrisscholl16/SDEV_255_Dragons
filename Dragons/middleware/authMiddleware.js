const jwt = require('jsonwebtoken');
const sjwt = require('jsonwebtoken');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'dragons secret', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};



// check current teacher
const checkTeacher = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, 'dragons secret', async (err, decodedToken) => {
        if (err) {
          res.locals.teacher = null;
          next();
        } else {
          let teacher = await Teacher.findById(decodedToken.id);
          res.locals.teacher = teacher;// here we made the teacher object saved and available in locals for every view
         // console.log(res.locals.teacher);
          next();
        }
      });
    } else {
      res.locals.teacher = null;
      next();
    }
  };

  // check current student
const checkStudent = (req, res, next) => {
  const token = req.cookies.sjwt;
  if (token) {
    sjwt.verify(token, 'dragons secret', async (err, decodedToken) => {
      if (err) {
        res.locals.student = null;
        next();
      } else {
        let student = await Student.findById(decodedToken.id);
        res.locals.student = student;// here we made the student object saved and available in locals for every view
       // console.log(res.locals.student);
        next();
      }
    });
  } else {
    res.locals.student = null;
    next();
  }
};

module.exports = { requireAuth, checkTeacher, checkStudent };