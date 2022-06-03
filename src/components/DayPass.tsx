import * as React from "react";
import toast, { Toaster } from 'react-hot-toast';
import {
  PlasmicDayPass,
  DefaultDayPassProps
} from "./plasmic/pi_xl_a/PlasmicDayPass";
import { HTMLElementRefOf } from "@plasmicapp/react-web";
import useDayPass from "hooks/useDayPass";
import { DayPassToken } from "config";
import moment from "moment";

export interface DayPassProps extends DefaultDayPassProps {}

function DayPass_(props: DayPassProps, ref: HTMLElementRefOf<"div">) {
  const { mintToken, getTokenTime } = useDayPass();
  
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

  const checkDayPass = (): void => {
    console.log('checkDayPass');
    getTokenTime(DayPassToken.DayPass)
      .then(tokenTime => {
        console.log('checkDayPass', tokenTime);
        if (!tokenTime) {
          toast.error(`You have no Day Pass token`);
          return;
        }
        const diff = moment().diff(tokenTime, 'day', true);
        console.log('diff', diff);
        if (diff > 1.0) {
          toast.error(`The token is invalid, timeout`);
        } else {
          toast.success(`You have valid Day Pass token`);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <>
      <PlasmicDayPass 
        root={{ ref }} 
        buyButton={{ onClick: buyDayPass }}
        checkButton={{ onClick: checkDayPass }}
        {...props} 
        />
      <Toaster />
    </>
  );
}

const DayPass = React.forwardRef(DayPass_);
export default DayPass;
