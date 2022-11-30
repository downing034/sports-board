import { PreloadedState, CombinedState } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import collegeFootballReducer, { CollegeFootballAppState } from 'models/collegeFootball/slice';

export type RootState = CollegeFootballAppState

export const makeStore = function (
  preloadedState: PreloadedState<CombinedState<RootState>> = {}
) {
  return configureStore<RootState>({
    reducer: {
      collegeFootball: collegeFootballReducer,
    },
    preloadedState: preloadedState,
  });
};

const store = makeStore();
export type AppDispatch = typeof store.dispatch;
export default store;
