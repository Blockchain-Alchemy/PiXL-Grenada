import axios from 'axios';
import { API_BASE_URL } from '../config';

export const mintPixltez = async (address: string, amount: number) => {
  const url = `${API_BASE_URL}/api/contract/airdrop/pixltez`;
  const payload = {
    addresses: [address],
    amount,
  };
  console.log('mintPixltez', address, amount);

  return axios
    .post(url, payload)
    .then(res => {
      console.log('~~~~~~~~~~~~~~~~~res', res)
      return res.data;
    })
};

/*export const mintItem = async (
  Tezos: TezosToolkit,
  userAddress: string,
  itemName: string
) => {
  const contractAddress = REACT_APP_PIXL_GAME_CONTRACT;
  console.log('mintItem, contract:', contractAddress);

  try {
    const contract = await Tezos.wallet.at(contractAddress);

    const tokenId = await getTokenId(itemName);
    console.log('mintItem, tokenId', tokenId);

    let data: any[] = [];
    if (tokenId === null || tokenId === undefined) {
      data = [
        {
          amount: 1,
          to_: userAddress,
          token: {
            new: MichelsonMap.fromLiteral({
              name: char2Bytes(itemName),
              decimals: char2Bytes('0'),
              symbol: char2Bytes(itemName),
            }),
          },
        },
      ];
    } else {
      data = [
        {
          amount: 1,
          to_: userAddress,
          token: {
            existing: tokenId,
          },
        },
      ];
    }

    const op = await contract.methods.mint(data).send();
    const result = await op.confirmation();
    if (result) {
      console.log('result', result);
      await updateMintResult(userAddress, itemName);

      return {
        name: itemName, //"Tezzard",
        imageSrc: '/whitney-with-microphone.png',
        alt: 'Placeholder',
      } as ItemType;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};*/

/*async mintItemNFT(Tezos: TezosToolkit, userAddress: string, itemName: string) {
    const contractAddress = REACT_APP_PIXL_GAME_CONTRACT;
    console.log("mintItem");

    try {
        const contract = await Tezos.wallet.at(contractAddress);

        const data = [
            {
                metadata: MichelsonMap.fromLiteral({
                    'name': char2Bytes(itemName),
                    'description': char2Bytes(itemName),
                    '': char2Bytes('ipfs://QmTdbU5JRqdGwDG5wdTwK3KdJzED12NWD81nCQnn1p25TU')
                }),
                to_: userAddress,
            }
        ]

        const op = await contract.methods.mint(data).send()
        const result = await op.confirmation();
        if (result) {
            await this.updateMintResult(userAddress, itemName);

            return {
                name: itemName, //"Tezzard",
                imageSrc: "/whitney-with-microphone.png",
                alt: "Placeholder",
            } as ItemType;
        }
    } catch (err) {
        console.error(err);
        return null;
    }
}*/

export const getTokenId = async (itemName: string) => {
  const url = `${API_BASE_URL}/api/contract/token`;
  return axios
    .post(url, { name: itemName })
    .then((res) => {
      console.log('getTokenId-res', res);
      return res.data?.token?.tokenId;
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
};

export const updateMintResult = async (userAddress: string, itemName: string) => {
  const url = `${API_BASE_URL}/api/contract/mint`;
  const payload = [{
    name: itemName,
    address: userAddress,
    amount: 1,
  }];
  return axios
    .post(url, payload)
    .then((res) => {
      console.log('res', res);
      return res.data;
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
};

export const shareQuest = async (questDetails: any, Id: any) => {
  // on a successful transfer the api should return use the object details so that we can display it to the user
  const result = await fetch(`${API_BASE_URL}/api/transfer/shareQuest`, {
    mode: 'no-cors',
    method: 'POST',
    body: JSON.stringify({ questDetails, Id }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  //result will be empty due to cors. Won't be an issue when both are hosted
  return result;
};
