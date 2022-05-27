import * as React from "react";
import {
  PlasmicNav,
  DefaultNavProps,
} from "./plasmic/influencer_campaign_page/PlasmicNav";
import { HTMLElementRefOf } from "@plasmicapp/react-web";
import useBeacon from "hooks/useBeacon";

export interface NavProps extends DefaultNavProps {}

function Nav_(props: NavProps, ref: HTMLElementRefOf<"div">) {
  const { connected, connectWallet, disconnectWallet } = useBeacon();
  console.log('connected', connected)

  return (
    <>
    {
      connected? (
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
