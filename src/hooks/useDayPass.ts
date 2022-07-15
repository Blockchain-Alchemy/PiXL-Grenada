import { useCallback } from 'react';
import moment from 'moment';
import { Contracts, DayPassToken } from 'config';
import { useTezosContext } from './useTezosContext';

const contractAddress = Contracts.DayPass;

const useDayPass = () => {
  const { tezos, walletAddress } = useTezosContext()!;

  const mintToken = useCallback(
    (tokenId: DayPassToken) => {
      console.log(`mintToken tokenId=${tokenId}`);
      const mint = async () => {
        const params = [
          {
            amount: 1,
            to_: walletAddress,
            token: {
              existing: tokenId,
            },
          },
        ];
        const contract = await tezos.wallet.at(contractAddress);
        const op = await contract.methods.mint(params).send();
        const tx = await op.confirmation();
        console.log('Mint result:', tx);
        return tx;
      };
      return tezos && walletAddress
        ? mint()
        : Promise.reject('Please connect your wallet');
    },
    [tezos, walletAddress]
  );

  const getTokenTime = useCallback(
    (tokenId: DayPassToken) => {
      console.log(`checkTokenTime tokenId=${tokenId}`);
      const getToken = async () => {
        const contract = await tezos.wallet.at(contractAddress);
        const storage: any = await contract.storage();
        const token = await storage.token_times.get({
          0: walletAddress,
          1: tokenId,
        });
        console.log('DayPass Token:', token);
        return token ? moment(token) : null;
      };
      return tezos && walletAddress
        ? getToken()
        : Promise.reject('Please connect your wallet');
    },
    [tezos, walletAddress]
  );

  return {
    mintToken,
    getTokenTime,
  };
};

export default useDayPass;
