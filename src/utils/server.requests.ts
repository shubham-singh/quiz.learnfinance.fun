import React from "react";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  BASE,
  CHANGE_SCORE,
  GET_LEADERBOARD,
  GET_QUIZ,
  LOGIN,
  SCORE,
  SIGNUP,
} from "./api.routes";
import { showSnackbar } from "../features/snackbar/snackbarSlice";
import { AppDispatch } from "../app/store";
import { idle, loading } from "../features/loader/loaderSlice";

export const pingServer = async () => {
  try {
    await axios.get(BASE);
  } catch (error: Error | any) {
    console.error("Failed to start server");
  }
} 

export const getAllQuizAsync = async (
  setQuizes: React.Dispatch<any>,
  dispatch: AppDispatch
) => {
  try {
    const response = await axios.get(GET_QUIZ);
    if (response.data.success) {
      setQuizes(response.data.quiz);
    }
  } catch (error) {
    dispatch(showSnackbar("Something went wrong :("));
  }
};

export const getQuizAsync = createAsyncThunk(
  "quiz/fetchQuiz",
  async (quizID: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(loading());
      const quiz = await axios.get(GET_QUIZ + quizID);
      if (quiz.data.success) {
        dispatch(idle());
        return quiz.data;
      }
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getScoreAsync = createAsyncThunk(
  "score/fetchScore",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(SCORE);
      if (response.data.success) {
        return response.data;
      }
      throw new Error("Cannot get Scores");
    } catch (error: any) {
      console.dir(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getLeaderboardAsync = createAsyncThunk(
  "leaderboard/fetchLeaderboard",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(GET_LEADERBOARD);
      if (response.data.success) {
        return response.data;
      }
      throw new Error("Cannot get Leaderboards");
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (
    loginInfo: { email: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(showSnackbar("Logging in"));
      const response = await axios.post(LOGIN, loginInfo);
      if (response.data.success) {
        dispatch(showSnackbar("Successfully Logged In"));
        return response.data;
      } else throw new Error("login failed");
    } catch (error: any) {
      dispatch(showSnackbar(error.response.data.error));
      return rejectWithValue(error.response.data);
    }
  }
);

export const signupAsync = createAsyncThunk(
  "auth/signup",
  async (signupInfo: object, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showSnackbar("Creating your account"));
      const response = await axios.post(SIGNUP, signupInfo);
      if (response.data.success) {
        dispatch(showSnackbar("Successfully Signed Up"));
        return response.data;
      }
    } catch (error: any) {
      dispatch(showSnackbar(error.response.data.error));
      return rejectWithValue(error.response.data);
    }
  }
);

export const postScoreAsync = createAsyncThunk(
  "score/post",
  async (
    { quizID, score }: { quizID: string; score: number },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await axios.post(SCORE, { quizID, score });
      if (response.data.success) {
        return response.data;
      }
    } catch (error: any) {
      dispatch(showSnackbar(error.response.data.error));
      return rejectWithValue(error.response.data);
    }
  }
);

export const changeScoreAsync = createAsyncThunk(
  "score/change",
  async (
    { quizID, score }: { quizID: string; score: number },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await axios.post(CHANGE_SCORE, { quizID, score });
      if (response.data.success) {
        return response.data;
      }
    } catch (error: any) {
      dispatch(showSnackbar(error.response.data.error));
      return rejectWithValue(error.response.data);
    }
  }
);
