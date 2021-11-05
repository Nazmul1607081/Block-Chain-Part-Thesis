const mongoose = require('mongoose')

const patientSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    fname: String,
    lname: String,
    uid: String,
    password: String,
    gender: String.name,
})

module.exports = mongoose.model('Patient', patientSchema);