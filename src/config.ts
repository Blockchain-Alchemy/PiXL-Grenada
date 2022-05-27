import { NetworkType } from "@airgap/beacon-sdk";

const Network = {
  networkType: NetworkType.HANGZHOUNET,

  rpcUrl: "https://hangzhounet.smartpy.io",//"https://hangzhounet.api.tez.ie",

  mainnetRpcList: [
    "https://mainnet.api.tez.ie",
    "https://mainnet.smartpy.io",
    "https://rpc.tzbeta.net",
    "https://teznode.letzbake.com",
  ],

  hangzhounetRpcList: [
    "https://hangzhounet.smartpy.io",
    "https://hangzhounet.api.tez.ie",
    "https://testnet-tezos.giganode.io"
  ],

  contractAddress: "KT1X1vmBrGb4YHNSDPzYX5QGmNDkTrfeQmH1",

  tokenId: 1,
}

export default Network;