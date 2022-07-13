import { GAME_ENTRY_COIN_LOAD, GAME_SET_ENTRY_COINS } from "../action";

const initialState = {
  loadingStatus: false,
  entryCoins: [],
};

const gameReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GAME_ENTRY_COIN_LOAD: {
      return {
        ...state,
        loadingStatus: action.payload,
      };
    }
    case GAME_SET_ENTRY_COINS: {
      return {
        ...state,
        entryCoins: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default gameReducer;
