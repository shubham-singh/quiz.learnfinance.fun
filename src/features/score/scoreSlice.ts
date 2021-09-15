import { createSlice } from "@reduxjs/toolkit";
import { changeScoreAsync, getScoreAsync, postScoreAsync } from "../../utils/server.requests";

export interface scoreState {
    _id: string,
    quiz_id: {
        _id: string,
        quizName: string
    },
    score: number
}

const initialState: scoreState[] = [];

export const scoreSlice = createSlice({
    name: "score",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(postScoreAsync.fulfilled, (state, action) => {
                state = action.payload.scores;
            })
            .addCase(getScoreAsync.fulfilled, (state, action) => action.payload.scores.scores)
            .addCase(changeScoreAsync.fulfilled, (state, action) => action.payload.scores.scores);
    }
})

export default scoreSlice.reducer;