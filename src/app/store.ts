import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import quizReducer from '../features/quiz/quizSlice';
import scoreReducer from '../features/score/scoreSlice';
import leaderboardReducer from "../features/leaderboard/leaderboardSlice";
import snackbarReducer from '../features/snackbar/snackbarSlice';
import loaderReducer from '../features/loader/loaderSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    quiz: quizReducer,
    score: scoreReducer,
    leaderboard: leaderboardReducer,
    snackbar: snackbarReducer,
    loader: loaderReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
