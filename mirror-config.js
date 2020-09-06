const path = require("path");

module.exports = {
  // See <http://arbchain.consensolabs.com/docs/mirror>
  // to customize your Besu Mirror configuration!
  contracts_build_directory: path.join(__dirname, "build"),
  networks: {

    node1: {
      host: 'http://testnet2.arbchain.xyz',
      port: 20000,
      publicKey: "A1aVtMxLCUHmBVHXoZzzBgPbW/wj5axDpW9X8l91SGo=",
      chainId: 2018,
      group: 1
    },
    node2: {
      host: 'http://testnet2.arbchain.xyz',
      port: 20002,
      publicKey: "Ko2bVqD+nNlNYL5EE7y3IdOnviftjiizpjRt+HTuFBs=",
      chainId: 2018,
      group: 1
    },
    node3: {
      host: 'http://testnet2.arbchain.xyz',
      port: 20004,
      publicKey: "k2zXEin4Ip/qBGlRkJejnGWdP9cjkK+DAvKNW31L2C8=",
      chainId: 2018,
      group: 1
    },
    kaleido: {
      host: 'https://a0d4ty1dtw:jtZxY8xDafjre35XF9Po3TIW4n-8p8OpF-4YzGbDwas@a0z1cp7i3u-a0wut077if-rpc.au0-aws.kaleido.io/',
      publicKey: "HE6bbc3yFetK9zRje5gQrQnT/reHdjO/lyqBip/TEA4=",
      chainId: 1163827674,
      group: 2
    },
    node1_onchain : {
      host: 'http://testnet2.arbchain.xyz',
      port: 20000,
      publicKey: "A1aVtMxLCUHmBVHXoZzzBgPbW/wj5axDpW9X8l91SGo=",
      chainId: 2018,
      group: 3
    },
    

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
