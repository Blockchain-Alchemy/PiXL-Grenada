import React, { useEffect, useState } from 'react';
import Unity, { UnityContext } from 'react-unity-webgl';
import toast, { Toaster } from 'react-hot-toast';
import Lang from 'lang/en';
import Loading from './Loading';
import GameItems from './GameItems';
import HelpMessage from './HelpMessage';
import EntryCoin from './EntryCoin';
import LoadingBar from './LoadingBar';
import './Unity.css'
import useWallet from 'hooks/useWallet';
import {
  buildCards,
  getTokenId,
  isQuestValid,
  mintPixltez,
  reInsertCard,
  setGraveyardEntry,
  shareQuest,
  updateMintResult,
  updateQuestStatus,
} from 'services';
import { TokenInfo } from 'types';
import usePixltez from 'hooks/usePixltez';
import useGame from 'hooks/useGame';

export type ItemType = {
  name: string;
  imageSrc: string;
  alt: string;
  id?: number;
  unityCardIdentifier?: number;
};

const unityContext = new UnityContext({
  loaderUrl: 'Build/1.loader.js',
  dataUrl: 'Build/1.data.unityweb',
  frameworkUrl: 'Build/1.framework.js.unityweb',
  codeUrl: 'Build/1.wasm.unityweb',
});

const UnityComponent = () => {
  const { walletAddress } = useWallet();
  const { findInitialCoin } = usePixltez();
  const { mintItem } = useGame();
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

  unityContext.on('progress', function (progression) {
    setProgression(progression);
  });

  unityContext.on('ConnectWallet', () => {
    console.log('ConnectWallet~~~~~~~~~~~')
  });

  unityContext.on('WhereWallet', function (userName, score) {
    if (walletAddress) {
      unityContext.send('AccessController', 'ConnectWallet', walletAddress);
    } else if (!walletReady) {
      setWhereWallet(true);
    }
  });

  unityContext.on('GameOver', function (userName, score) {
    gameOver(userName, score);
  });

  unityContext.on('MintThis', async (itemName: string) => {
    console.log('MintThis:', itemName);
    if (!itemName) {
      return;
    }
    if (!running) {
      try {
        setRunning(true);

        const tokenId = await getTokenId(itemName);
        const result = await mintItem(tokenId, itemName);
        console.log('mintContract', result);
        if (result) {
          await updateMintResult(walletAddress as string, itemName);

          const gameItem = {
            name: itemName,
            imageSrc: '/whitney-with-microphone.png',
            alt: 'Placeholder',
          } as ItemType
          setGameItems([...gameItems, gameItem]);

          toast.success(`Item ${itemName} has been successfully minted`);
          unityContext.send('GameController', 'ItemMinted', itemName);
        } else {
          toast.error(`Failed to mint item ${itemName}`);
          unityContext.send('GameController', 'SendError', 'Failed to mint item');
        }
      }
      catch(error) {
        console.error(error);
      }
      finally {
        setRunning(false);
      }
    }
  });

  unityContext.on('MintPiXLtez', async (amount: number) => {
    console.log('MintPiXLtez', amount);
    if (!running && walletAddress) {
      try {
        setRunning(true);
        const result = await mintPixltez(walletAddress, amount);
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
  });

  unityContext.on('ShareQuest', async (questDetails, Id) => {
    const result = await shareQuest(questDetails, Id).catch((error) => {
      toast.error("Server Didn't Respond, contact the admin");
    });
    if (result) {
      alert('Quest has been shared');
    }
  });

  unityContext.on('QuestCompleted', async function (questId: number) {
    console.log('OnQuestCompleted:', questId);
    if (!running && walletAddress) {
      const isValid = await isQuestValid(questId);
      if (!isValid) {
        toast.error('Invalid Quest not saved');
        return;
      }
      try {
        setRunning(true);
        const updateStatus = await updateQuestStatus(
          questId,
          walletAddress,
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
    /*console.log('OnRequestItem', item);
    if (tezos && walletAddress) {
      toast.success('Looking for Beets Entry Token');

      const result = await getRequestedItem(tezos, walletAddress, item);
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
    }*/
  });

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
    /*if (walletAddress) {
      setIsLoadingCards(true);
      console.log('findOtherCards');
      const tokenList = await findItems(tezos, walletAddress);
      if (tokenList && tokenList.length > 0) {
        console.log('findOtherCards', tokenList);
        buildCards_(tokenList);
        setIsLoadingCards(false);
      }
    }*/
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

  useEffect(() => {
    if (walletAddress) {
      setIsLoadingCards(true);
      findInitialCoin()
        .then(result => {
          if (result) {
            const coins = [{
              id: 0,
              name: Lang.entryCoinName,
              alt: Lang.entryCoinAlt,
              imageSrc: "https://cloudflare-ipfs.com/ipfs/QmPTFsFgEYfS3VV9uaTWfWUQGVqbaHa1t2npBUQZ4NiAvP",
            }]
            setCoin(coins);
          }
        })
        .catch(error => {
          console.error(error);
          toast.error('No entry coin found in wallet');
        })
        .finally(() => {
          setIsLoadingCards(false);
        })
    }
  }, [walletAddress, findInitialCoin]);

  return (
    <div className="game-container">
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
        {progression < 1 && <LoadingBar progression={progression} />}
      </div>
      {/* show coin */}
      {coin.length > 0 && progression === 1 && walletAddress && (
        <EntryCoin coin={coin} sendCoin={sendCoin}></EntryCoin>
      )}
      {/* show other Items */}
      {gameItems.length > 0 && progression === 1 && walletAddress && (
        <GameItems items={gameItems} addCard={addCard}></GameItems>
      )}
      {(isLoadingCards || progression < 1 || !walletReady) && (
        <Loading></Loading>
      )}
      {progression === 1 && walletReady && !walletAddress && (
        <HelpMessage></HelpMessage>
      )}
    </div>
  );
};

export default UnityComponent;
