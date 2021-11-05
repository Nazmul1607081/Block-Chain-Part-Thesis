var jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log(req.body);
    try {
        const decoded = jwt.verify(req.body.token, 'secret');
        req.userData = decoded;
        console.log(req.userData);
        next();

    }
    catch (error) {
        return res.redirect('/login')
    }

}