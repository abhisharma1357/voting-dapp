const ProposePoll = artifacts.require('ProposePoll.sol');


const { increaseTimeTo, duration } = require('openzeppelin-solidity/test/helpers/increaseTime');
const { latestTime } = require('openzeppelin-solidity/test/helpers/latestTime');

var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var Web3Utils = require('web3-utils');

contract('ProposePoll Contract', async (accounts) => {


    it('Should correctly initialize constructor of proposepoll Contract', async () => {

        this.tokenhold = await ProposePoll.new( { gas: 600000000 });

    });

    it('Should be able to add new poll by any account', async () => {

       this.polladdress =  await this.tokenhold.addNewPoll("Which DeFi Project is the best ?", ["YFI","ETH LEND","YAM","AAVE"],3, {from : accounts[1]});
       console.log(polladdress); 
    });

    // it('Should be able to add new poll by any account', async () => {

    //     await this.tokenhold.addNewPoll("Which DeFi Project is the best ?", ["YFI","ETH LEND","YAM","AAVE"],3, {from : accounts[1]});

    // });

})
