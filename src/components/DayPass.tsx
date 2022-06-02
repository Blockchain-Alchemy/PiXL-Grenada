import * as React from "react";
import {
  PlasmicDayPass,
  DefaultDayPassProps
} from "./plasmic/pi_xl_a/PlasmicDayPass";
import { HTMLElementRefOf } from "@plasmicapp/react-web";

export interface DayPassProps extends DefaultDayPassProps {}

function DayPass_(props: DayPassProps, ref: HTMLElementRefOf<"div">) {
  
  const buyDayPass = (): void => {
    console.log('buyDayPass')
  }

  return <PlasmicDayPass 
    root={{ ref }} 
    buyButton={{ onClick: buyDayPass }}
    {...props} 
  />;
}

const DayPass = React.forwardRef(DayPass_);
export default DayPass;
