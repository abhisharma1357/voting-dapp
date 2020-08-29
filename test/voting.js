const ProposePoll = artifacts.require('ProposePoll.sol');
const PollContract = artifacts.require('PollContract.sol');

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

       await this.tokenhold.addNewPoll("Which DeFi Project is the best ?", ["YFI","ETH LEND","YAM","AAVE"],3, {from : accounts[1]});
       this.openingTime = (await latestTime());
    });

    it('Should be able to get address of new poll contract ', async () => {

        let getUserPolls = await this.tokenhold.getUserPolls.call({from : accounts[1]});
        this.votingContractOneAddress = getUserPolls[0]; 

    });

    it("should be able to check all polls address", async()=>{
         
        let _value = await this.tokenhold.allPolls.call(0);
        assert.equal(_value,this.votingContractOneAddress);   

    });

    it('Should correctly initialize constructor of poll contract', async () => {

        this.votingOne = await PollContract.at(this.votingContractOneAddress); 

    });

    it('Should be able to check start time of voting', async () => {

        let _value = await this.votingOne.startTime.call();
        assert.equal(_value.toNumber(),this.openingTime);

    });

    it('Should not be able to check the results before voting time over', async () => {

        try {
            await this.votingOne.result();
         } catch (error) {
             var error_ = 'Returned error: VM Exception while processing transaction: revert cannot see results before voting time is over';
             assert.equal(error.message, error_, 'Reverted ');
         }
 
     });

     it('Should be able to check poll name by any one', async () => {

        let pollName = await this.votingOne.pollName.call();
        assert.equal(pollName,"Which DeFi Project is the best ?");

    });
    })
