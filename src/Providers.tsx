import React from "react";
import { ParallaxProviderWrapper } from '@plasmicpkgs/react-scroll-parallax';
import { BeaconProvider } from "contexts/BeaconContext";

const Providers: React.FC<{ children?: JSX.Element | JSX.Element[] }> = ({
  children,
}) => {
  return (
    <ParallaxProviderWrapper>
      <BeaconProvider>
        {children}
      </BeaconProvider>
    </ParallaxProviderWrapper>
  );
};

export default Providers;
