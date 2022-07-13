import { useCallback } from 'react';
import { MichelsonMap, compose } from '@taquito/taquito';
import { char2Bytes } from '@taquito/utils';
import { tzip12 } from "@taquito/tzip12";
import { tzip16 } from "@taquito/tzip16";
import { Contracts } from 'config';
import { useTezosContext } from "./useTezosContext";

const useGame = () => {
  const { tezos, walletAddress } = useTezosContext()!;

  const getWalletItems = useCallback((tokenId: number) => {
    const walletItems = async () => {
      const contract = await tezos.contract.at(Contracts.PixlGame, compose(tzip16, tzip12));
      const storage: any = await contract.storage();
      const value = await storage.ledger.get({ 0: walletAddress, 1: tokenId });
      console.log('value', value);
      if (value) {
        //const metadata = await contract.tzip12().getTokenMetadata(tokenId);
        return {
          tokenId,
          metadata: {
            token_id: tokenId,
            decimals: 0,
            name: "Health Potion",
            displayUri: "ipfs://QmNNtaYpP1N8tPdJCiDSCnzx8n8yEd8Qm6rx7vYwFji2qy",
          },//metadata as Metadata,
          amount: value,
        };
      }
      return null;
    }
    return walletItems();
  }, [tezos, walletAddress]);

  const mintItem = useCallback((tokenId, itemName) => {
    const mint = async () => {
      let params: any = [{
        amount: 1,
        to_: walletAddress,
        token: {
          existing: tokenId,
        },
      }];
      if (tokenId === null || tokenId === undefined) {
        params = [{
          amount: 1,
          to_: walletAddress,
          token: {
            new: MichelsonMap.fromLiteral({
              name: char2Bytes(itemName),
              decimals: char2Bytes('0'),
              symbol: char2Bytes(itemName),
            }),
          },
        }];
      }

      const contract = await tezos.wallet.at(Contracts.PixlGame);
      const op = await contract.methods.mint(params).send();
      return await op.confirmation();
    }
    return mint();
  }, [tezos, walletAddress]);

  return {
    mintItem,
    getWalletItems,
  };
};

export default useGame;
