import * as React from "react";
import {
  PlasmicDayPass,
  DefaultDayPassProps
} from "./plasmic/pi_xl_a/PlasmicDayPass";
import { HTMLElementRefOf } from "@plasmicapp/react-web";
import useDayPass from "hooks/useDayPass";
import { DayPassToken } from "config";

export interface DayPassProps extends DefaultDayPassProps {}

function DayPass_(props: DayPassProps, ref: HTMLElementRefOf<"div">) {
  const { mintToken } = useDayPass();
  
  const buyDayPass = (): void => {
    mintToken(DayPassToken.DayPass)
      .then(result => {
        console.log('buyDayPass', result)
      })
      .catch(error => console.error(error));
  }

  return <PlasmicDayPass 
    root={{ ref }} 
    buyButton={{ onClick: buyDayPass }}
    {...props} 
  />;
}

const DayPass = React.forwardRef(DayPass_);
export default DayPass;
