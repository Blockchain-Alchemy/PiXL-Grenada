import Config from "config";
import {useCallback} from "react";
import useBeacon from "./useBeacon";

const useTezrun = () => {
  const {tezos, contract, address, setLoading} = useBeacon();

  const getStorage = useCallback(() => {
    return contract?.storage();
  }, [contract])

  const placeBet = useCallback((raceId, horseId, payout, amount) => {
    console.log("placeBet", raceId, horseId, payout, amount)
    console.log("placeBet-contract", contract)
    setLoading(true);

    return contract?.methods
      .placeBet(Number(horseId), Number(payout), Number(raceId))
      .send({
        amount: amount,
      })
      .then((result) => {
        console.info("placeBet", result);
        return result;
      })
      .catch((error) => {
        console.error("placeBet-error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [contract, setLoading]);


  const placeBetByToken = useCallback((raceId, horseId, payout, amount) => {
    console.log("placeBetByToken", raceId, horseId, payout, amount)
    setLoading(true);

    return contract?.methods
      .placeBetByToken(amount, horseId, payout, raceId, Config.TokenId)
      .send()
      .then((result) => {
        console.info("placeBetByToken", result);
        return result;
      })
      .catch((error) => {
        console.error("placeBetByToken-error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [contract, setLoading]);


  const takeReward = useCallback(() => {
    setLoading(true);

    return contract?.methods
      .takeReward()
      .send()
      .then((result) => {
        console.info("takeReward", result);
        return result;
      })
      .catch((error) => {
        console.error("takeReward-error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [contract, setLoading]);


  const getWinner = useCallback(() => {
    return contract?.storage().then((storage: any) => {
      //console.log("storage", storage);
      return storage.winner?.toNumber();
    });
  }, [contract])


  return {
    placeBet,
    placeBetByToken,
    takeReward,
    getStorage,
    getWinner,
  };
};

export default useTezrun;