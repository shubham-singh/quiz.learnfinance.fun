import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import quizReducer from '../features/quiz/quizSlice';
import authReducer from '../features/auth/authSlice';
import snackbarReducer from '../features/snackbar/snackbarSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    quiz: quizReducer,
    snackbar: snackbarReducer
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
