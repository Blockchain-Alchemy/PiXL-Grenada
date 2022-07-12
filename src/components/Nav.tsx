import * as React from "react";
import {
  PlasmicNav,
  DefaultNavProps,
} from "./plasmic/influencer_campaign_page/PlasmicNav";
import { HTMLElementRefOf } from "@plasmicapp/react-web";
import useWallet from "hooks/useWallet";

export interface NavProps extends DefaultNavProps {}

function Nav_(props: NavProps, ref: HTMLElementRefOf<"div">) {
  const { walletAddress, connectWallet, disconnectWallet } = useWallet();

  return (
    <>
    {
      walletAddress? (
        <PlasmicNav
          root={{ ref }}
          syncButton={{ onClick: () => disconnectWallet() }}
          {...props}
          synced
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
