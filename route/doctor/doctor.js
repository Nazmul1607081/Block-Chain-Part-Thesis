var express = require('express');
var router = express.Router()
const mongoose = require('mongoose')

const Doctor = require('../../models/doctor');;

router.get('/', function (req, res) {

    var dept = req.query.dept;
    var pid = req.query.pid;

    console.log(dept)

    var doctors = [];

    Doctor.find({
        'department': dept

    }, function (err, docs) {
        if (err) {
            res.render('error')
        }
        docs.forEach((element) => {
            console.log(element.fname);
            doctors.push(element)
        });
        console.log(doctors)
        res.render('doctors', {
            data: {
                doctors: doctors,
                dept: dept.toUpperCase(),
                pid: pid
            }
        })
        console.log('doctors')
    });

    console.log(dept);





})

module.exports = router