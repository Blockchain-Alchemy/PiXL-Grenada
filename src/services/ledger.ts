import axios from 'axios';
import { REACT_APP_BASE_URL } from '../config';

const BASE_URL = REACT_APP_BASE_URL;

export const getLegderKeys = async (contract: string, address: string) => {
  const url = `${BASE_URL}/api/ledger/keys/${contract}/${address}`;
  console.log("getLegderKeys", url);

  // on a successful transfer the api should return use the object details so that we can display it to the user
  return axios
    .get(url)
    .then((res) => {
      console.log("res", res);
      return res.data;
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
};
