import {networks} from '../mirror-config.js';
// Update the PUBLIC_NODES list with the orion public keys of the network else all the nodes (i.e marked group=1)
// from the mirror-config.js will be picked to create a privacy group
let PUBLIC_NODES = []
const group = 3
for (const node in networks) {
    if(networks[node].group===group)
    PUBLIC_NODES.push(networks[node].publicKey)
}

module.exports = {
    contracts: {
        Counter: {args: [0], privacyGroupMembers: [networks.node1.publicKey, networks.node3.publicKey]},
    },
    groups: {
        public: {privacyGroupMembers: PUBLIC_NODES},
    }

};
