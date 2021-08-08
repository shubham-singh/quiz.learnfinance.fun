import { createSlice } from "@reduxjs/toolkit"
import { getLeaderboardAsync } from "../../utils/server.requests";

export interface TopScores {
    _id: string,
    firstName: string,
    score: number
}

export interface LeaderboardState {
    _id: string,
    quiz_id: string,
    topScores: TopScores[]
}

export interface LeaderboardInterface {
    leaderboard: LeaderboardState[]
}

const initialState = {
    leaderboard: []
}

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

export const {} = leaderboardSlice.actions;

export default leaderboardSlice.reducer;