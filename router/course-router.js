const express = require('express');
const router = express.Router();
const CourseModel = require('../models/course');

router
.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    next();
})
.get(async (req, res) => {
    try {
        const courses = await CourseModel.find({});
        res.send(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})
.post(async (req, res) => {
    try {
        if (req.body.course._id === 'new') {
            delete req.body.course['_id'];
            const course = new CourseModel(req.body.course);
            await course.save();
            res.send(course);
        } else {
            CourseModel.findByIdAndUpdate(req.body.course._id, req.body.course, (err, result) => {
                res.send();
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router
.route('/:id')
.all((req, res, next) => {
    res.statusCode = 200;
    next();
})
.get(async (req,res) => {
    try {
        const course = await CourseModel.findById(req.params.id);
        if (!course) res.status(404).send("Курс не найден!");
        else res.send(course);
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
})
.delete(async (req,res) => {
    try {
        const course = await CourseModel.findByIdAndDelete(req.params.id);
        if (!course) res.status(404).send("Курс не найден!");
        res.status(200).send({
          message: "Курс успешно удален!",
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;