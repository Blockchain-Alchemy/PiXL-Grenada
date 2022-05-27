import React from "react";
import { ParallaxProviderWrapper } from '@plasmicpkgs/react-scroll-parallax';

const Providers: React.FC<{ children?: JSX.Element | JSX.Element[] }> = ({
  children,
}) => {
  return (
    <ParallaxProviderWrapper>
      {children}
    </ParallaxProviderWrapper>
  );
};

export default Providers;
