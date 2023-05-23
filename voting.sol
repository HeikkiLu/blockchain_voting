pragma solidity ^0.4.11;

contract Voting {

  mapping (bytes32 => uint8) public votesReceived;
  mapping (bytes32 => bool) public hasVoted;

  bytes32[] public candidateList;

  // Voting start time
  uint256 public votingStartTime;
  // Voting end time
  uint256 public votingEndTime;

  function Voting(bytes32[] candidateNames, uint256 _votingStartTime, uint256 votingDurationWeeks) public {
    candidateList = candidateNames;
    votingStartTime = _votingStartTime;
    votingEndTime = votingStartTime + (votingDurationWeeks * 1 weeks);
  }

  function totalVotesFor(bytes32 candidate) returns (uint8) {
    if (validCandidate(candidate) == false) throw;
    return votesReceived[candidate];
  }

  // Check if voting period has ended and if user has already voted
  function voteForCandidate(bytes32 candidate, bytes32 userUuid) {
    if (validCandidate(candidate) == false) throw;
    if (hasVoted[userUuid]) throw;
    if (now < votingStartTime || now > votingEndTime) throw; // If it's not the voting period, revert the transaction

    votesReceived[candidate] += 1;
    hasVoted[userUuid] = true;
  }

  function validCandidate(bytes32 candidate) returns (bool) {
    for(uint i = 0; i < candidateList.length; i++) {
      if (candidateList[i] == candidate) {
        return true;
      }
    }
    return false;
  }

  function getUserVotingStatus(bytes32 user) public view returns (bool) {
      return hasVoted[user];
  }

  function getVotingEndTime() public view returns (uint256) {
    return votingEndTime;
  }

  function getVotingStartTime() public view returns (uint256) {
    return votingStartTime;
  }
}

