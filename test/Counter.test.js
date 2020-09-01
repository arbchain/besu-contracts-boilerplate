const Web3 = require("web3");
const EEAClient = require("web3-besu");
const assert = require("assert");
const ContractAbi = require("../build/Counter_abi.json");
const ContractReceipt = require("../build/Counter_receipt.json");
const { orion, besu } = require("../wallet/keys");
const { networks } = require("../mirror-config");

describe("Counter Contract", async () => {

  let web3;

  before(async function() {
    web3 = new EEAClient(new Web3(`${networks.node1.host}:${networks.node1.port}`), 2018);
  });

  //1. Deploying the contract
  it("Should deploy the contract", async () => {

    console.log(ContractReceipt.contractAddress)
  });

  // Get the owner of the contract
  it("Should get the owner", async () => {
    const web3 = new EEAClient(new Web3(`${networks.node1.host}:${networks.node1.port}`), 2018);
    const Contract = new web3.eth.Contract(ContractAbi);
    const functionAbi = Contract._jsonInterface.find((e) => {
      return e.name === "owner";
    });

    const functionCall = {
      to: ContractReceipt.contractAddress,
      data: functionAbi.signature,
      privateFrom: orion.node1.publicKey,
      privateKey: besu.node1.privateKey,
      privacyGroupId: ContractReceipt.privacyGroupId
    };
    const contractOwner = await web3.eth.accounts.privateKeyToAccount(`0x${besu.node1.privateKey}`);
    const transactionHash = await web3.eea.sendRawTransaction(functionCall);
    const result = await web3.priv.getTransactionReceipt(transactionHash, orion.node1.publicKey);
    const resultOutput = web3.eth.abi.decodeParameters(functionAbi.outputs, result.output);
    assert.equal(contractOwner.address, resultOutput[0]);
  });

    // ii) Respondent
    it("Should increase the counter", async () => {
      const Contract = new web3.eth.Contract(ContractAbi);

      const functionAbi = Contract._jsonInterface.find((e) => {
        return e.name === "increaseCounter";
      });

      const functionArgs = web3.eth.abi
        .encodeParameters(functionAbi.inputs, [10])
        .slice(2);

      const functionCall = {
        to: ContractReceipt.contractAddress,
        data: functionAbi.signature + functionArgs,
        privateFrom: orion.node1.publicKey,
        privacyGroupId: ContractReceipt.privacyGroupId,
        privateKey: besu.node1.privateKey,
      };

      let transactionHash = await web3.eea.sendRawTransaction(functionCall);
      let result = await web3.priv.getTransactionReceipt(transactionHash, orion.node1.publicKey);
      assert.ok(result);

      const getCounterAbi = Contract._jsonInterface.find((e) => {
        return e.name === "getCounter";
      });

      const getCounterCall = {
        to: ContractReceipt.contractAddress,
        data: getCounterAbi.signature,
        privateFrom: orion.node1.publicKey,
        privacyGroupId: ContractReceipt.privacyGroupId,
        privateKey: besu.node1.privateKey,
      };

      transactionHash = await web3.eea.sendRawTransaction(getCounterCall);
      result = await web3.priv.getTransactionReceipt(transactionHash, orion.node1.publicKey);
      const resultOutput = web3.eth.abi.decodeParameters(getCounterAbi.outputs, result.output);
      assert.equal(resultOutput[0], 10)

    });

});
