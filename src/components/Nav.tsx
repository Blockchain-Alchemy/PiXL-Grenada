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

  const handleSyncButton = () => {
    !walletAddress? connectWallet() : disconnectWallet();
  }

  return (
    <PlasmicNav
      root={{ ref }}
      {...props}
      synced={walletAddress? true : undefined}
      syncButton={{ onClick: handleSyncButton }}
      aboutButton={{ onClick: () => history.push("/about") }}
      dayPassButton={{ onClick: () => history.push("/day-pass") }}
      missionsButton={{ onClick: () => history.push("/missions") }}
      itemsButton={{ onClick: () => history.push("/items") }}
      playButton={{ onClick: () => history.push("/play") }}
    />
  );
}

const Nav = React.forwardRef(Nav_);
export default Nav;
