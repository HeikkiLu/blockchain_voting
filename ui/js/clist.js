$(document).ready(function() {

  $('.modal').modal();

  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  abi = JSON.parse('[{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"hasVoted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"},{"name":"userUuid","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"user","type":"bytes32"}],"name":"getUserVotingStatus","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')
  VotingContract = web3.eth.contract(abi);
  // candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"}
  var contractInstance = null;

  $.when(
    $.ajax({
      url: '/getaddress',
      method: 'post',
      success: function(data) {
        if (data.contractAddress) {
          contractInstance = VotingContract.at(data.contractAddress);
        } else {
          console.log('Error getting the contract address');
        }
      },
      error: function(err) {
        console.log('Error: ', err);
      }
    })
  ).then(function() {
    // check cookie
    function readCookie(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    }

    const userUuid = readCookie('uuid');
    const uuidBytes32 = uuidToBytes32(userUuid);

    function disable() {
      $('#vote1').addClass("disabled");
      $('#vote2').addClass("disabled");
      $('#vote3').addClass("disabled");
      $('#vote4').addClass("disabled");

      //logout
      document.cookie = "show=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC";
      document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // invalidate the UUID
      document.cookie = "uuid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // window.location = '/';
    }

    contractInstance.getUserVotingStatus.call(uuidBytes32, function(error, hasVoted) {
      if (error) {
        console.error("An error occurred: " + error);
        return;
      }
      if (hasVoted) {
        disable();
        alert('You have already voted');
        window.location = '/';
        return;
      }
    });

    $('#vote1').click(function() {
      contractInstance.voteForCandidate(web3.fromAscii('Sanat'), uuidBytes32, { from: web3.eth.accounts[0] }, function(error, transactionHash) {
        if (error) {
          console.error("An error occurred: " + error);
          return;
        }

        web3.eth.getTransactionReceipt(transactionHash, function(error, receipt) {
          if (!error) {
            console.log(receipt);
          }
        });
        // The vote was successful, we can disable the vote buttons
        disable();
        $('#loc_info').text('Vote submitted successfully to Sanat');
      });
    });

    $('#vote2').click(function() {
      contractInstance.voteForCandidate(web3.fromAscii('Aniket'), uuidBytes32, { from: web3.eth.accounts[0] }, function(error, transactionHash) {
        if (error) {
          console.error("An error occurred: " + error);
          return;
        }

        web3.eth.getTransactionReceipt(transactionHash, function(error, receipt) {
          if (!error) {
            console.log(receipt);
          }
        });
        // The vote was successful, we can disable the vote buttons
        disable();
        $('#loc_info').text('Vote submitted successfully to Aniket');
      });
    });

    $('#vote3').click(function() {
      contractInstance.voteForCandidate(web3.fromAscii('Mandar'), uuidBytes32, { from: web3.eth.accounts[0] }, function(error, transactionHash) {
        if (error) {
          console.error("An error occurred: " + error);
          return;
        }

        web3.eth.getTransactionReceipt(transactionHash, function(error, receipt) {
          if (!error) {
            console.log(receipt);
          }
        });
        // The vote was successful, we can disable the vote buttons
        disable();
        $('#loc_info').text('Vote submitted successfully to Mandar');
      });

    });

    $('#vote4').click(function() {
      contractInstance.voteForCandidate(web3.fromAscii('Akshay'), uuidBytes32, { from: web3.eth.accounts[0] }, function(error, transactionHash) {
        if (error) {
          console.error("An error occurred: " + error);
          return;
        }

        web3.eth.getTransactionReceipt(transactionHash, function(error, receipt) {
          if (!error) {
            console.log(receipt);
          }
        });
        // The vote was successful, we can disable the vote buttons
        disable();
        $('#loc_info').text('Vote submitted successfully to Akshay');
      });
    });

    function uuidToBytes32(uuid) {
      return '0x' + uuid.replace(/-/g, '');
    }
  });

});

