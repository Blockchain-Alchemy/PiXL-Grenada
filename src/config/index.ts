import { NetworkType } from "@airgap/beacon-sdk";

const Config = {
  NetworkType: NetworkType.HANGZHOUNET,

  RpcUrl: "https://hangzhounet.smartpy.io",//"https://hangzhounet.api.tez.ie",

  MainnetRpcList: [
    "https://mainnet.api.tez.ie",
    "https://mainnet.smartpy.io",
    "https://rpc.tzbeta.net",
    "https://teznode.letzbake.com",
  ],

  HangzhounetRpcList: [
    "https://hangzhounet.smartpy.io",
    "https://hangzhounet.api.tez.ie",
    "https://testnet-tezos.giganode.io"
  ],

  ContractAddress: "KT1X1vmBrGb4YHNSDPzYX5QGmNDkTrfeQmH1",

  TokenId: 1,
}

export default Config;