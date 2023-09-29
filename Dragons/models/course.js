const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    subArea: {
        type: String,
        required: true
    },
    numcred: {
        type: String,
        required: true
    }
}, {timestamps: true });

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;