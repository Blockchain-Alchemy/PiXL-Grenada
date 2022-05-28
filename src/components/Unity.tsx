import React, { useEffect, useState } from 'react';
import '../../App.css';
import Unity, { UnityContext } from 'react-unity-webgl';
import { Tzip12Module } from '@taquito/tzip12';
import { Tzip16Module } from '@taquito/tzip16';
import toast, { Toaster } from 'react-hot-toast';
import Lang from 'lang/en';
import Loading from './Loading';
// import Items from "./Items";
import HelpMessage from './HelpMessage';
import EntryCoin from './EntryCoin';
import LoadingBar from './LoadingBar';
import useBeacon from 'hooks/useBeacon';
import {
  buildCards,
  findInitialCoin,
  findItems,
  getRequestedItem,
  isQuestValid,
  mintItem,
  mintPixltez,
  reInsertCard,
  setGraveyardEntry,
  shareQuest,
  updateQuestStatus,
} from 'services';
import { TokenInfo } from 'types';

export type ItemType = {
  name: string;
  imageSrc: string;
  alt: string;
  id?: number;
  unityCardIdentifier?: number;
};

const unityContext = new UnityContext({
  loaderUrl: 'Build/1.loader.js',
  dataUrl: 'Build/1.data',
  frameworkUrl: 'Build/1.framework.js',
  codeUrl: 'Build/1.wasm',
});

