# Use the official Node.js LTS image as the base image
FROM node:lts

# Create a working directory for the app
WORKDIR /app

# Copy package.json and package-lock.json into the working directory
COPY package.json package-lock.json ./

# Install the dependencies and ganache-cli
RUN npm ci && npm install -g ganache-cli

# Copy the rest of the application code into the working directory
COPY . .

# Expose the port the app will run on and the ganache-cli port
EXPOSE 3000 8545

# Install the "concurrently" package to run multiple processes
RUN npm install -g concurrently

# Copy the smart contract
COPY Voting.sol Voting.sol

# Start the application and ganache-cli concurrently
CMD ["concurrently", "node index.js", "ganache-cli"]

