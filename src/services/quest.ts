import axios from "axios";
import { REACT_APP_BASE_URL } from "../config";

const BASE_URL = REACT_APP_BASE_URL;
const QuestArray = [
  { id: 1, value: "Talk to mom" }, 
  { id: 2, value: "Finish Beets 1"}
];

export const updateQuestStatus = async (questId: number, userAddress: string, status: string) => {
  const body = {
    walletAddress: userAddress,
    status: status,
    questId: questId,
  }

  return await axios.post(`${BASE_URL}/api/quest/update`, body)
    .then(res => {
        console.log("res", res);
        return res.data;
    })
    .catch(err => {
        console.error(err);
        return { errorMessage: "Error saving completed quest" }
    })
    
  /*return await fetch(`${BASE_URL}/api/quest/update`, {
      method: 'Post',
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
  }).then(async (result)=>{
      return await result.json()
  }).catch((reason)=>{
      return {errorMessage:"Error saving completed quest"}
  });*/
}

export const isQuestValid = async (questId: number) => {
  const x = QuestArray.find((item) => item.id === questId);
  if (x) {
    return true
  } else {
    return false
  }
}