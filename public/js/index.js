$(document).ready(async function () {

    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
    }


    var address = '0x8154e2b6491f80cF64e12A9412bF2E1F44785ca6';
    var abi = [
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
    var accounts;

    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            await ethereum.enable();
            accounts = await web3.eth.getAccounts();
            console.log(accounts);
            console.log("acc");
            var option = { from: accounts[0] };

            console.log(myContract);
            console.log(option);
        } catch (error) {
            // User denied account access...
        }
    }
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */ });
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }

    var contract = new web3.eth.Contract(abi, address);


    $('#deposite').click(
        function () {
            console.log('diposite');
            contract.methods.getData().call().then(
                function (data) {
                    console.log(data);
                }
            )
        }
    )



})