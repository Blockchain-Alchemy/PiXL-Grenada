import { GAME_PLAY_COIN_LOAD } from "../action";

const initialState = {
  loadingStatus: false,
};

const gameReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GAME_PLAY_COIN_LOAD: {
      return {
        ...state,
        loadingStatus: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default gameReducer;
