import React from 'react';
import { ParallaxProviderWrapper } from '@plasmicpkgs/react-scroll-parallax';
import { NetworkOptions, TezosProvider } from './components/TezosContext';

const options = {
  appName: 'Mechz',
  networkType: 'mainnet',
  rpc: 'https://mainnet.api.tez.ie',
} as NetworkOptions;

const Providers: React.FC<{ children?: JSX.Element | JSX.Element[] }> = ({
  children,
}) => {
  return (
    <ParallaxProviderWrapper>
      <TezosProvider options={options}>
        {children}
      </TezosProvider>
    </ParallaxProviderWrapper>
  );
};

export default Providers;
