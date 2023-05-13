$(document).ready(function() {
$('.modal').modal();
	// $.ajax({
 //    url: '/getaddress',
 //    method: 'post'
	// }).done(function(){
	// 	console.log('done');
	// });


	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	abi = JSON.parse('[{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]')
	VotingContract = web3.eth.contract(abi);
	contractInstance = VotingContract.at('0xa7fb89a3fe6927b6d272637b148775f6fee5a8cf');
	// candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"}


	//check cookie
	function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
	}

	const userUuid = readCookie('uuid');
  const uuidBytes32 = web3.fromAscii(userUuid);

  function disable() {
    $('#vote1').addClass( "disabled" );
    $('#vote2').addClass( "disabled" );
    $('#vote3').addClass( "disabled" );
    $('#vote4').addClass( "disabled" );
    
    //logout
    document.cookie = "show=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC";
    document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    // invalidate the UUID
    document.cookie = "uuid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    window.location = '/';
}

$('#vote1').click(function(){
    contractInstance.voteForCandidate('Sanat', uuidBytes32, {from: web3.eth.accounts[0]}, function() {
        // Notify the server that the user has voted
        $.post('/vote', { username: "admin" }, function(res) {
            if (res.message === 'Vote cast') {
                alert('Vote submitted to Sanat');
                disable();
                $('#loc_info').text('Vote submitted successfully to Sanat');
            } else {
                alert('Failed to cast vote: ' + res.message);
            }
        }).fail(function() {
            alert('Failed to communicate with server');
        });
    });
})
$('#vote2').click(function(){
    contractInstance.voteForCandidate('Aniket', uuidBytes32, {from: web3.eth.accounts[0]}, function() {
        // Notify the server that the user has voted
        $.post('/vote', { username: "admin" }, function(res) {
            if (res.message === 'Vote cast') {
                alert('Vote submitted to Aniket');
                disable();
                $('#loc_info').text('Vote submitted successfully to Aniket');
            } else {
                alert('Failed to cast vote: ' + res.message);
            }
        }).fail(function() {
            alert('Failed to communicate with server');
        });
    });
})

$('#vote3').click(function(){
    contractInstance.voteForCandidate('Mandar', uuidBytes32, {from: web3.eth.accounts[0]}, function() {
        // Notify the server that the user has voted
        $.post('/vote', { username: "admin" }, function(res) {
            if (res.message === 'Vote cast') {
                alert('Vote submitted to Mandar');
                disable();
                $('#loc_info').text('Vote submitted successfully to Mandar');
            } else {
                alert('Failed to cast vote: ' + res.message);
            }
        }).fail(function() {
            alert('Failed to communicate with server');
        });
    });
})

$('#vote4').click(function(){
    contractInstance.voteForCandidate('Akshay', uuidBytes32, {from: web3.eth.accounts[0]}, function() {
        // Notify the server that the user has voted
        $.post('/vote', { username: "admin" }, function(res) {
            if (res.message === 'Vote cast') {
                alert('Vote submitted to Akshay');
                disable();
                $('#loc_info').text('Vote submitted successfully to Akshay');
            } else {
                alert('Failed to cast vote: ' + res.message);
            }
        }).fail(function() {
            alert('Failed to communicate with server');
        });
    });
})
})
