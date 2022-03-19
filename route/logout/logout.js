var express = require('express')
var router = express.Router()


router.get('/', function (req, res) {
    res.cookie('isLogin', false);
    res.cookie('private_key', "")
    res.redirect('/home')
})

module.exports = router