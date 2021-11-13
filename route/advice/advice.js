const express = require('express')
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

    const cookies = req.cookies;
    const id = req.cookies.id;
    const userType = cookies.user_type
    const userName = cookies.user_name

    console.log(cookies)

    if (cookies.isLogin === 'true') {
        if (userType === 'doctor') {
            connection.query('SELECT * FROM appointment LEFT JOIN advice ON appointment.appointment_id=advice.appointment_id WHERE appointment.id=?', [id],
                function (error, results, fields) {
                    if (error)
                        res.render(error);
                    else {
                        res.render('advice', {
                            data: {
                                user_name: cookies.user_name,
                                user_type: cookies.user_type,
                                advice: results,
                                id: id,
                            }
                        })
                    }
                });
        } else {
            connection.query('SELECT * FROM appointment LEFT JOIN advice ON appointment.appointment_id=advice.appointment_id WHERE appointment.user=?', [userName],
                function (error, results, fields) {
                    if (error)
                        res.render(error);
                    else {
                        res.render('advice', {
                            data: {
                                user_name: cookies.user_name,
                                user_type: cookies.user_type,
                                advice: results,
                                id: id,
                            }
                        })
                    }
                });
        }

    } else {
        res.redirect('/login')
    }


})


module.exports = router