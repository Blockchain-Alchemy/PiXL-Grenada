import React from 'react';
import { Provider } from 'react-redux'
import { ParallaxProviderWrapper } from '@plasmicpkgs/react-scroll-parallax';
import { NetworkOptions, TezosProvider } from './components/TezosContext';
import store from './redux/store'

const options = {
  appName: 'PiXL',
  networkType: 'ghostnet',
  rpc: 'https://rpc.ghostnet.teztnets.xyz',
} as NetworkOptions;

const Providers: React.FC<{ children?: JSX.Element | JSX.Element[] }> = ({
  children,
}) => {
  return (
    <ParallaxProviderWrapper>
      <Provider store={store}>
        <TezosProvider options={options}>
          {children}
        </TezosProvider>
      </Provider>
    </ParallaxProviderWrapper>
  );
};

export default Providers;
