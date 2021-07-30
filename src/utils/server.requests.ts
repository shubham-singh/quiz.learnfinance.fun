import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_QUIZ, LOGIN, SIGNUP } from "./api.routes";
import { showSnackbar } from "../features/snackbar/snackbarSlice";
import React from "react";
import { AppDispatch } from "../app/store";

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
  async (quizID: string, { rejectWithValue }) => {
    try {
      const quiz = await axios.get(GET_QUIZ + quizID);
      return quiz.data;
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
      dispatch(showSnackbar(error.response.data.error));
      return rejectWithValue(error.response.data);
    }
  }
);
