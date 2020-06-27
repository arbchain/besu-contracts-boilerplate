# Arbchain contracts

![version](https://img.shields.io/badge/version-0.1.0beta-blue)
[![docs](https://img.shields.io/badge/docs-0.1.0-green)](https://arbchain.consensolabs.com)
[![Follow](https://img.shields.io/twitter/follow/consensolabs?style=social&logo=twitter)](https://twitter.com/consensolabs)

Contract repo structure:

```
├── contract
│   ├── SomeContract.sol
├── migration
│   ├── index.js
├── wallet
│   ├── keys.js
├── mirror-config.js
```


## Quick start

```
$ sudo npm install -g mirror-besu

git clone https://github.com/arbchain/contracts

```

### Test, compile and deploy the contract
Update the `migration/index.js` with the contracts to be deployed.

```bash

# Compile
mirror compile

# Deploy to Besu
mirror deploy

```

