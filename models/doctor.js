const mongoose = require('mongoose')

const doctorSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    fname: String,
    lname: String,
    uid: String,
    password: String,
    work_place: String,
    qualification: String,
    exprience: String,
    department: String,
    wallet_address: String,
    gender: String.name,
    image: String
})

module.exports = mongoose.model('Doctor', doctorSchema);