const UnityComponent = () => {
  const { tezos, connected, address: userAddress } = useBeacon();
  const [walletReady, setWhereWallet] = useState<boolean>(false);
  const [isLoadingCards, setIsLoadingCards] = useState<boolean>(false);
  const [progression, setProgression] = useState(0);
  const [isInventoryFull, setInventoryFull] = useState(false);
  const [sentItemId, setSentItemId] = useState('');
  const [running, setRunning] = useState(false);
  const [coin, setCoin] = useState<Array<ItemType>>([]);
  const [gameItems, setGameItems] = useState<Array<ItemType>>([]);

  document.onfullscreenchange = function (event) {
    unityContext.setFullscreen(false);
  };

  unityContext.on('WhereWallet', function (userName, score) {
    if (userAddress && !connected) {
      unityContext.send('AccessController', 'ConnectWallet', userAddress);
    } else if (!walletReady) {
      setWhereWallet(true);
    }
  });

  unityContext.on('GameOver', function (userName, score) {
    gameOver(userName, score);
  });

  unityContext.on('MintThis', async (itemName: string) => {
    if (itemName) {
      await onMintThis(itemName);
    }
  });

  unityContext.on('MintPiXLtez', async (amount: number) => {
    await onMintPixltez(amount);
  });

  unityContext.on('ShareQuest', async (questDetails, Id) => {
    const result = await shareQuest(questDetails, Id).catch((error) => {
      toast.error("Server Didn't Respond, contact the admin");
    });
    if (result) {
      alert('Quest has been shared');
    }
  });

  unityContext.on('progress', function (progression) {
    setProgression(progression);
  });

  unityContext.on('QuestCompleted', async function (questId: string) {
    console.log('OnQuestCompleted:', questId);
    if (!running && userAddress) {
      const isValid = await isQuestValid(questId);
      if (!isValid) {
        toast.error('Invalid Quest not saved');
        return;
      }
      try {
        setRunning(true);
        const updateStatus = await updateQuestStatus(
          questId,
          userAddress,
          'COMPLETED'
        );
        if (updateStatus.errorMessage) {
          toast.error(updateStatus.errorMessage);
        } else {
          toast.success(`Quest ${updateStatus.questName} completed and saved`);
        }
      } catch (err) {
        console.error(err);
      }
      setRunning(false);
    }
  });

  unityContext.on('GotItem', function (itemId: number) {
    console.log('OnGotItem', itemId);
    const items = gameItems.filter((item) => item.alt !== itemId.toString());
    setGameItems(items);
    setInventoryFull(false);
    toast.success('Item has been added your inventory');
  });

  unityContext.on('InventoryFull', function () {
    // setInventoryFull(true); //not sure if this is needed
    reInsertCard(sentItemId);
  });

  unityContext.on('RequestItem', async (item: string) => {
    console.log('OnRequestItem', item);
    if (tezos && userAddress) {
      toast.success('Looking for Beets Entry Token');

      const result = await getRequestedItem(tezos, userAddress, item);
      if (result) {
        unityContext.send('GameController', 'ActivateEvent', 'Has Beets Token');
      }
      toast.success('Beets Entry token found click on the token to enter');

      setGameItems([
        {
          alt: Lang.entryCoinAlt,
          imageSrc:
            'https://cloudflare-ipfs.com/ipfs/QmeHk5t7csY793KM9sRiWwsGENhzhf5jJoiZrjweSw2AQB',
          name: Lang.entryCoinName,
          id: 1,
        },
      ]);
    }
  });

  const onMintThis = async (itemName: string) => {
    console.log('MintThis:', itemName);
    if (running) {
      return;
    }
    if (tezos && userAddress) {
      setRunning(true);

      const result = await mintItem(tezos, userAddress, itemName);
      console.log('mintContract', result);
      if (result) {
        setGameItems([...gameItems, result]);
        //setRerender(Math.random());

        toast.success(`Item ${itemName} has been successfully minted`);
        unityContext.send('GameController', 'ItemMinted', itemName);
      } else {
        toast.error(`Failed to mint item ${itemName}`);
        unityContext.send('GameController', 'SendError', 'Failed to mint item');
      }
      setRunning(false);
    }
  };

  const onMintPixltez = async (amount: number) => {
    console.log('MintPiXLtez', amount);
    if (running) {
      return;
    }
    if (userAddress) {
      try {
        setRunning(true);
        const result = await mintPixltez(userAddress, amount);
        if (result && result.success) {
          toast.success('PiXLtez has been successfully minted');
          unityContext.send('GameController', 'PiXLtezMinted', amount);
        } else {
          unityContext.send(
            'GameController',
            'SendError',
            'Failed to mint PiXLtez'
          );
          toast.error('Failed to mint PiXLtez');
        }
      } catch (err) {
        console.error(err);
      }
      setRunning(false);
    }
  };

  const gameOver = async (userName: string, score: string) => {
    const result = await setGraveyardEntry(userName, score).catch((error) => {
      // toast.error("Graveyard is having issues");
    });
    if (result) {
      alert('Your death has been added to The Graveyard');
    }
  };

  const buildCards_ = async (tokenList: TokenInfo[]) => {
    console.log('metaDataArray', tokenList);
    const cards = buildCards(tokenList);
    console.log('metaDataArray-cards', cards);
    setGameItems(cards);
  };

  const findOtherCards = async () => {
    if (tezos && userAddress) {
      setIsLoadingCards(true);
      console.log('findOtherCards');
      const tokenList = await findItems(tezos, userAddress);
      if (tokenList && tokenList.length > 0) {
        console.log('findOtherCards', tokenList);
        buildCards_(tokenList);
        setIsLoadingCards(false);
      }
    }
  };

  const addCard = (
    id: string,
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    cardId: number | undefined
  ) => {
    if (!isInventoryFull && cardId) {
      const element = document.getElementById(id);
      if (element) {
        element.className = 'card animate__animated animate__backOutUp';
      }
      unityContext.send('GameController', 'AddItem', cardId);
      setSentItemId(id);
      setInventoryFull(true);
    } else {
      toast.error('Inventory is full could not complete request');
    }
  };

  const sendCoin = (
    id: string,
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    cardId: string,
    cardNumber: number | undefined
  ) => {
    const element = document.getElementById(id);
    if (element) {
      element.className = 'card animate__animated animate__backOutUp';
    }
    unityContext.send('AccessController', 'InsertCoin', cardNumber);
    findOtherCards(); //don't look for other coins on this build
    if (cardNumber === 0) {
      setTimeout(() => {
        setCoin([]);
      }, 1000);
    }
  };

  const findInitialCoins = async () => {
    if (tezos && userAddress) {
      setIsLoadingCards(true);
      tezos.addExtension(new Tzip16Module());
      tezos.addExtension(new Tzip12Module());
      const coins = await findInitialCoin(tezos, userAddress).catch(
        async (error) => {
          toast.error('Error connecting to tezos mainnet');
        }
      );
      if (coins && coins.length > 0) {
        setCoin(coins);
        setIsLoadingCards(false);
        //setRerender(Math.random()); //TODO
      } else {
        toast.error('No entry coin found in wallet');
      }
    }
  };

  useEffect(() => {
    userAddress && findInitialCoins();
  }, [userAddress]);

  return (
    <>
      <div className="flex flex-col items-center ml-auto mr-auto unity-container">
        <Toaster />
        <Unity
          unityContext={unityContext}
          style={{
            height: '100%',
            width: 950,
            border: '2px solid black',
            background: 'grey',
          }}
        />
        {progression < 1 && <LoadingBar progression={1} />}
      </div>
      {/* show coin */}
      {coin.length > 0 && progression === 1 && connected && (
        <EntryCoin coin={coin} sendCoin={sendCoin}></EntryCoin>
      )}
      {/* show other Items */}
      {/* {items.length > 0 && progression === 1 && connected && (
        <Items items={items} addCard={addCard}></Items>
      )} */}
      {(isLoadingCards || progression < 1 || !walletReady) && (
        <Loading></Loading>
      )}
      {progression === 1 && walletReady && !connected && (
        <HelpMessage></HelpMessage>
      )}
    </>
  );
};

export default UnityComponent;
