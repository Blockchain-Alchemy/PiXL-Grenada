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
import * as service from 'services';
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

  const sendGameController = (methodName: string, parameter?: any) => {
    unityContext.send('GameController', methodName, parameter);
  }

  const sendError = (parameter?: any) => {
    sendGameController('SendError', parameter)
  }

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

  unityContext.on('GameOver', async (userName, score) => {
    try {
      const result = await service.setGraveyardEntry(userName, score);
      if (result) {
        toast.success('Your death has been added to The Graveyard');
      }
    } catch (error) {
      console.error(error);
    }
  });

  unityContext.on('MintThis', async (itemName: string) => {
    console.log('MintThis:', itemName);
    if (!walletAddress) {
      toast.error(Lang.connectYourWallet);
      return;
    }
    if (!itemName) {
      console.error('Invalid item name');
      return;
    }
    if (!running) {
      console.error('Already running now');
      return;
    }

    try {
      setRunning(true);

      const tokenId = await service.getTokenId(itemName);
      if (!tokenId) {
        throw new Error('Failed to get token ID from server');
      }

      const transaction = await mintItem(tokenId, itemName);
      console.log('mintItem', transaction);
      if (!transaction) {
        throw new Error('Failed to mint item');
      }

      await service.updateMintResult(walletAddress as string, itemName);

      const mintedItem = {
        name: itemName,
        imageSrc: '/whitney-with-microphone.png',
        alt: 'Game Item',
      } as ItemType
      setGameItems([...gameItems, mintedItem]);

      toast.success(`Item ${itemName} has been successfully minted`);
      sendGameController('ItemMinted', itemName);
    } catch(error) {
      console.error(error);
      toast.error(`Failed to mint item ${itemName}`);
      sendError('Failed to mint item');
    } finally {
      setRunning(false);
    }
  });

  unityContext.on('MintPiXLtez', async (amount: number) => {
    console.log('MintPiXLtez', amount);
    if (!walletAddress) {
      toast.error(Lang.connectYourWallet);
      return;
    }
    if (running) {
      return;
    }
    try {
      setRunning(true);

      const result = await service.mintPixltez(walletAddress, amount);
      if (!result || !result.success) {
        throw new Error('Server Error');
      }
      toast.success(Lang.pixltezMinted);
      sendGameController('PiXLtezMinted', amount);
    } catch (err) {
      console.error(err);
      sendError(Lang.pixltezMintFailed);
      toast.error(Lang.pixltezMintFailed);
    } finally {
      setRunning(false);
    }
  });

  unityContext.on('ShareQuest', async (questDetails, Id) => {
    const result = await service.shareQuest(questDetails, Id).catch((error) => {
      toast.error("Server Didn't Respond, contact the admin");
    });
    if (result) {
      alert('Quest has been shared');
    }
  });

  unityContext.on('QuestCompleted', async function (questId: number) {
    console.log('OnQuestCompleted:', questId);
    if (!running && walletAddress) {
      const isValid = await service.isQuestValid(questId);
      if (!isValid) {
        toast.error('Invalid Quest not saved');
        return;
      }
      try {
        setRunning(true);
        const updateStatus = await service.updateQuestStatus(
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
    service.reInsertCard(sentItemId);
  });

  unityContext.on('RequestItem', async (item: string) => {
    /*console.log('OnRequestItem', item);
    if (tezos && walletAddress) {
      toast.success('Looking for Beets Entry Token');

      const result = await getRequestedItem(tezos, walletAddress, item);
      if (result) {
        sendGameController('ActivateEvent', 'Has Beets Token');
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

  const buildCards_ = async (tokenList: TokenInfo[]) => {
    console.log('metaDataArray', tokenList);
    const cards = service.buildCards(tokenList);
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
      sendGameController('AddItem', cardId);
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
    const getInitialCoins = async () => {
      try {
        setIsLoadingCards(true);
        if (await findInitialCoin()) {
          const coins = [{
            id: 0,
            name: Lang.entryCoinName,
            alt: Lang.entryCoinAlt,
            imageSrc: "https://cloudflare-ipfs.com/ipfs/QmPTFsFgEYfS3VV9uaTWfWUQGVqbaHa1t2npBUQZ4NiAvP",
          }]
          setCoin(coins);
        }
      } catch (error) {
        console.error(error);
        toast.error(Lang.noEntryCoinFound);
      } finally {
        setIsLoadingCards(false);
      }
    }
    walletAddress && getInitialCoins();
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
