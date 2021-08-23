import { createSlice } from "@reduxjs/toolkit"
import { getLeaderboardAsync } from "../../utils/server.requests";

export interface TopScores {
    _id: string,
    score: number,
    user_id: {
        firstName: string,
        email: string,
        _id: string
    }
}

export interface LeaderboardState {
    _id: string,
    quiz_id: {
        _id: string,
        quizName: string
    },
    topScores: TopScores[]
}

export interface LeaderboardInterface {
    leaderboard: LeaderboardState[]
}

const initialState = {
    leaderboard: []
} as LeaderboardInterface

export const leaderboardSlice = createSlice({
    name: "leaderboard",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getLeaderboardAsync.fulfilled, (state, action) => {
                state.leaderboard = action.payload.leaderboard;
            });
    }
});

export default leaderboardSlice.reducer;