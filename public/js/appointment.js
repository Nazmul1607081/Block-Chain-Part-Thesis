

$(document).ready(async function () {

    console.log('index page')
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
    }


    let address = "0xeD6085050B402B49C6052BAfcb65770Fd720AC24";
    let abi = [
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
                    "name": "_data",
                    "type": "string"
                }
            ],
            "name": "setData",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]

    var accounts;

    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            await ethereum.enable();
            accounts = await web3.eth.getAccounts();
            console.log(accounts);
            console.log("acc");
            var option = {from: accounts[0]};

            console.log(myContract);
            console.log(option);
        } catch (error) {
            // User denied account access...
        }
    } else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */});
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }

    var contract = new web3.eth.Contract(abi, address);


    /*$('#get_data').click(
        function () {
            console.log('get');
            contract.methods.getData("2").call().then(
                function (data) {
                    console.log(data);
                }
            )
        }
    )*/


    $('#send_data_to_block_chain').click(

        function () {
            validateUsername();
            if(!usernameError)
                return false;
            console.log('set');
            web3.eth.getAccounts().then(function (accounts) {
                let acc = accounts[0]
                return contract.methods.setData($('#wallet_address').val(), $('#cloud_address').val()).send({from: acc})

            }).then(function (tnx) {
                console.log(tnx)
            }).catch(function (err) {
                console.log(err)

            })
        }
    )

    $('#usercheck').hide();
    let usernameError = true;
    $('#details').keyup(function () {
        validateUsername();
    });

    function validateUsername() {
        let usernameValue = $('#details').val();
        if (usernameValue.length == '') {
            $('#usercheck').show();
            usernameError = false;
            return false;
        } else if ((usernameValue.length < 3) ) {
            $('#usercheck').show();
            $('#usercheck').html
            ("**length of username must be between 3 and 10");
            usernameError = false;
            return false;
        } else {
            $('#usercheck').hide();
        }


    }

})