const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'medi'
});
;

router.get('/', function (req, res) {

    const department = req.query.department;
    const userName = req.query.user_name;

    console.log(department)
    let doctors = [];

    connection.query('SELECT * FROM `doctor` WHERE `department` = ?', [department], function (error, results, fields) {
        if (error)
            res.render(error);
        else {
            results.forEach((element) => {
                doctors.push(element)
            });
            console.log(doctors)
            res.render('doctors', {
                data: {
                    doctors: doctors,
                    department: department.toUpperCase(),
                    user_name: userName
                }
            })
        }
    });
})

module.exports = router