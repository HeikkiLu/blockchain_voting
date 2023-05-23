# Blockchain Voting System

This is a repository for our group project in the Introduction to Blockchain course at University of Eastern Finland. We will be using the [sanattaori/techdot](https://github.com/sanattaori/techdot) Aadhar voting project as a base for our project. This project provides a starting point for building a blockchain-based voting system, and we will be adding our own modifications and features to it.

## Running the project

- Clone the project
`git clone https://github.com/HeikkiLu/blockchain_voting.git`
- Rename `voting.sol` to `Voting.sol` 😅
### Locally
1. Go into the project directory and install dependencies with `npm install`
2. Install `npm install ethereumjs-testrpc web3` and `npm install solc`
3. Install [ganache-cli](https://github.com/trufflesuite/ganache) with `npm install -g ganache-cli`
    - Ganache is a tool for creating a local blockchain for fast development with Ethereum.
4. Initialize sqlite database by running `node init_db.js`
5. Change ganache address in https://github.com/HeikkiLu/blockchain_voting/blob/662a2b01b3314db8fd8b279c1d5821529e1c69b4/index.js#L48 to `http://localhost:8545'`
6. Change `hostname` in https://github.com/HeikkiLu/blockchain_voting/blob/c776dd7dff50e51a84d1418827a68ec17fcba788/check_ganache_availibility.js#L6 to `localhost`
7. Run `ganache-cli` to create the local blockchain
8. Run the project with `node index.js`

### With docker

In the project folder:
1. `docker-compose build`
2. `docker-compose up`

Or in *nix systems:
1. Run `./restart_docker.sh` in terminal

## Default credentials
| Username | Password |
|----------|----------|
| admin    | password    |



## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
