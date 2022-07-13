import { useCallback } from "react";
import { compose } from "@taquito/taquito";
import { tzip12 } from "@taquito/tzip12";
import { tzip16 } from "@taquito/tzip16";
import { Contracts, PixlTokens } from "config";
import { useTezosContext } from "./useTezosContext";

const contractAddress = Contracts.Pixltez;

const usePixltez = () => {
  const { tezos, walletAddress } = useTezosContext()!;

  const findEntryCoin = useCallback(() => {
    if (tezos && walletAddress) {
      return tezos.contract.at(contractAddress, compose(tzip16, tzip12))
        .then(contract => {
          return contract.storage()
        })
        .then((storage: any) => {
          return storage.ledger.get({ 0: walletAddress, 1: PixlTokens.InitCoin });
        })
        .then(val => {
          return !!val;
        })
    } else {
      return Promise.reject('Please connect your wallet');
    }
  }, [tezos, walletAddress]);

  return {
    findEntryCoin,
  };
};

export default usePixltez;
