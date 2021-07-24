import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GET_QUIZ } from "./api.routes";

export const getQuizAsync = createAsyncThunk(
  "quiz/fetchQuiz",
  async (quizID: string,{ rejectWithValue }) => {
    try {
      const quiz = await axios.get(GET_QUIZ + quizID);
      return quiz.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
