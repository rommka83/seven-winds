import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import rows from './slices/rowSlice';

export const store = configureStore({
  reducer: {
    rows,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
