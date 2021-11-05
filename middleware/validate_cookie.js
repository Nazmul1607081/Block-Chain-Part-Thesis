function validateCookie(req, res, next) {
    var cookies = req.cookies;
    console.log(cookies);
    console.log(cookies.user_id);
    if (cookies.isLogin == 'true') {
        console.log('true');
        next();
    }
    next('fail');

}

module.exports = validateCookie;