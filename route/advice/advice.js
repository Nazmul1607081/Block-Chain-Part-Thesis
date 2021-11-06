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
    console.log(cookies);

    if (cookies.isLogin === 'true') {

        res.render('advice', {
            data: {
                user_name: cookies.user_name,
                user_type: cookies.user_type
            }
        })
    } else {
        res.redirect('/login')
    }
})


module.exports = router