const express = require('express');
const router = express.Router();


router.get('/', function (req, res) {

    const cookies = req.cookies;
    console.log(cookies);

    if (cookies.isLogin === 'true' && cookies.wallet_address!== undefined && cookies.wallet_address!== "") {

        if(cookies.user_type==="doctor")
        {
            res.cookie('id', cookies.id);
        }

        res.render('home', {
            data: {
                user_name: cookies.user_name,
                user_type: cookies.user_type
            }
        })
    } else {
        res.redirect('/login')
    }


})


router.post('/', function (req, res) {
    res.send("submitted" + req.body.username + req.body.password + req.body.remember_me)
})

module.exports = router