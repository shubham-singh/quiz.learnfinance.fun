import { createSlice } from "@reduxjs/toolkit";

interface Auth {
  token: string;
  firstName: string;
  loggedIn: boolean;
}

const initialState: Auth = {
  token: JSON.parse(localStorage.getItem("auth_learnfinance")),
  firstName: "",
  loggedIn: (function () {
    return localStorage.getItem("auth_learnfinance") ? true : false;
  })(),
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state) => state,
        logout: (state) => state,
        user_info: (state) => state
    }
})

export const {  } = authSlice.actions;

export default authSlice.reducer;