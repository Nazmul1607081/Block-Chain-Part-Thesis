const express = require('express');
const router = express.Router();
const multer = require('multer');
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


router.get('/', function (req, res) {
    const id = req.query.id;
    const userName = req.query.user_name;
    res.cookie('id', id);
    res.render('appointment', {
        data: {
            id: id,
            userName: userName
        }
    })

})

router.post('/', upload.single('imagefile'), function (req, res) {
    let contact = req.body.contact;
    let details = req.body.details;
    let cloudAddress = req.body.cloud_address;
    //let image = 'http://localhost:3000/' + req.file.path
    let userType = req.cookies.user_type;
    let userName = req.cookies.user_name;
    let id = req.cookies.id;

    if (userType == 'doctor') {
        connection.query('SELECT * FROM `doctor` WHERE `user_name` = ?', [userName], function (error, results, fields) {
            if (error) {
                res.send(error)
            }
            if (results.length > 0) {
                let doctor = results[0]
                connection.query('INSERT INTO `patient` (`id`, `name`, `user_name`, `password`, `gender`) VALUES (NULL, ?, ?, ?, ?);',
                    [doctor.name, doctor.user_name, doctor.password, doctor.gender],
                    function (insertError, insertResult, fields) {
                        if (insertError) {
                            res.send(insertError)
                        }
                        res.cookie('', userName);
                        res.cookie('isLoguser_namein', true);
                        res.cookie('user_type', 'patient');
                        connection.query('INSERT INTO `appointment` (`user_name`, `id`, `time`, `details`, `contact`) VALUES (?, ?, ?, ?, ?);',
                            [userName, id, new Date(), details, contact],
                            function (appointmentError, insertResult, fields) {
                                if (appointmentError) {
                                    res.send(appointmentError)
                                }
                                ///TODO:: store cloud address hashed in the block chain
                                res.redirect('/home')
                            })

                    })
            } else {
                res.send("Something error")
            }
        });

    } else {
        connection.query('INSERT INTO `appointment` (`user_name`, `id`, `time`, `details`, `contact`) VALUES (?, ?, ?, ?, ?);',
            [userName, id, new Date(), details, contact],
            function (appointmentError, insertResult, fields) {
                if (appointmentError) {
                    res.send(appointmentError)
                }
                ///TODO:: store cloud address hashed in the block chain
                res.redirect('/home')
            })
    }


})

module.exports = router