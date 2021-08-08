import { createSlice } from "@reduxjs/toolkit";
import { getScoreAsync, postScoreAsync } from "../../utils/server.requests";

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
            .addCase(getScoreAsync.fulfilled, (state, action) => {
                console.log("score request fullfilled: ", action.payload);
                state = action.payload.scores;
            })
    }
})

export default scoreSlice.reducer;