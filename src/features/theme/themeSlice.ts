import { createSlice } from "@reduxjs/toolkit";

export interface ThemeState {
    theme: "light" | "dark";
} 

const initialState: ThemeState = {
    theme: "dark"
}

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        switchTheme: (state) => {
            if (state.theme === "dark") {
                state.theme = "light";
            } else {
                state.theme = "dark";
            }
        }
    }
})

export const { switchTheme } = themeSlice.actions;

export default themeSlice.reducer;