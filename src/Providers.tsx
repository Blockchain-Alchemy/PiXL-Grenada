import React from "react";
import { BeaconProvider } from "contexts/BeaconContext";

const Providers: React.FC<{ children?: JSX.Element | JSX.Element[] }> = ({
  children,
}) => {
  return <BeaconProvider>{children}</BeaconProvider>;
};

export default Providers;
