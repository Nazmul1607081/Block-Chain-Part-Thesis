const express = require('express');
const router = express.Router();
const Firebase = require('firebase')
const copy = require('copy-paste')

const firebaseConfig = {
    apiKey: "AIzaSyAGWCTeMiFUG2c1sKdbUEZB5zhGTLawXQs",
    authDomain: "medichain-e0025.firebaseapp.com",
    databaseURL: "https://medichain-e0025.firebaseio.com",
    projectId: "medichain-e0025",
    storageBucket: "medichain-e0025.appspot.com",
    messagingSenderId: "444071301435",
    appId: "1:444071301435:web:867a53d6663e828e8f671e",
    measurementId: "G-T57GVVFM1Z"
};

let generatedCloudAddress = ""

router.get('/', function (req, res) {

    const cookies = req.cookies;
    console.log(cookies);

    if (cookies.isLogin === 'true' && cookies.wallet_address !== undefined && cookies.wallet_address !== "") {

        if (cookies.user_type === "doctor") {
            res.cookie('id', cookies.id);
        }

        res.render('home', {
            data: {
                user_name: cookies.user_name,
                user_type: cookies.user_type,
                generatedCloudAddress:generatedCloudAddress
            }
        })
    } else {
        res.redirect('/login')
    }


})


router.post('/generate-cloud-address', function (req, res) {
    //const app = Firebase.initializeApp(firebaseConfig)
    const db = Firebase.firestore()
    const data = db.collection('data');

    db.collection('data').add({
        temperature:"No data available",
        pulse:"No data available"
    }).then((doc)=>{
        generatedCloudAddress = doc.id;
        console.log(generatedCloudAddress)
        copy.copy(generatedCloudAddress);
        res.redirect('/home');

    })
    console.log(data)

    //res.send("submitted" + req.body.username + req.body.password + req.body.remember_me)
})

module.exports = router