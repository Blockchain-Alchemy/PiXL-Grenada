export const GAME_PLAY_COIN_LOAD = "GAME_PLAY_COIN_LOAD";

export const loadPlayCoinAction = (status) => ({
  type: GAME_PLAY_COIN_LOAD,
  payload: status,
});
