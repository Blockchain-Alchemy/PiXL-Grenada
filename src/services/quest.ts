import axios from "axios";
import { REACT_APP_BASE_URL } from "../config";

const BASE_URL = REACT_APP_BASE_URL;
const QuestArray = [{ value: "Talk to mom" }, {value: "Finish Beets 1"} ];

const updateQuestStatus = async (questId: string, userAddress: string, status: string) {
  const body = {
    walletAddress: userAddress,
    timestamp: new Date(),
    status: status,
    questName: questId,
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

export const isQuestValid = async (questId: string) => {
  const x = QuestArray.find((item) => item.value === questId);
  if (x) {
    return true
  } else {
    return false
  }
}