const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const jwt = require('jsonwebtoken');
const sjwt = require('jsonwebtoken'); // sjwt, student token

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('teacher validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createTeacherToken = (id) => {
  return jwt.sign({ id }, 'dragons secret', {
    expiresIn: maxAge
  });
};

const createStudentToken = (id) => {
  return sjwt.sign({ id }, 'dragons secret', {
    expiresIn: maxAge
  });
};

// controller actions

//Teacher controlllers
module.exports.teacher_signup_get = (req, res) => {
  res.render('teacherSignup', { title : 'Teacher Sign up'});
}

module.exports.teacher_login_get = (req, res) => {
  res.render('teacherLogin', { title : 'log in'});
}

module.exports.teacher_signup_post = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const teacher = await Teacher.create({ name, email, password });
   // const token = createTeacherToken(teacher._id);
    //res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    //res.status(201).json({ teacher: teacher._id });
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
 
}


module.exports.teacher_login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const teacher = await Teacher.login(email, password);
    const token = createTeacherToken(teacher._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ teacher: teacher._id });
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }

}

//Student controllers
module.exports.student_signup_get = (req, res) => {
  res.render('studentSignup', { title : 'Student Sign up'});
}

module.exports.student_login_get = (req, res) => {
  res.render('studentLogin', { title : 'log in'});
}

module.exports.student_signup_post = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const student = await Student.create({ name, email, password });
    const token = createStudentToken(student._id);
    res.cookie('sjwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ student: student._id });
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
 
}


module.exports.student_login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.login(email, password);
    const token = createStudentToken(student._id);
    res.cookie('sjwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ student: student._id });
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }

}



//Log out controller for all users
module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.cookie('sjwt', '', { maxAge: 1 });
  res.redirect('/');
}