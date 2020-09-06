const Web3 = require("web3");
const EEAClient = require("web3-besu");
const assert = require("assert");
const ContractAbi = require("../build/Counter_abi.json");
const ContractReceipt = require("../build/Counter_receipt.json");
const { besu } = require("../wallet/keys");
const { networks } = require("../mirror-config");

describe("Counter Contract", async () => {

  let web3;
  const network = ContractReceipt.network

  before(async function() {
    const url = networks[network].host + (networks[network].port ? ':' + networks[network].port : '')
    web3 = new EEAClient(new Web3(url), networks[network].chainId || 2018);
  });

  //1. Deploying the contract
  it("Should deploy the contract", async () => {

    console.log(ContractReceipt.contractAddress)
  });

  // Get the owner of the contract
  it("Should get the owner", async () => {

    const Contract = new web3.eth.Contract(ContractAbi);
    const functionAbi = Contract._jsonInterface.find((e) => {
      return e.name === "owner";
    });

    const functionCall = {
      to: ContractReceipt.contractAddress,
      data: functionAbi.signature,
      privateFrom: networks[network].publicKey,
      privateKey: besu[network].privateKey,
      privacyGroupId: ContractReceipt.privacyGroupId
    };
    const contractOwner = await web3.eth.accounts.privateKeyToAccount(`0x${besu[network].privateKey}`);
    const transactionHash = await web3.eea.sendRawTransaction(functionCall);
    const result = await web3.priv.getTransactionReceipt(transactionHash, networks.node1.publicKey);
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
        privateFrom: networks[network].publicKey,
        privacyGroupId: ContractReceipt.privacyGroupId,
        privateKey: besu[network].privateKey,
      };

      let transactionHash = await web3.eea.sendRawTransaction(functionCall);
      let result = await web3.priv.getTransactionReceipt(transactionHash, networks[network].publicKey);
      assert.ok(result);

      const getCounterAbi = Contract._jsonInterface.find((e) => {
        return e.name === "getCounter";
      });

      const getCounterCall = {
        to: ContractReceipt.contractAddress,
        data: getCounterAbi.signature,
        privateFrom: networks[network].publicKey,
        privacyGroupId: ContractReceipt.privacyGroupId,
        privateKey: besu[network].privateKey,
      };

      transactionHash = await web3.eea.sendRawTransaction(getCounterCall);
      result = await web3.priv.getTransactionReceipt(transactionHash, networks.node1.publicKey);
      const resultOutput = web3.eth.abi.decodeParameters(getCounterAbi.outputs, result.output);
      assert.equal(resultOutput[0], 10)

    });

});
