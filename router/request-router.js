const express = require('express');
const router = express.Router();
const RequestModel = require('../models/request');

router
.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    next();
})
.get(async (req, res) => {
    try {
        const requests = await RequestModel.find({});
        res.send(requests);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})
.post(async (req, res) => {
    try {
        const request = new RequestModel(req.body.request);
        await request.save();
        res.send(request);
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
.delete(async (req,res) => {
    try {
        const request = await RequestModel.findByIdAndDelete(req.params.id);
        if (!request) res.status(404).send("Заявка не найдена!");
        res.status(200).send({
          message: "Заявка успешно удалена!",
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;