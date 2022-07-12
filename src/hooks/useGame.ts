import { useCallback } from 'react';
import { MichelsonMap } from '@taquito/taquito';
import { char2Bytes } from '@taquito/utils';
import { compose } from "@taquito/taquito";
import { tzip12 } from "@taquito/tzip12";
import { tzip16 } from "@taquito/tzip16";
import { Contracts } from 'config';
import { useTezosContext } from "./useTezosContext";
import {
  TOKEN_INITCOIN,
  REACT_APP_PIXLTEZ_CONTRACT,
  REACT_APP_OBJKT_CONTRACT,
} from "../config";

const contractAddress = Contracts.PixlGame;

const useGame = () => {
  const { tezos, walletAddress } = useTezosContext()!;

  /*const findItems = useCallback(() => {
    const contractAddress = REACT_APP_OBJKT_CONTRACT;
    console.log("findItems", contractAddress);
  
    try {
      const keysRes = await getLegderKeys(contractAddress, userAddress);
      console.log("ledger-keys", keysRes);
      if (!keysRes || !keysRes.success) {
        return null;
      }
      const tokenIds = keysRes.keys.map((it: any) => it.key);
      console.log("ledger-keys-tokenIds", tokenIds);
  
      const contract = await tezos.contract.at(contractAddress, compose(tzip16, tzip12));
      const storage: any = await contract.storage();
      const ledger = storage.ledger || storage.accounts;
      console.log("ledger", ledger);
  
      const tokenList: TokenInfo[] = [];
      for (let tokenId of tokenIds) {
        console.log(`Request tokenId: ${tokenId}`);
        const amount = await ledger.get(tokenId);
        if (amount) {
          console.log(`tokenId: ${tokenId}, value: ${amount}`);
          // Get val [bigmap], Find Quantity, create object to return.
          const metadata = await contract.tzip12().getTokenMetadata(tokenId);
          console.log("metadata", metadata);
          tokenList.push({
            tokenId,
            metadata: metadata as Metadata,
            amount: 1,
          } as TokenInfo);
        }
      }
      return tokenList;
    } catch (err) {
      console.error(err);
      return null;
    }
  };*/

  const mintItem = useCallback(
    (tokenId, itemName) => {
      if (tezos && walletAddress) {
        const params =
          tokenId === null || tokenId === undefined
            ? [
                {
                  amount: 1,
                  to_: walletAddress,
                  token: {
                    new: MichelsonMap.fromLiteral({
                      name: char2Bytes(itemName),
                      decimals: char2Bytes('0'),
                      symbol: char2Bytes(itemName),
                    }),
                  },
                },
              ]
            : [
                {
                  amount: 1,
                  to_: walletAddress,
                  token: {
                    existing: tokenId,
                  },
                },
              ];

        return tezos.wallet
          .at(contractAddress)
          .then((contract) => {
            return contract.methods.mint(params).send();
          })
          .then((op) => {
            return op.confirmation();
          })
          .then((result) => {
            console.log('mintItem', result);
            return result;
          });
      } else {
        return Promise.reject('Please connect your wallet');
      }
    },
    [tezos, walletAddress]
  );

  return {
    mintItem,
  };
};

export default useGame;
