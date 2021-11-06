const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const multer = require('multer');
const bcrypt = require('bcrypt');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'medi'
});


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, +Date.now() + '-' + file.originalname)
    }
});

const upload = multer({storage: storage, limits: 1024 * 1024 * 5});





router.get('/doctor', function (req, res) {

    res.render('signup')

})
router.get('/patient', function (req, res) {
    res.render('signup1')
})

router.post('/doctor', upload.single('imagefile'), function (req, res) {




    let userName = req.body.user_name
    let name = req.body.name
    let workPlace = req.body.work_place
    let qualification = req.body.qualification
    let experience = req.body.exprience
    let department = req.body.department
    let walletAddress = req.body.wallet_address
    let gender = req.body.gender
    //let image = 'http://localhost:3000/' + req.file.path

    console.log(req.body)

    /*connection.query('SELECT * FROM `doctor` WHERE `user_name` = ?', [userName], function (error, results, fields) {
        if (error) {
            res.send(error);
        }
        if (results.length >= 1) {
            res.send("User Already Exist");
        } else {
            bcrypt.hash(req.body.password, 10, function (err, hash) {
                if (err) {
                    res.send(err);
                } else {

                    connection.query('INSERT INTO `doctor` (`id`, `name`, `user_name`, `password`, `work_place`, `qualification`, `exprience`, `department`, `wallet_address`, `gender`, `image`) VALUES (NULL, ?, ?, ?, ?,?, ?, ?, ?,?, ?);',
                        [name, userName, hash, workPlace, qualification, experience, department, walletAddress, gender, image],
                        function (insertError, insertResult, fields) {
                            if (insertError) {
                                res.send(insertError)
                            }
                            console.log('User Created Successfully');
                            res.cookie('user_name', userName);
                            res.cookie('isLogin', true);
                            res.cookie('user_type', 'doctor');
                            res.redirect('/home');

                        })
                }
            });
        }
    });*/
})


router.post('/patient', function (req, res) {

    let userName = req.body.user_name
    let name = req.body.name
    let gender = req.body.gender

    connection.query('SELECT * FROM `patient` WHERE `user_name` = ?', [userName], function (error, results, fields) {
        if (error) {
            res.send(error);
        }
        if (results.length >= 1) {
            res.send("User Already Exist");
        } else {
            bcrypt.hash(req.body.password, 10, function (err, hash) {
                if (err) {
                    res.send(err);
                } else {

                    connection.query('INSERT INTO `patient` (`id`, `name`, `user_name`, `password`, `gender`) VALUES (NULL, ?, ?, ?, ?);',
                        [name, userName, hash, gender],
                        function (insertError, insertResult, fields) {
                            if (insertError) {
                                res.send(insertError)
                            }
                            console.log('User Created Successfully');
                            res.cookie('user_name', userName);
                            res.cookie('isLogin', true);
                            res.cookie('user_type', 'patient');
                            res.redirect('/home');

                        })
                }
            });
        }
    });

})

module.exports = router