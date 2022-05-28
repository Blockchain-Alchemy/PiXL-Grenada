import { compose, TezosToolkit } from "@taquito/taquito";
import { tzip12 } from "@taquito/tzip12";
import { tzip16 } from "@taquito/tzip16";
import { ItemType, Metadata, TokenInfo } from "../types";
import {
  REACT_APP_INITCOIN_CONTRACT,
  REACT_APP_INITCOIN_TOKENID,
  REACT_APP_OBJKT_CONTRACT,
} from "../config";
import { getLegderKeys } from "./ledger";

const RequestedItemArray = [
  { value: "Beets Token", tokenId: 10000, contract: "k1...." },
];

const UtilityItemMapper = [
  { value: 0, tokenId: 1, description: "Health potion" },
];

export const findInitialCoin = async (
  Tezos: TezosToolkit,
  userAddress: string
) => {
  let coins: { name: string; imageSrc: string; alt: string; id: number }[] = [];
  // Contract Hard Coded here
  const contractAddress = REACT_APP_INITCOIN_CONTRACT;
  const tokenId = REACT_APP_INITCOIN_TOKENID;
  const contract = await Tezos.contract.at(
    contractAddress,
    compose(tzip16, tzip12)
  );

  console.log(`Fetching the token metadata for the token ID ${tokenId}...`);
  // const metatData = await contract.tzip12().getTokenMetadata(1);
  const storage: any = await contract.storage();
  const ledger = storage.ledger || storage.accounts;
  // Token ID (1)
  const val = await ledger.get({ 0: userAddress, 1: tokenId });
  // Token ID (3)
  const val2 = await ledger.get({ 0: userAddress, 1: 3 });
  if (!val && !val2) {
    return;
  }
  if (val2) {
    coins.push({
      name: "entry token",
      imageSrc:
        "https://cloudflare-ipfs.com/ipfs/QmeHk5t7csY793KM9sRiWwsGENhzhf5jJoiZrjweSw2AQB",
      alt: "entry Token",
      id: 1,
    });
  }
  if (val) {
    coins.push({
      alt: "Entry Coin for PiXL RPG\nCreated by Lex (@LexUnity)\n\nHOW IT WORKS\nIn order to gain access to the PiXL game world you need to have at least one of these coins in your wallet. You can only use one, so having more than one will not help you, share/sell your extra coins if you have a few. \n\nThe aim of PiXL is to be a play-to-earn game that’s accessible to all. Once a week, (Fridays at 5p PST) the top offers and random offers will be accepted and receive a coin. There will be tons of opportunities to get an entry coin. For the latest - follow @PiXLtez \n\n----\n\nPlay PiXL: PiXL.xyz\n\nEntry Coin concept adapted from Beets (@wideawakebeets)\n\nCoin design by: Elin Hohler \n",
      imageSrc:
        "https://cloudflare-ipfs.com/ipfs/QmPTFsFgEYfS3VV9uaTWfWUQGVqbaHa1t2npBUQZ4NiAvP",
      name: "PiXL Entry Coin: 1st Edition | Ultra-Rare",
      id: 0,
    });
  }
  return coins;
};

export const findItems = async (Tezos: TezosToolkit, userAddress: string) => {
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

    const contract = await Tezos.contract.at(
      contractAddress,
      compose(tzip16, tzip12)
    );
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
};

export const counter = (count: number) => {
  return new Array(count).fill(0);
};

export const buildCards = (tokenList: TokenInfo[]) => {
  return tokenList.reduce((prev: ItemType[], token: TokenInfo) => {
    const { metadata } = token;
    const cards = counter(token.amount).map(
      (value: number, index: number) => {
        return {
          name: metadata.name as string,
          imageSrc: createImageSrc(metadata.displayUri) as string,
          alt: `${metadata.token_id.toString()}_${index}`,
          unityCardIdentifier: findUnityCardIdentifier(
            metadata.token_id
          ),
        } as ItemType;
      }
    );
    console.log("cards", cards);
    return prev.concat(cards);
  }, []);
};

export const createImageSrc = (artifactUri: string | undefined) => {
  if (artifactUri) {
    return "https://cloudflare-ipfs.com/ipfs/" + artifactUri.split("//")[1];
  } else {
    return "error";
  }
};

export const findUnityCardIdentifier = (id: number) => {
  return (
    UtilityItemMapper.find((item) => item.value === id)?.tokenId ||
    undefined
  );
};

export const reInsertCard = (sentItemId: string) => {
  const element = document.getElementById(sentItemId);
  if (element) {
    element.className = "card animate__animated animate__backInDown";
  }
}

export const getRequestedItem = async (
  Tezos: TezosToolkit,
  userAddress: string,
  requestedToken: string
) => {
  const requestedTokenArray = RequestedItemArray.find(
    (item) => item.value === requestedToken
  );
  if (requestedTokenArray) {
    let coin: { name: string; imageSrc: string; alt: string; id: number }[] =
      [];
    const contractAddress = REACT_APP_INITCOIN_CONTRACT;
    const tokenId = 1;
    const contract = await Tezos.contract.at(
      contractAddress,
      compose(tzip16, tzip12)
    );

    console.log(`Fetching the token metadata for the token ID ${tokenId}...`);
    // const metatData = await contract.tzip12().getTokenMetadata(1);
    const storage: any = await contract.storage();
    const ledger = storage.ledger || storage.accounts;
    const val2 = await ledger.get({ 0: userAddress, 1: 3 });
    if (!val2) {
      return;
    }
    if (val2) {
      coin.push({
        name: "entry token",
        imageSrc:
          "https://cloudflare-ipfs.com/ipfs/QmeHk5t7csY793KM9sRiWwsGENhzhf5jJoiZrjweSw2AQB",
        alt: "entry Token",
        id: 1,
      });
    }
    return coin;
  } else {
    return undefined;
  }
}