import { MichelsonMap } from '@taquito/taquito';
import { char2Bytes } from '@taquito/utils';
import { Contracts } from 'config';
import { useCallback } from 'react';
import useBeacon from './useBeacon';

const contractAddress = Contracts.PixlGame;

const useGame = () => {
  const { tezos, walletAddress } = useBeacon();

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
