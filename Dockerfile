# Use the official Node.js LTS image as the base image
FROM node:lts

# Create a working directory for the app
WORKDIR /app

# Copy package.json into the working directory
COPY package.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code into the working directory
COPY . .

# Copy the smart contract
COPY Voting.sol Voting.sol

# Init db and start the application
CMD node init_db.js && node index.js
