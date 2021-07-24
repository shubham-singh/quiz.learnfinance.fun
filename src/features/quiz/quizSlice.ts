import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { GET_QUIZ } from "../../utils/api.routes";

export interface OptionState {
  _id: string;
  value: string;
  isCorrect: boolean;
}

export interface QuestionState {
  _id: string;
  question: string;
  options: OptionState[];
}

export interface QuizState {
  status: "idle" | "loading" | "failed";
  error: string | null | undefined;
  quiz: {
    _id: string;
    quizName: string;
    points: number;
    negativePoints: number;
    questions: QuestionState[];
  };
  score: number;
}

const initialState = {
  status: "loading",
  error: null,
  quiz: {},
  score: 0,
} as QuizState;

export const getQuizAsync = createAsyncThunk(
  "quiz/fetchQuiz",
  async (quizID: string) => {
    const quiz = await axios.get(GET_QUIZ + quizID);
    return quiz.data;
  }
);

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    resetQuiz: (state) => initialState,
    computeScore: (state, action) => {
      if (state.score + action.payload >= 0) {
        state.score += action.payload;
      } else {
        state.score = 0;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuizAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getQuizAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.quiz = action.payload.quiz;
      })
      .addCase(getQuizAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { resetQuiz, computeScore } = quizSlice.actions;

export default quizSlice.reducer;
