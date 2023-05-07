# Blockchain Voting System

This is a repository for our group project in the Introduction to Blockchain course at University of Eastern Finland. We will be using the [sanattaori/techdot](https://github.com/sanattaori/techdot) Aadhar voting project as a base for our project. This project provides a starting point for building a blockchain-based voting system, and we will be adding our own modifications and features to it.

## Installation & and running

1. Clone the project
`git clone https://github.com/HeikkiLu/blockchain_voting.git`
2. Go into the project directory and install dependencies with `npm install`
3. Install `npm install ethereumjs-testrpc web3` and `npm install solc`
4. Install [ganache-cli](https://github.com/trufflesuite/ganache) with `npm install -g ganache-cli`
    - Ganache is a tool for creating a local blockchain for fast development with Ethereum.
5. Run `ganache-cli` to create the local blockchain
6. Run the project with `node index.js`

### Default credentials
| Username | Password |
|----------|----------|
| admin    | password    |

## With docker

In the project folder:
1. `docker build -t your-image-name .`
2. `docker run -p 8080:8080 --name your-container-name your-image-name`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
