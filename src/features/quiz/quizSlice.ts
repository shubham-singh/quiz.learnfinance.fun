import { createSlice } from "@reduxjs/toolkit";
import { getQuizAsync } from "../../utils/server.requests";

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
  error: null,
  quiz: {},
  score: 0,
} as QuizState;

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    resetQuiz: () => initialState,
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
      .addCase(getQuizAsync.fulfilled, (state, action) => {
        state.quiz = action.payload.quiz;
        state.score = 0;
      })
  },
});

export const { resetQuiz, computeScore } = quizSlice.actions;

export default quizSlice.reducer;
