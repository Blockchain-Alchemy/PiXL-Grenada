import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "../../App.css";
import Unity, { UnityContext } from "react-unity-webgl";
import { TezosToolkit } from "@taquito/taquito";
import { Tzip12Module } from "@taquito/tzip12";
import { Tzip16Module } from "@taquito/tzip16";
// import { MintProvider } from "../../services/mintProvider";
// import { QuestProvider } from "../../services/questProvider";
// import { GraveyardProvider } from "../../services/graveyardProvider";
import toast, { Toaster } from "react-hot-toast";
import Loading from "./Loading";
// import Items from "./Items";
import HelpMessage from "./HelpMessage";
import EntryCoin from "./EntryCoin";
import LoadingBar from "./LoadingBar";
import useBeacon from "hooks/useBeacon";
// import { CommonProvider, TokenInfo } from "../../services/common";

export type ItemType = {
  name: string;
  imageSrc: string;
  alt: string;
  id?: number;
  unityCardIdentifier?: number;
};

const unityContext = new UnityContext({
  loaderUrl: "Build/1.loader.js",
  dataUrl: "Build/1.data",
  frameworkUrl: "Build/1.framework.js",
  codeUrl: "Build/1.wasm",
});

const UnityComponent = () => {
  const { tezos, connected, address: userAddress } = useBeacon();
  const [walletReady, setWhereWallet] = useState<boolean>(false);
  const [isLoadingCards, setIsLoadingCards] = useState<boolean>(false);
  const [progression, setProgression] = useState(0);
  const [isInventoryFull, setInventoryFull] = useState(false);
  const [sentItemId, setSentItemId] = useState("");
  const [running, setRunning] = useState(false);
  const [coin, setCoin] = useState<Array<ItemType>>([]);
  const [items, setItem] = useState<Array<ItemType>>([]);

  document.onfullscreenchange = function (event) {
    unityContext.setFullscreen(false);
  };

  unityContext.on("WhereWallet", function (userName, score) {
    if (userAddress && !connected) {
      unityContext.send("AccessController", "ConnectWallet", userAddress);
    } else if (!walletReady) {
      setWhereWallet(true);
    }
  });

  unityContext.on("GameOver", function (userName, score) {
    gameOver(userName, score);
  });

  unityContext.on("MintThis", async (itemName: string) => {
    if (itemName) {
      await onMintThis(itemName);
    }
  });

  unityContext.on("MintPiXLtez", async (amount: number) => {
    await onMintPixltez(amount);
  });

  unityContext.on("ShareQuest", function (questDetails, Id) {
    shareQuest(questDetails, Id);
  });

  unityContext.on("progress", function (progression) {
    setProgression(progression);
  });

  unityContext.on("QuestCompleted", async function (questId: string) {
    await onQuestCompleted(questId);
  });

  unityContext.on("GotItem", function (item_id: number) {
    console.log("~~~~~~~~~~~~~~~~GotItem~");
    const tempItems = items.filter((item) => item.alt !== item_id.toString());
    setTimeout(() => {
      setItem(tempItems);
    }, 1000);
    toast.success("Item has been added your inventory");
    setInventoryFull(false);
  });

  unityContext.on("InventoryFull", function () {
    // setInventoryFull(true); //not sure if this is needed
    commonProvider.reInsertCard(sentItemId);
  });

  unityContext.on("RequestItem", function (item: string) {
    console.log("~~~~~~~~~~~~~~~~RequestItem~");
    GetRequestedItem(item);
  });

  const onMintThis = async (itemName: string) => {
    console.log("MintThis:", itemName);
    if (running) {
      return;
    }
    setRunning(true);

    const result = await mintProvider.mintItem(Tezos, userAddress, itemName);
    console.log("mintContract", result);
    if (result) {
      setItem([...items, result]);
      setRerender(Math.random());

      toast.success(`Item ${itemName} has been successfully minted`);
      unityContext.send("GameController", "ItemMinted", itemName);
    } else {
      toast.error(`Failed to mint item ${itemName}`);
      unityContext.send("GameController", "SendError", "Failed to mint item");
    }
    setRunning(false);
  };

  const onMintPixltez = async (amount: number) => {
    console.log("MintPiXLtez", amount);
    if (running) {
      return;
    }
    try {
      setRunning(true);
      const result = await mintProvider.mintPixltez(userAddress, amount);
      if (result && result.success) {
        toast.success("PiXLtez has been successfully minted");
        unityContext.send("GameController", "PiXLtezMinted", amount);
      } else {
        unityContext.send(
          "GameController",
          "SendError",
          "Failed to mint PiXLtez"
        );
        toast.error("Failed to mint PiXLtez");
      }
    } catch (err) {
      console.error(err);
    }
    setRunning(false);
  };

  const gameOver = async (userName: string, score: string) => {
    const result = await graveyardProvider
      .setGraveyardEntry(userName, score)
      .catch((error) => {
        // toast.error("Graveyard is having issues");
      });

    if (result) {
      alert("Your death has been added to The Graveyard");
    }
  };

  const GetRequestedItem = async (requestedItem: string) => {
    // toast.error("Requested item not available")
    toast.success("Looking for Beets Entry Token");
    const result = await commonProvider.getRequestedItem(
      Tezos,
      userAddress,
      requestedItem
    );
    if (result) {
      unityContext.send("GameController", "ActivateEvent", "Has Beets Token");
    }
    toast.success("Beets Entry token found click on the token to enter");
    setItem([
      {
        alt: "Entry Coin for PiXL RPG\nCreated by Lex (@LexUnity)\n\nHOW IT WORKS\nIn order to gain access to the PiXL game world you need to have at least one of these coins in your wallet. You can only use one, so having more than one will not help you, share/sell your extra coins if you have a few. \n\nThe aim of PiXL is to be a play-to-earn game that’s accessible to all. Once a week, (Fridays at 5p PST) the top offers and random offers will be accepted and receive a coin. There will be tons of opportunities to get an entry coin. For the latest - follow @PiXLtez \n\n----\n\nPlay PiXL: PiXL.xyz\n\nEntry Coin concept adapted from Beets (@wideawakebeets)\n\nCoin design by: Elin Hohler \n",
        imageSrc:
          "https://cloudflare-ipfs.com/ipfs/QmeHk5t7csY793KM9sRiWwsGENhzhf5jJoiZrjweSw2AQB",
        name: "PiXL Entry Coin: 1st Edition | Ultra-Rare",
        id: 1,
      },
    ]);
    // setTimeout(() => {
    //     unityContext.send("GameController", "ActivateEvent", "Push Beets Token");
    // }, 5000);
  };

  const onQuestCompleted = async (questId: string) => {
    console.log("onQuestCompleted:", questId);
    if (running) {
      return;
    }
    try {
      const isQuestValid = await questProvider.isQuestValid(questId);
      if (isQuestValid) {
        const result = await questProvider.updateQuestStatus(
          questId,
          userAddress,
          "COMPLETED"
        );
        if (result.errorMessage) {
          toast.error(result.errorMessage);
        } else {
          toast.success("Quest " + result.questName + " completed and saved");
        }
      } else {
        toast.error("Invalid Quest not saved");
      }
    } catch (err) {
      console.error(err);
    }
    setRunning(false);
  };

  const shareQuest = async (questDetails: any, Id: any) => {
    const result = await mintProvider
      .shareQuest(questDetails, Id)
      .catch((error) => {
        toast.error("Server Didn't Respond, contact the admin");
      });
    if (result) {
      alert("Quest has been shared");
    }
  };

  const buildCards = async (tokenList: TokenInfo[]) => {
    console.log("metaDataArray", tokenList);
    const cards = commonProvider.buildCards(tokenList);
    console.log("metaDataArray-cards", cards);
    setItem(cards);
  };

  const findOtherCards = async () => {
    setIsLoadingCards(true);
    console.log("findOtherCards");
    const tokenList: TokenInfo[] | null = await commonProvider.findItems(
      Tezos,
      userAddress
    );
    if (tokenList && tokenList.length > 0) {
      console.log("findOtherCards", tokenList);
      buildCards(tokenList);
      setIsLoadingCards(false);
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
        element.className = "card animate__animated animate__backOutUp";
      }
      unityContext.send("GameController", "AddItem", cardId);
      setSentItemId(id);
      setInventoryFull(true);
    } else {
      toast.error("Inventory is full could not complete request");
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
      element.className = "card animate__animated animate__backOutUp";
    }
    unityContext.send("AccessController", "InsertCoin", cardNumber);
    findOtherCards(); //don't look for other coins on this build
    if (cardNumber === 0) {
      setTimeout(() => {
        setCoin([]);
      }, 1000);
    }
  };

  const findInitialCoin = async () => {
    setIsLoadingCards(true);
    tezos?.addExtension(new Tzip16Module());
    tezos?.addExtension(new Tzip12Module());
    let coin = await commonProvider
      .findInitialCoin(Tezos, userAddress)
      .catch(async (error) => {
        toast.error("Error connecting to tezos mainnet");
      });
    if (coin && coin.length > 0) {
      setCoin(coin);
      setIsLoadingCards(false);
      //setRerender(Math.random()); //TODO
    } else {
      toast.error("No entry coin found in wallet");
    }
  };

  useEffect(() => {
    userAddress && findInitialCoin();
  }, [userAddress]);

  return (
    <>
      <div className="flex flex-col items-center ml-auto mr-auto unity-container">
        <Toaster />
        <Unity
          unityContext={unityContext}
          style={{
            height: "100%",
            width: 950,
            border: "2px solid black",
            background: "grey",
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
