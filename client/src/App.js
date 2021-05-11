import React, {
  Component
} from "react";
import Election from "./contracts/Election.json";
import getWeb3 from "./getWeb3";
import { spacing } from '@material-ui/system';
import { Button, Container, Typography, TextField, Table , TableHead, TableRow, TableBody, TableCell, TableContainer, FormGroup   } from '@material-ui/core';

import "./App.css";

class App extends Component {
  constructor (props) {
    super (props);

    this.state = {
      storageValue: 0,
      web3: null,
      accounts: null,
      contract: null,
      candidateCount: 0,
      candidates: []
    };

    this.doVote = this.doVote.bind (this);
    this.yourVoteEventHandler = this.yourVoteEventHandler.bind (this);
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();

      console.log(accounts);
      console.log(networkId)

      const deployedNetwork = Election.networks[networkId];
      const instance = new web3.eth.Contract(
        Election.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.loadCandidates);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  doVote = async () => {
    const {accounts, contract} = this.state;
    var response = await contract.methods.vote(this.state.yourvote).send({ from: accounts[0] });
    console.log (response)
  }

  yourVoteEventHandler = (e) => {
    this.setState({
      yourvote: e.target.value
    })
  }

  loadCandidates = async () => {
    const {accounts, contract} = this.state;

    var candidateCount = await contract.methods.candidatesCount().call();
    var candidates = []
    for (var i = 1; i <= candidateCount; i++) {
      var candidate = await contract.methods.candidates(i).call();
      candidates.push (candidate)
    }

    this.setState({
      candidateCount: candidateCount,
      candidates: candidates
    })
    // Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();
    // Update state with the result.
    // this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <Typography variant="h3" component="h3">
            Election Application
        </Typography>
        
        <Container>
          <TableContainer>
          <Table>
          <TableHead>
            <TableRow>
              <TableCell>Candidate Id</TableCell>
              <TableCell>Candidate names</TableCell>
              <TableCell>Vote count</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {  
                this.state.candidates.map (c => 
                <TableRow>
                  <TableCell>{c.id}</TableCell>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>{c.voteCount}</TableCell>
                </TableRow>
              )
            }
          </TableBody>
          </Table>
          </TableContainer>
        </Container>


        <Container m="2em">

        <Typography variant="h5" component="h5">
            Vote Now
        </Typography>
         
        <form noValidate autoComplete="off">
          <FormGroup>
          <TextField label="Candidate Id" variant="outlined" value={this.state.yourvote} onChange={this.yourVoteEventHandler} />
          <Button onClick={this.doVote} color="primary" variant="contained" >Vote</Button>
          </FormGroup>
        </form>
        </Container>
      </div>
    );
  }
}

export default App;