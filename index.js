var express = require('express');
var morgan = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var passwordHash = require('password-hash');
var cookieParser = require('cookie-parser');
var request = require('request');
var fs = require('fs');
Web3 = require('web3')
solc = require('solc')
var app = express();
app.use( bodyParser.json() )
app.use(cookieParser());
app.use(morgan('combined'));

const cors = require('cors');
const uuid = require('uuid');

let contractAddress = null;
let contractInstance = null;
let VotingContract  = null;
let abi = null;
let compiledContract = null;

const { getUserUuid, mapUserToUuid } = require("./db.js");
const checkGanacheReady = require("./check_ganache_availibility.js");

app.use(cors());

app.use("/", express.static("ui"));

var username;
var password;

var web3 = new Web3();

async function deployContract() {
  while (true) {
    try {
      await checkGanacheReady();
      break;
    } catch (error) {
      console.log(error);
      await new Promise(resolve => setTimeout(resolve, 30000));
    }
  }

  web3.setProvider(new web3.providers.HttpProvider('http://ganache:8545'));

  var source = fs.readFileSync('Voting.sol', 'utf8');
  compiledContract = solc.compile(source, 1);
  abi = JSON.parse(compiledContract.contracts[':Voting'].interface);
  VotingContract = web3.eth.contract(abi);

  // Deploying contract
  web3.eth.getAccounts(function(err, accounts) {
    if(err) {
        console.log(err);
    } else {
        const votingDurationWeeks = 1;
        const votingStartTime = Math.floor(new Date("2023-05-20T07:00:00Z").getTime() / 1000); // Convert to UNIX timestamp
        VotingContract.new(['Sanat','Aniket','Mandar','Akshay'], votingStartTime, votingDurationWeeks, { data: compiledContract.contracts[':Voting'].bytecode, from: accounts[0], gas: 4700000 }, function(err, contract) {
            if (err) {
                console.error(err);
            } else if (!contract.address) {
                console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");
            } else {
                console.log("Contract mined! Address: " + contract.address);
                contractAddress = contract.address;
            }
        });
    }
  });
}


app.post('/login', async function(req, res) {
  username = req.body.username;
  password = req.body.password;
  var hashedPassword = passwordHash.generate(password);

  if (username == "admin" && password == "password") {
    // Check if the user exists in the database
    let userUuid = await getUserUuid(username);

    // If the user doesn't exist, create a new user
    if (!userUuid) {
      userUuid = uuid.v4();
      await mapUserToUuid(userUuid, username);
      res.status(200).send({ message: hashedPassword, uuid: userUuid });
    } else {
      res.status(200).send({ message: hashedPassword, uuid: userUuid });
    }
  } else {
    res.status(500).send({ message: 'error' });
  }
});

app.post('/auth', function(req, res) {
	var cookie_pass = req.cookies['auth'];
	if (passwordHash.verify('password', cookie_pass)) {
		res.status(200).send({ message: hashedPassword});
	} else {
		res.status(500).send({ message: 'error' });
	}
});

app.get('/',function(req,res){
	var cookie_pass = req.cookies['auth'];
	if (passwordHash.verify('password', cookie_pass)) {
		res.sendFile(path.join(__dirname, 'ui', 'app.html'));
	} else {
		console.log('ok');
	}
});

 app.post('/getaddress',function(req,res){
   if (contractAddress) {
    res.status(200).send({contractAddress: contractAddress});
  } else {
    res.status(500).send({error: 'Contract not deployed yet.'});
  }
});

app.get('/info', ensureAuthenticated, function(req, res){
		contractInstance = VotingContract.at(contractAddress);
		res.sendFile(path.join(__dirname, 'ui', 'clist.html'));
});

app.get('/web3.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'node_modules', 'web3', 'dist', 'web3.min.js'));
});

function ensureAuthenticated(req, res, next) {
  var cookie_pass = req.cookies['auth'];
  if (passwordHash.verify('password', cookie_pass)) {
    return next();
  } else {
    res.redirect('/');
  }
}


var port = 8080;
app.listen(8080, "0.0.0.0", function () {
  console.log(`app listening on port ${port}!`);
  deployContract();
});

