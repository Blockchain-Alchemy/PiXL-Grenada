export const GAME_ENTRY_COIN_LOAD = "GAME_ENTRY_COIN_LOAD";

export const loadEntryCoinAction = (status) => ({
  type: GAME_ENTRY_COIN_LOAD,
  payload: status,
});
