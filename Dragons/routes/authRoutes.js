const { Router } = require ('express') ;
const authController = require('../controllers/authController');
const router = Router();

//Teacher routes
 router.get('/teacherSignup', authController.teacher_signup_get); 
 router.post('/teacherSignup', authController.teacher_signup_post);
 router.get('/teacherLogin', authController.teacher_login_get);
 router.post('/teacherLogin', authController.teacher_login_post);

//Student routes
router.get('/studentSignup', authController.student_signup_get); 
 router.post('/studentSignup', authController.student_signup_post);
 router.get('/studentLogin', authController.student_login_get);
 router.post('/studentLogin', authController.student_login_post);



 router.get('/logout', authController.logout_get);


 module.exports = router;
 