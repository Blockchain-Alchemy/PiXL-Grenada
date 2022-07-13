export const GAME_ENTRY_COIN_LOAD = "GAME_ENTRY_COIN_LOAD";
export const GAME_SET_ENTRY_COINS = "GAME_SET_ENTRY_COINS";
export const GAME_SET_GAME_ITEMS = "GAME_SET_GAME_ITEMS";
export const GAME_ADD_GAME_ITEMS = "GAME_ADD_GAME_ITEMS";

export const loadEntryCoinAction = (status) => ({
  type: GAME_ENTRY_COIN_LOAD,
  payload: status,
});

export const setEntryCoinAction = (coins) => ({
  type: GAME_SET_ENTRY_COINS,
  payload: coins,
});

export const setGameItemsAction = (items) => ({
  type: GAME_SET_GAME_ITEMS,
  payload: items,
});

export const addGameItemsAction = (items) => ({
  type: GAME_ADD_GAME_ITEMS,
  payload: items,
});
