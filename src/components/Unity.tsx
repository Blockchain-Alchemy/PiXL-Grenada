import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Unity, { UnityContext } from 'react-unity-webgl';
import toast, { Toaster } from 'react-hot-toast';
import Lang from 'lang/en';
import LoadingItem from './LoadingItem';
import GameItems from './GameItems';
import HelpMessage from './HelpMessage';
import EntryCoin from './EntryCoin';
import LoadingBar from './LoadingBar';
import './Unity.css';
import useWallet from 'hooks/useWallet';
import * as service from 'services';
import usePixltez from 'hooks/usePixltez';
import useGame from 'hooks/useGame';
import {
  loadEntryCoinAction,
  setEntryCoinAction,
  addGameItemsAction,
  setGameItemsAction,
  setInventoryFullAction,
} from 'redux/action';

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
  const dispatch = useDispatch();
  const gameState = useSelector((state: any) => state.gameState);
  const { walletAddress, connectWallet } = useWallet();
  const { findEntryCoin } = usePixltez();
  const { mintItem, getWalletItems } = useGame();
  const [progression, setProgression] = useState(0);
  const [running, setRunning] = useState(false);
  const [gameItems, setGameItems] = useState<Array<ItemType>>([]);

  document.onfullscreenchange = function (event) {
    unityContext.setFullscreen(false);
  };

  const sendGameController = (methodName: string, parameter?: any) => {
    unityContext.send('GameController', methodName, parameter);
  };

  const sendAccessController = (methodName: string, parameter?: any) => {
    unityContext.send('AccessController', methodName, parameter);
  };

  const sendError = (parameter?: any) => {
    sendGameController('SendError', parameter);
  };

  useEffect(() => {
    sendAccessController('WalletConnected', walletAddress || '');
  }, [walletAddress])

  const handleUnityProgress = (progression) => {
    console.log('progression', progression)
    setProgression(progression);
  };

  const handleConnectWallet = () => {
    if (!walletAddress) {
      connectWallet();
    }
  };

  const handleGameOver = async (userName, score) => {
    try {
      const result = await service.setGraveyardEntry(userName, score);
      if (result) {
        toast.success('Your death has been added to The Graveyard');
      }
    } catch (error) {
      console.error(error);
    }
  };

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
      } as ItemType;
      setGameItems([...gameItems, mintedItem]);

      toast.success(`Item ${itemName} has been successfully minted`);
      sendGameController('ItemMinted', itemName);
    } catch (error) {
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
    dispatch(addGameItemsAction(items));
    dispatch(setInventoryFullAction(false));
    toast.success('Item has been added your inventory');
  };

  const handleInventoryFull = () => {
    dispatch(setInventoryFullAction(true));
    //service.reInsertCard(sentItemId); //TODO
  };

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
  };

  unityContext.on('progress', handleUnityProgress);
  unityContext.on('ConnectWallet', handleConnectWallet);
  unityContext.on('GameOver', handleGameOver);
  unityContext.on('MintThis', handleMintItem);
  unityContext.on('MintPiXLtez', handleMintPiXLtez);
  unityContext.on('ShareQuest', handleShareQuest);
  unityContext.on('QuestCompleted', handleQuestCompleted);
  unityContext.on('GotItem', handleGotItem);
  unityContext.on('InventoryFull', handleInventoryFull);
  unityContext.on('RequestItem', handleRequestItem);

  const consumeItem = (item: any) => {
    console.log('consumeItem', item);
    sendAccessController('InsertCoin', 0);
  };

  const sendCoin = (coin: ItemType) => {
    unityContext.send('AccessController', 'InsertCoin', coin.id);
    setTimeout(() => {
      dispatch(setEntryCoinAction([]));
      findGameItems();
    }, 1000);
  };

  const findGameItems = async () => {
    try {
      dispatch(loadEntryCoinAction(true));

      const item = await getWalletItems(0);
      console.log('walletItem', item)
      if (item) {
        const { metadata } = item;
        const gameItem = {
          name: item.metadata.name as string,
          imageSrc: service.createImageSrc(metadata.displayUri) as string,
          alt: `${metadata.token_id.toString()}`,
          unityCardIdentifier: service.findUnityCardIdentifier(metadata.token_id),
        } as ItemType;
        dispatch(addGameItemsAction([gameItem]));
      }
    } catch (error) {
      console.error(error);
      toast.error(Lang.noEntryCoinFound);
    } finally {
      dispatch(loadEntryCoinAction(false));
    }
  };

  useEffect(() => {
    /*const getInitialCoins = async () => {
      try {
        dispatch(loadEntryCoinAction(true));
        if (await findEntryCoin()) {
          const coins = [
            {
              id: 0,
              name: Lang.entryCoinName,
              alt: Lang.entryCoinAlt,
              imageSrc:
                'https://cloudflare-ipfs.com/ipfs/QmPTFsFgEYfS3VV9uaTWfWUQGVqbaHa1t2npBUQZ4NiAvP',
            },
          ];
          dispatch(setEntryCoinAction(coins));
        }
      } catch (error) {
        console.error(error);
        toast.error(Lang.noEntryCoinFound);
      } finally {
        dispatch(loadEntryCoinAction(false));
      }
    };
    walletAddress && getInitialCoins();*/

    if (walletAddress) {
      const gameItems = [
        {
            "name": "Health Potion",
            "imageSrc": "https://cloudflare-ipfs.com/ipfs/QmNNtaYpP1N8tPdJCiDSCnzx8n8yEd8Qm6rx7vYwFji2qy",
            "alt": "0",
            "unityCardIdentifier": 1
        }
      ];
      dispatch(setGameItemsAction(gameItems));
    }
  }, [dispatch, walletAddress, findEntryCoin]);

  const gameLoadedView = () => {
    if (!walletAddress) {
      return <HelpMessage></HelpMessage>;
    }
    return (
      <>
        {/* show coins */}
        {gameState.entryCoins.length > 0 && (
          <EntryCoin sendCoin={sendCoin}></EntryCoin>
        )}
        {/* show other Items */}
        {gameState.gameItems.length > 0 && (
          <GameItems consumeItem={consumeItem}></GameItems>
        )}
        {gameState.loadingStatus && <LoadingItem></LoadingItem>}
      </>
    );
  };

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
      {progression === 1 && gameLoadedView()}
    </div>
  );
};

export default UnityComponent;
