import { DayPassToken, REACT_APP_PIXL_DAY_PASS_CONTRACT } from "config";
import {useCallback} from "react";
import useBeacon from "./useBeacon";

const contractAddress = REACT_APP_PIXL_DAY_PASS_CONTRACT;

const useDayPass = () => {
  const { tezos, walletAddress } = useBeacon();

  const mintDayPass = useCallback(() => {
    if (tezos && walletAddress) {
      const params = [{
        amount: 1,
        to_: walletAddress,
        token: {
          existing: DayPassToken.DayPass,
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
    }
  }, [tezos, walletAddress]);

  return {
    mintDayPass,
  };
};

export default useDayPass;
