const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const Web3 = require('web3');

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


router.get('/appointment', function (req, res) {

    const department = req.query.department;
    const userName = req.query.user_name;
    const id = req.query.id;
    const walletAddress = req.query.wallet_address;

    res.cookie('id', id);

    res.render('appointment', {
        data: {
            department: department,
            user_name: userName,
            id: id,
            walletAddress: walletAddress
        }
    });
})

module.exports = router