import * as React from "react";
import { useHistory } from "react-router-dom";
import {
  PlasmicNav,
  DefaultNavProps,
} from "./plasmic/influencer_campaign_page/PlasmicNav";
import { HTMLElementRefOf } from "@plasmicapp/react-web";
import useWallet from "hooks/useWallet";

export interface NavProps extends DefaultNavProps {}

function Nav_(props: NavProps, ref: HTMLElementRefOf<"div">) {
  const history = useHistory();
  const { walletAddress, connectWallet, disconnectWallet } = useWallet();

  const handlePlayButton = () => {
    history.push("/play");
  }

  return (
    <>
    {
      walletAddress? (
        <PlasmicNav
          root={{ ref }}
          syncButton={{ onClick: () => disconnectWallet() }}
          {...props}
          synced
          playButton={{ onClick: () => handlePlayButton() }}
        />
      ) : (
        <PlasmicNav
          root={{ ref }}
          syncButton={{ onClick: () => connectWallet() }}
          {...props}
        />
      )
    }
    </>
  );
}

const Nav = React.forwardRef(Nav_);
export default Nav;
