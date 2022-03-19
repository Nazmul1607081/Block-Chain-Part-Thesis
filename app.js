const express = require('express')
const cookie_parser = require('cookie-parser')
const bodyParser = require('body-parser');
const cors = require('cors');
const NodeRSA = require('node-rsa');
const key = new NodeRSA({b: 512});
const Web3 = require('web3')
const Firebase = require('firebase')

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: process.env.SQL_HOST_NAME,
    user: process.env.SQL_USER_NAME,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DB_NAME
});

const app = express()
const port = process.env.PORT || 3000


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

Firebase.initializeApp(firebaseConfig)

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

const MyClass = require('./utils/test_class');

app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cookie_parser())
//app.use(validateCookie)
app.use(
    bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors());

const home = require('./route/home/home');
const doctor = require('./route/doctor/doctor');
const appointment = require('./route/appointment/appointment');
const login = require('./route/login/login');
const signup = require('./route/signup/signup');
const logout = require('./route/logout/logout');
const advice = require('./route/advice/advice');
const {add} = require("nodemon/lib/rules");

app.set('view engine', 'ejs')

app.use('/home', home)
app.use('/login', login)
app.use('/signup', signup)
app.use('/doctors', doctor)
app.use('/logout', logout)
app.use('/appointment', appointment)
app.use('/advice', advice)


app.get('/', (req, res) => {
    let myClass = new MyClass("Nazmul");
    myClass.disPlay()
    res.render('index')//blockchain

})

app.get('/error', (req, res) => {
    res.render('server_error')
})

app.get('/test', (req, res) => {

    let privateKey = key.exportKey('private')
    let publicKey = key.exportKey('public')

    let privateKeyObj = new NodeRSA(privateKey);
    let publicKeyObj = new NodeRSA(publicKey);

    let data = "Bangladesh";
    let encryptedData = publicKeyObj.encrypt(data);
    let decryptedData = privateKeyObj.decrypt(encryptedData, 'utf8')
    let publicKeyFromPrivateKey = privateKeyObj.exportKey('public')
    //let privateKeyFromPublicKey = publicKeyObj.exportKey('private')


    //console.log(privateKey);
    //console.log(publicKey);
    console.log(data)
    console.log(encryptedData)
    console.log(decryptedData)
    //console.log(publicKeyFromPrivateKey)
    //console.log(privateKeyFromPublicKey)


    res.send('Testing')
})
app.get('/test-web3', async (req, res) => {

    const web3 = new Web3('HTTP://127.0.0.1:7545')
    const id = web3.eth.net.getId();
    const deplyedABI = [
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "string",
                    "name": "addr",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_data",
                    "type": "string"
                }
            ],
            "name": "setData",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "name": "data",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "string",
                    "name": "addr",
                    "type": "string"
                }
            ],
            "name": "getData",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ];
    const deplyedAddress = "0x10f605098A0c66f39f2352aF826BC3Ea594b847e";
    const contract = new web3.eth.Contract(
        deplyedABI, deplyedAddress
    );
    contract.methods.getData("b").call().then(
        function (data) {
            console.log(data);
            console.log('data');
        }
    )

    /*web3.eth.getAccounts().then(function (accounts) {
        let acc = accounts[0]
        contract.methods.setData("b", "Bangladesh").send({from: acc}).then(function (tnx) {
            console.log(tnx)
        }).catch(function (err) {
            console.log(err)

        })

    })*/

    res.send('Testing')
})

app.get('/test-firebase', async (req, res) => {

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

    const app = Firebase.initializeApp(firebaseConfig)
    const db = app.firestore()

    const users = db.collection( 'users');


    await db.collection('users').add({
        'name':"Nazmul",
        "wallet_address":"JDBKJ(DBKJD"
    }).then((doc)=>{
        console.log(doc.path.split('/')[1])
    })

    const userSnapshot = await db.collection('users').get()
    const userList = userSnapshot.docs.map(doc => doc.data());
    console.log(userList)

    res.send('Testing')
})

app.get('/data-encrypt', (req, res) => {

    //let privateKey = key.exportKey('private')
    //let publicKey = key.exportKey('public')

    let privateKey = "-----BEGIN RSA PRIVATE KEY-----MIIBPAIBAAJBAMVOQWqHfhxnfamFpsomrYivvdStXBMvwU3y93priGbFYbfTU3zoUGIERDCgnFgJo351O1UUUS+UrOO38AEu00ECAwEAAQJBAJFOfZy/5l9y1DfppxkPfRPCIbKkbb/vlpQakKnG0fCkttgWgjEBpV1QBCsaA/QlTJVVRTtMJiqOifJ73l0MYAECIQDxpW4b4KKPk4K4QqhULDiZcfCuJ0pGJJnY8aWEGYcOwQIhANEGkMMSiaoMFYQ2KDFv6JtJTutSn7Qopvfb9H3WnWSBAiEAr6RjSHgbMOkzluM8nxIVgdND8hI09o8cFIhwmnhDpwECIAkgzkWWk6h3aqEhdFPkXTYa13VzYEIP3GrKkjzEmI8BAiEA48DSrBPvKRBTSjRrgMzL8rmFMYp1VrX+ts4Me1H1pt0=-----END RSA PRIVATE KEY-----"
     let privateKeyObj = new NodeRSA(privateKey);

    let publicKey = privateKeyObj.exportKey('public')
    let publicKeyObj = new NodeRSA(publicKey);

    let data = "time->12-10-2022 08:10PM, temperature->98F" +
        "time->12-10-2022 08:10PM, temperature->98F" +
        "time->12-10-2022 08:15PM, temperature->99F" +
        "time->12-10-2022 08:20PM, temperature->98F" +
        "time->12-10-2022 08:25PM, temperature->100F" +
        "time->12-10-2022 08:30PM, temperature->98F";

    let data1 = "time->12-10-2022 08:10PM, pulse->72bps" +
        "time->12-10-2022 08:10PM, pulse->72bps" +
        "time->12-10-2022 08:15PM, pulse->75bps" +
        "time->12-10-2022 08:20PM, pulse->74bps" +
        "time->12-10-2022 08:25PM, pulse->72bps" +
        "time->12-10-2022 08:30PM, pulse->70bpsF";
    let encryptedData = publicKeyObj.encrypt(data1,'base64').toString();
    let decryptedData = privateKeyObj.decrypt(encryptedData, 'utf8')
    let publicKeyFromPrivateKey = privateKeyObj.exportKey('public')
    //let privateKeyFromPublicKey = publicKeyObj.exportKey('private')


    //console.log(privateKey);
    //console.log(publicKey);
    //console.log(data)
    console.log(encryptedData)
    //console.log(decryptedData)
    //console.log(publicKeyFromPrivateKey)
    //console.log(privateKeyFromPublicKey)


    res.send('Testing')
})

app.listen(port, () => console.log(`App listening on the port ${port}`))