const express = require('express');
const router = express.Router();
const multer = require('multer');
const mysql = require('mysql');
const Web3 = require('web3');
const NodeRSA = require("node-rsa");
const Firebase = require('firebase')

const key = new NodeRSA({b: 512});

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


const connection = mysql.createConnection({
    host: process.env.SQL_HOST_NAME,
    user: process.env.SQL_USER_NAME,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DB_NAME
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, +Date.now() + '-' + file.originalname)
    }
});

const upload = multer({storage: storage, limits: 1024 * 1024 * 5});


/*router.get('/', function (req, res) {
    ///not work
    const id = req.query.id;
    const userName = req.query.user_name;

    res.cookie('id', id);
    res.render('appointment', {
        data: {
            id: id,
            userName: userName
        }
    })

})*/

router.post('/', upload.single('imagefile'), function (req, res) {
    let contact = req.body.contact;
    let details = req.body.details;
    let access_time = req.body.access_time;
    let cloudAddress = req.body.cloud_address;
    let image = process.env.HOST + (process.env.PORT | 3000) + "/" + req.file.path
    let userType = req.cookies.user_type;
    let userName = req.cookies.user_name;
    let walletAddress = req.cookies.wallet_address;
    let id = req.cookies.id;

    console.log(walletAddress)
    console.log(req.cookies.private_key)


    if ((contact === undefined || contact === "") || (details === undefined || details === "") || (cloudAddress === undefined || cloudAddress === ""))
        res.redirect(req.get('host'));

    if (userType === 'doctor') {
        connection.query('SELECT * FROM `doctor` WHERE `user_name` = ?', [userName], function (error, results, fields) {
            if (error) {
                res.send(error)
            }
            if (results.length > 0) {
                let doctor = results[0]
                connection.query('INSERT INTO `patient` (`id`, `name`, `user_name`, `password`, `gender`) VALUES (NULL, ?, ?, ?, ?);',
                    [doctor.name, doctor.user_name, doctor.password, doctor.gender],
                    function (insertError, insertResult, fields) {
                        if (insertError) {
                            res.send(insertError)
                        }
                        res.cookie('user_name', userName);
                        res.cookie('isLogin', true);
                        res.cookie('user_type', 'patient');
                        connection.query('INSERT INTO `appointment` (`user_name`, `id`, `time`, `details`, `contact`,`image`) VALUES (?, ?, ?, ?,?,?);',
                            [userName, id, new Date(), details, contact, image],
                            function (appointmentError, insertResult, fields) {
                                if (appointmentError) {
                                    res.send(appointmentError)
                                }
                                storeCloudAddressToBlockChain(cloudAddress, access_time, walletAddress, userName).then(() => {
                                    res.redirect('/home')
                                })
                            })

                    })
            } else {
                res.send("Something error")
            }
        });

    } else {
        connection.query('INSERT INTO `appointment` (`user_name`, `id`, `time`, `details`, `contact`,  `image`) VALUES (?,?, ?, ?, ?, ?);',
            [userName, id, new Date(), details, contact, image],
            function (appointmentError, insertResult, fields) {
                if (appointmentError) {
                    res.send(appointmentError)
                }
                storeCloudAddressToBlockChain(cloudAddress, access_time, walletAddress, userName).then(() => {
                    res.redirect('/home')
                })

            })
    }


})

function seconds_since_epoch(d) {
    return Math.floor(d / 1000);
}

async function storeCloudAddressToBlockChain(cloudAddress, access_time, walletAddress, patientUserName) {

    //const app = Firebase.initializeApp(firebaseConfig)
    const db = Firebase.firestore()
    let publicKeyObj = new NodeRSA(walletAddress);
    console.log("W A:" + walletAddress)
    let encryptedData = publicKeyObj.encrypt(cloudAddress, 'base64');

    const web3 = new Web3(process.env.WEB3_PORT_ADDRESS)
    const deplyedABI = [
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
		"name": "dataMapping",
		"outputs": [
			{
				"internalType": "string",
				"name": "cloudAddress",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "expireTime",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "patientUserName",
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
			},
			{
				"internalType": "uint256",
				"name": "_time",
				"type": "uint256"
			}
		],
		"name": "getCloudAddress",
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
			},
			{
				"internalType": "uint256",
				"name": "_time",
				"type": "uint256"
			}
		],
		"name": "getPatientUserName",
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
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "addr",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_cloudAddress",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_time",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_patientUserName",
				"type": "string"
			}
		],
		"name": "setData",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
    const deplyedAddress = process.env.DEPLOYED_ADDRESS;

    const contract = new web3.eth.Contract(
        deplyedABI, deplyedAddress
    );
    /*contract.methods.getData("b").call().then(
        function (data) {
            console.log(data);
            console.log('data');
        }
    )*/

    const d = new Date();
    const sec = seconds_since_epoch(d);


    await web3.eth.getAccounts().then(async function (accounts) {
        let acc = accounts[0]
        console.log(sec)

        await contract.methods.setData(walletAddress.toString().split('\n')[2], cloudAddress, sec + access_time * 60, patientUserName).send({from: acc}).then(function (tnx) {
            console.log(tnx)
            console.log(walletAddress.toString().split('\n')[2])
            console.log(cloudAddress)
        }).catch(function (err) {
            console.log(err)
        })

        /*await db.collection('cyper').add({
            'encrypted_data': encryptedData,
        }).then((doc) => {
            console.log(doc.path)
            const encryptedAddress = doc.path.split('/')[1];
            console.log(encryptedAddress)
            contract.methods.setData(walletAddress.toString().split('\n')[2], encryptedAddress).send({from: acc}).then(function (tnx) {
                console.log(tnx)
                console.log(walletAddress.toString().split('\n')[2])
                console.log(encryptedAddress)
            }).catch(function (err) {
                console.log(err)
            })
        })*/


    })
}


module.exports = router