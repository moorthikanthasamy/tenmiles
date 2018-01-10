const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/expenses")
const db = mongoose.connection
mongoose.Promise = Promise
db.once('open', () => console.log('connection established successfully'))
db.on('error', () => console.log('Error in connecting mongodb'))

module.exports = mongoose