import { configureStore } from '@reduxjs/toolkit'
import gameReducer from './reducers/game';

export default configureStore({
  reducer: {
    gameState: gameReducer,
  },
})
