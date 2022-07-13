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
  dataUrl: 'Build/1.data',
  frameworkUrl: 'Build/1.framework.js',
  codeUrl: 'Build/1.wasm',
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
  const [coins, setCoins] = useState<Array<ItemType>>([]);
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

  const handleUnityProgress = (progression) => {
    setProgression(progression);
  }

  const handleConnectWallet = () => {
    console.log('ConnectWallet~~~~~~~~~~~')
  }

  const handleWhereWallet = (userName, score) => {
    /*if (walletAddress) {
      unityContext.send('AccessController', 'ConnectWallet', walletAddress);
    } else if (!walletReady) {
      setWhereWallet(true);
    }*/
  }

  const handleGameOver = async (userName, score) => {
    try {
      const result = await service.setGraveyardEntry(userName, score);
      if (result) {
        toast.success('Your death has been added to The Graveyard');
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleMintItem = async (itemName: string) => {
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
  };

  const handleMintPiXLtez = async (amount: number) => {
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
      if (!result) {
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
  };

  const handleShareQuest = async (questDetails, Id) => {
    const result = await service.shareQuest(questDetails, Id).catch((error) => {
      toast.error("Server Didn't Respond, contact the admin");
    });
    if (result) {
      alert('Quest has been shared');
    }
  };

  const handleQuestCompleted = async function (questId: number) {
    console.log('OnQuestCompleted:', questId);
    if (!walletAddress) {
      toast.error(Lang.connectYourWallet);
      return;
    }
    if (running) {
      return;
    }
    try {
      setRunning(true);

      const result = await service.updateQuestStatus(
        questId,
        walletAddress,
        'COMPLETED'
      );
      if (!result || !result.data) {
        throw new Error('Server Error');
      }
      toast.success(`Quest ${questId} has been updated succesfully`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to update quest state');
    } finally {
      setRunning(false);
    }
  };

  const handleGotItem = (itemId: number) => {
    console.log('OnGotItem', itemId);
    const items = gameItems.filter((item) => item.alt !== itemId.toString());
    setGameItems(items);
    setInventoryFull(false);
    toast.success('Item has been added your inventory');
  };

  const handleInventoryFull = () => {
    // setInventoryFull(true); //not sure if this is needed
    service.reInsertCard(sentItemId);
  }

  const handleRequestItem = async (item: string) => {
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
  }

  useEffect(() => {
    unityContext.on('progress', handleUnityProgress);
    unityContext.on('ConnectWallet', handleConnectWallet);
    unityContext.on('WhereWallet', handleWhereWallet);
    unityContext.on('GameOver', handleGameOver);
    unityContext.on('MintThis', handleMintItem);
    unityContext.on('MintPiXLtez', handleMintPiXLtez);
    unityContext.on('ShareQuest', handleShareQuest);
    unityContext.on('QuestCompleted', handleQuestCompleted);
    unityContext.on('GotItem', handleGotItem);
    unityContext.on('InventoryFull', handleInventoryFull);
    unityContext.on('RequestItem', handleRequestItem);
  })

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
        setCoins([]);
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
          setCoins(coins);
        }
      } catch (error) {
        console.error(error);
        toast.error(Lang.noEntryCoinFound);
      } finally {
        setIsLoadingCards(false);
      }
    }

    const coins = [{
      id: 0,
      name: Lang.entryCoinName,
      alt: Lang.entryCoinAlt,
      imageSrc: "https://cloudflare-ipfs.com/ipfs/QmPTFsFgEYfS3VV9uaTWfWUQGVqbaHa1t2npBUQZ4NiAvP",
    }]
    setCoins(coins);
    
    walletAddress && getInitialCoins();
  }, [walletAddress, findInitialCoin]);

  const gameLoadedView = () => {
    if (!walletAddress) {
      return <HelpMessage></HelpMessage>;
    }
    return (
      <>
        {/* show coins */}
        {coins.length > 0 && (
          <EntryCoin coin={coins} sendCoin={sendCoin}></EntryCoin>
        )}
        {/* show other Items */}
        {gameItems.length > 0 && (
          <GameItems items={gameItems} addCard={addCard}></GameItems>
        )}
      </>
    )
  }

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
      { progression === 1 && gameLoadedView() }
    </div>
  );
};

export default UnityComponent;
