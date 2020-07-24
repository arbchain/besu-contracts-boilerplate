const path = require("path");

module.exports = {
  // See <http://arbchain.consensolabs.com/docs/mirror>
  // to customize your Besu Mirror configuration!
  contracts_build_directory: path.join(__dirname, "build"),
  networks: {

    node1: {
      host: 'http://testnet.besu.consensolabs.com',
      port: 20000,
      publicKey: "A1aVtMxLCUHmBVHXoZzzBgPbW/wj5axDpW9X8l91SGo=",
    },
    node2: {
      host: 'http://testnet.besu.consensolabs.com',
      port: 20002,
      publicKey: "Ko2bVqD+nNlNYL5EE7y3IdOnviftjiizpjRt+HTuFBs=",
    },
    node3: {
      host: 'http://testnet.besu.consensolabs.com',
      port: 20004,
      publicKey: "k2zXEin4Ip/qBGlRkJejnGWdP9cjkK+DAvKNW31L2C8=",
    }

  },
  // Configure your compilers
  compilers: {
    solc: {
      version: "0.6.6", // Fetch exact version from solc-bin (default: truffle's version)
      docker: false, // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {
        // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 200,
        },
        evmVersion: "constantinople",
      },
    },
  },
};
