# study-dapp
Study DApp

## Installation
1. Install Ganache (Local blockchain)
2. Install MetaMask and connect to your local Ganache blockchain
```https://www.youtube.com/watch?v=nUEBAS5r4Og```
4. Config Truffle networks (truffle-config.js) to your Ganache blockchain 
```
networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    }
  }
```
4. Compile & deploy your contract 
```truffle compile```
```truffle migrate```
5. Check your contract has deployed to your local blockchain (Ganache -> Contracts)
5. Run the client
```
cd client
rpm start
```
