import {
  GAME_ENTRY_COIN_LOAD,
  GAME_SET_ENTRY_COINS,
  GAME_SET_GAME_ITEMS,
  GAME_ADD_GAME_ITEMS,
} from '../action';

const initialState = {
  loadingStatus: false,
  entryCoins: [],
  gameItems: [],
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
    case GAME_SET_GAME_ITEMS: {
      return {
        ...state,
        gameItems: action.payload,
      };
    }
    case GAME_ADD_GAME_ITEMS: {
      return {
        ...state,
        gameItems: [...state.gameItems, ...action.payload],
      };
    }
    default: {
      return state;
    }
  }
};

export default gameReducer;
