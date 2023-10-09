
const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require ('bcrypt');
const teacherSchema = new mongoose.Schema({

    name: {
     type: String,
     required: [true, 'Please enter your name'],   
    },

    phone: {
       type: String,
      required: [true, 'Please enter your phone number'],
    
     },

  
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
      },

      password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters'],
      }
});


// fire this function before doc saved to db to hash password
teacherSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login teacher
teacherSchema.statics.login = async function(email, password) {
  const teacher = await this.findOne({ email });
  if (teacher) {
    const auth = await bcrypt.compare(password, teacher.password);
    if (auth) {
      return teacher;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};


const Teacher = mongoose.model('teacher', teacherSchema);

module.exports = Teacher;