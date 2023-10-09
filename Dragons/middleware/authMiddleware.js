const jwt = require('jsonwebtoken');
const Teacher = require('../models/Teacher');

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
          next();
        }
      });
    } else {
      res.locals.teacher = null;
      next();
    }
  };

module.exports = { requireAuth, checkTeacher  };