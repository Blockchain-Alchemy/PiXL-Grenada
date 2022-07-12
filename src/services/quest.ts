import axios from 'axios';
import { API_BASE_URL } from '../config';

const QuestArray = [
  { id: 1, value: 'Talk to mom' },
  { id: 2, value: 'Finish Beets 1' },
];

export const updateQuestStatus = async (questId: number, walletAddress: string, status: string) => {
  const body = {
    walletAddress,
    status,
    questId,
  };
  return await axios
    .post(`${API_BASE_URL}/api/quest/update`, body)
    .then((res) => {
      console.log('res', res);
      return res.data;
    })
    .catch((err) => {
      console.error(err);
      return { errorMessage: 'Error saving completed quest' };
    });
};
