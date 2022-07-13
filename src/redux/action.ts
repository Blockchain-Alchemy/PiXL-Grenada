export const GAME_ENTRY_COIN_LOAD = "GAME_ENTRY_COIN_LOAD";
export const GAME_SET_ENTRY_COINS = "GAME_SET_ENTRY_COINS";

export const loadEntryCoinAction = (status) => ({
  type: GAME_ENTRY_COIN_LOAD,
  payload: status,
});

export const setEntryCoinAction = (coins) => ({
  type: GAME_SET_ENTRY_COINS,
  payload: coins,
});
