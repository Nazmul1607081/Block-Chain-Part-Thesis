const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const Web3 = require('web3');
const NodeRSA = require("node-rsa");
const Firebase = require('firebase')
const key = new NodeRSA({b: 512});

const connection = mysql.createConnection({
    host: process.env.SQL_HOST_NAME,
    user: process.env.SQL_USER_NAME,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DB_NAME
});

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


router.get('/', function (req, res) {

    const cookies = req.cookies;
    const id = req.cookies.id;
    const userType = cookies.user_type
    const userName = cookies.user_name
    const walletAddress = cookies.wallet_address

    console.log(cookies)

    if (cookies.isLogin === 'true') {
        if (userType === 'doctor') {
            connection.query('SELECT * FROM  appointment WHERE id=?', [id],
                async function (error, results, fields) {
                    if (error)
                        res.render(error);
                    else {
                        getDataFromBlockChain(walletAddress, cookies).then((cloudData) => {
                            if (cloudData === "Time expired") {
                                res.send("Time Expired")
                            } else if (cloudData !== "ERR") {
                                console.log(cloudData)
                                res.render('advice', {
                                    data: {
                                        user_name: cookies.user_name,
                                        user_type: cookies.user_type,
                                        advice: results,
                                        id: id,
                                        cloud_data: cloudData
                                    }
                                })
                            } else {
                                res.render(error);
                            }
                        })
                    }
                });
        } else {
            connection.query('SELECT * FROM  appointment WHERE user_name=?', [userName],
                function (error, results, fields) {
                    if (error)
                        res.render(error);
                    else {
                        res.render('advice', {
                            data: {
                                user_name: cookies.user_name,
                                user_type: cookies.user_type,
                                advice: results,
                                id: id,
                            }
                        })
                    }
                });
        }

    } else {
        res.redirect('/login')
    }
})

router.post('/', function (req, res) {
    const appoint_id = req.query.aid;
    const advice = req.body.advice;
    connection.query('UPDATE appointment SET advice=? WHERE appointment_id=?', [advice, appoint_id], function (error, results, fields) {
        if (error) {
            res.send(error);
        } else {
            res.redirect('/advice')
        }
    });

})

function seconds_since_epoch(d) {
    return Math.floor(d / 1000);
}


async function getDataFromBlockChain(walletAddress, cookies) {
    const db = Firebase.firestore()
    const web3 = new Web3(process.env.WEB3_PORT_ADDRESS)
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
		"name": "getCloudData",
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
	}
];
    const deplyedAddress = process.env.DEPLOYED_ADDRESS;
    let cloudData = "";

    const privateKey = cookies.private_key.toString().replace("*", "/")
    //console.log(privateKey)

    let privateKeyObj = new NodeRSA(privateKey);
    //let publicKeyFromPrivateKey = privateKeyObj.exportKey('public')
    //console.log(publicKeyFromPrivateKey)
    //let decryptedData = privateKeyObj.decrypt(encryptedData, 'utf8')

    ///tes

    /*const publicKey = new NodeRSA(publicKeyFromPrivateKey);
    let encryptedData = publicKey.encrypt("i love u", 'base64').toString();
    let decryptedData = privateKeyObj.decrypt(encryptedData, 'utf8')
    console.log(encryptedData)
    console.log("Decrypted: " + decryptedData)*/


    const contract = new web3.eth.Contract(
        deplyedABI, deplyedAddress
    );
    const d = new Date();
    const sec = seconds_since_epoch(d);
    console.log("getting data...from block chain")
    await contract.methods.getCloudData(walletAddress.toString().split('\n')[2], sec).call().then(
        async function (data) {
            console.log(data)
            if (data === "Time expired") {
                cloudData = "Time expired";
            } else {
                const cloudAddress = data.toString().replace(" ", "")
                const cyperSnapshot = await db.collection('data').get()
                for (const doc of cyperSnapshot.docs) {
                    if (doc.id === cloudAddress) {
                        let data = doc.data()
                        let temperatureData = data.temperature
                        let pulseData = data.temperature
                        try {
                            temperatureData = privateKeyObj.decrypt(temperatureData, 'utf8')
                            pulseData = privateKeyObj.decrypt(pulseData, 'utf8')
                            await contract.methods.getPatientUserName(walletAddress.toString().split('\n')[2], sec).call().then((patientUserName) => {
                                cloudData = {
                                    temperature: temperatureData,
                                    pulse: pulseData,
                                    patientUserName: patientUserName
                                }
                            })

                        } catch (err) {
                            cloudData = "ERR"
                        }

                    }
                }
            }
        }
    )
    return cloudData
}


module.exports = router