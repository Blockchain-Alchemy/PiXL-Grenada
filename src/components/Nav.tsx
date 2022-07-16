import * as React from 'react';
import { useHistory } from 'react-router-dom';
import {
  PlasmicNav,
  DefaultNavProps,
} from './plasmic/influencer_campaign_page/PlasmicNav';
import { HTMLElementRefOf } from '@plasmicapp/react-web';
import useWallet from 'hooks/useWallet';

export interface NavProps extends DefaultNavProps {}

function Nav_(props: NavProps, ref: HTMLElementRefOf<'div'>) {
  const history = useHistory();
  const { walletAddress, connectWallet, disconnectWallet } = useWallet();

  const handleSyncButton = () => {
    !walletAddress ? connectWallet() : disconnectWallet();
  };

  const handleNavigateButton = (e: any, location: string) => {
    e.preventDefault();
    history.push(location);
  };

  return (
    <PlasmicNav
      root={{ ref }}
      {...props}
      synced={walletAddress ? true : undefined}
      syncButton={{ onClick: handleSyncButton }}
      aboutButton={{ onClick: (e) => handleNavigateButton(e, '/about') }}
      dayPassButton={{ onClick: (e) => handleNavigateButton(e, '/day-pass') }}
      missionsButton={{ onClick: (e) => handleNavigateButton(e, '/missions') }}
      itemsButton={{ onClick: (e) => handleNavigateButton(e, '/items') }}
      playButton={{ onClick: (e) => handleNavigateButton(e, '/play') }}
    />
  );
}

const Nav = React.forwardRef(Nav_);
export default Nav;
