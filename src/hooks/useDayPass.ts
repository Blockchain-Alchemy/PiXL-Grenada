import { Contracts, DayPassToken } from "config";
import {useCallback} from "react";
import useBeacon from "./useBeacon";

const contractAddress = Contracts.Pixltez;

const useDayPass = () => {
  const { tezos, walletAddress } = useBeacon();

  const mintToken = useCallback((tokenId: DayPassToken) => {
    if (tezos && walletAddress) {
      const params = [{
        amount: 1,
        to_: walletAddress,
        token: {
          existing: tokenId,
        }
      }]
      return tezos.wallet.at(contractAddress)
        .then(contract => {
          return contract.methods.mint(params).send();
        })
        .then(op => op.confirmation())
        .then(result => {
          console.log("Mint result:", result)
          return result;
        })
    } else {
      return Promise.reject('Please connect your wallet');
    }
  }, [tezos, walletAddress]);

  return {
    mintToken,
  };
};

export default useDayPass;
