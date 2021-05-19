const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    price: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    target: {
        type: String,
        require: true,
    },
    loops: {
        type: [{ type: String }],
        require: true,
    }
})

const CourseModel = mongoose.model("Course", CourseSchema);
module.exports = CourseModel;