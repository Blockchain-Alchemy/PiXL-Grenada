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
// import LoadingComponent from "./loading";
// import Items from "./Items";
// import HelpMessage from "./HelpMessage";
// import EntryCoin from "./EntryCoin";
// import LoadingBar from "./LoadingBar";
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
        {/* {progression < 1 && <LoadingBar progression={progression} />} */}
      </div>
    </>
  );
};

export default UnityComponent;
