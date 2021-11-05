const express = require('express')
const bcrypt = require('bcrypt');
const router = express.Router()
const app = express()
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'medi'
});


router.get('/', function (req, res) {
    res.render('login')
})


router.post('/', function (req, res) {

    let userType = req.body.user_type;
    let userName = req.body.user_name;

    connection.query('SELECT * FROM `doctor` WHERE `user_name` = ?', [userName], function (error, results, fields) {
        if (error) {
            res.send(error);
        } else if (results.length < 1) {
            res.send("Auth Failed");
        } else {
            console.log(results)
            bcrypt.compare(req.body.password, results[0].password, function (err, result) {
                if (err) {
                    res.redirect('/login');
                } else {
                    if (result) {
                        res.cookie('user_name', req.body.user_name);
                        res.cookie('isLogin', true);
                        res.cookie('user_type', userType);
                        console.log("SUCCESSFUL");
                        res.redirect('/home');
                    } else {
                        res.redirect('/login');
                    }
                }
            });
        }
    });


})

module.exports = router