import * as React from "react";
import toast, { Toaster } from 'react-hot-toast';
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
        console.log('buyDayPass', result);
        toast.success(`Day Pass Token has been successfully minted`);
      })
      .catch(error => {
        console.error(error);
        toast.error(`Failed to mint Day Pass`);
      });
  }

  return (
    <>
      <PlasmicDayPass 
        root={{ ref }} 
        buyButton={{ onClick: buyDayPass }}
        {...props} 
        />
      <Toaster />
    </>
  );
}

const DayPass = React.forwardRef(DayPass_);
export default DayPass;
