var express = require('express');
var router = express.Router()




router.get('/', function (req, res) {
    const did = req.query.did;
    const pid = req.query.pid;
    console.log('appointment')
    res.render('appointment', {
        data: {
            pid: pid,
            did: did
        }
    })

})


module.exports = router