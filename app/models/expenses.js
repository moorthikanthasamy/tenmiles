const mongoose = require("../config/database");
const Schema = mongoose.Schema
const ExpSchema = new Schema({
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});
module.exports = mongoose.model('expenses', ExpSchema)