var express = require('express');
var router = express.Router()




router.get('/', function (req, res) {
    var did = req.query.did;
    var pid = req.query.pid;
    res.render('appointment', {
        data: {
            pid: pid,
            did: did
        }
    })

})


module.exports = router