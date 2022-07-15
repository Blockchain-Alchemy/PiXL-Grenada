import * as React from "react";
import moment from "moment";
import toast, { Toaster } from 'react-hot-toast';
import {
  PlasmicDayPass,
  DefaultDayPassProps
} from "./plasmic/pi_xl_a/PlasmicDayPass";
import { HTMLElementRefOf } from "@plasmicapp/react-web";
import useDayPass from "hooks/useDayPass";
import { DayPassToken } from "config";
import useWallet from "hooks/useWallet";
import Lang from "lang/en";

export interface DayPassProps extends DefaultDayPassProps {}

function DayPass_(props: DayPassProps, ref: HTMLElementRefOf<"div">) {
  const { walletAddress } = useWallet();
  const { mintToken, getTokenTime } = useDayPass();
  const [loading, setLoading] = React.useState(false);
  
  const buyDayPass = async () => {
    if (!walletAddress) {
      toast.error(Lang.connectYourWallet);
      return;
    }
    try {
      setLoading(true);
      const tx = await mintToken(DayPassToken.DayPass);
      console.log('buyDayPass', tx);
      toast.success(`Day Pass Token has been successfully minted`);
    } catch (error) {
      console.error(error);
      toast.error(`Failed to mint Day Pass`);
    } finally {
      setLoading(false);
    }
  }

  const checkDayPass = async () => {
    if (!walletAddress) {
      toast.error(Lang.connectYourWallet);
      return;
    }
    try {
      setLoading(true);
      const tokenTime = await getTokenTime(DayPassToken.DayPass);
      if (!tokenTime) {
        toast.error(`You have no Day Pass token`);
        return;
      }

      const diff = moment().diff(tokenTime, 'day', true);
      console.log('diff', diff);
      if (diff > 1.0) {
        toast.success(`You have valid Day Pass token`);
      } else {
        toast.error(`You have no Day Pass token`);
      }
    } catch (error) {
      console.error(error);
      toast.error(`You have no valid token`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PlasmicDayPass 
        root={{ ref }} 
        buyButton={{
          isDisabled: loading,
          onClick: buyDayPass
        }}
        checkButton={{
          isDisabled: loading,
          onClick: checkDayPass
        }}
        {...props} 
        />
      <Toaster />
    </>
  );
}

const DayPass = React.forwardRef(DayPass_);
export default DayPass;
