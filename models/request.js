const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    type: {
        type: String,
        require: true,
    },
    hours: {
        type: String,
        require: true,
    },
    specialization: {
        type: String,
        require: true,
    },
    number: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
})

const RequestModel = mongoose.model("Request", RequestSchema);
module.exports = RequestModel;