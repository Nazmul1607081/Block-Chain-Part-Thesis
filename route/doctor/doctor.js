const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const Web3 = require('web3');
const bcrypt = require("bcrypt");

const connection = mysql.createConnection({
    host: process.env.SQL_HOST_NAME,
    user: process.env.SQL_USER_NAME,
    password: '',
    database: process.env.SQL_DB_NAME
});

router.get('/', function (req, res) {

    const department = req.query.department;
    const userName = req.query.user_name;

    console.log(department)
    let doctors = [];

    connection.query('SELECT * FROM `doctor` WHERE `department` = ?', [department], function (error, results, fields) {
        if (error) {
            console.log(error);
            res.render(error);
        } else {
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

    const cookies = req.cookies;


    res.cookie('id', id);

    connection.query('SELECT * FROM `doctor` WHERE `id` = ?', [id], function (error, results, fields) {
        if (error) {
            res.send(error);
        } else if (results.length < 1) {
            res.send("Auth Failed");
        } else {
            const walletAddress = results[0].wallet_address;
            console.log("after result "+walletAddress)
            res.cookie('wallet_address', results[0].wallet_address);
            res.render('appointment', {
                data: {
                    department: department,
                    user_name: userName,
                    id: id,
                    walletAddress: walletAddress
                }
            });
        }
    });


})

module.exports = router