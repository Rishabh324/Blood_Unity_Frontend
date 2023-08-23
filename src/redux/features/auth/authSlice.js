import { createSlice } from "@reduxjs/toolkit";
import { currentUser, userLogin, userRegister } from "./authActions";

const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;

const initialState = {
    loading: false,
    user: null,
    token,
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        //login user
        builder.addCase(userLogin.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.user = null;
        });
        builder.addCase(userLogin.fulfilled, (state, { payload }) => {
            state.loading = false;
            console.log(payload.data);
            state.user = payload.data;
            state.token = payload.token;
            state.error = null;
        })
        builder.addCase(userLogin.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        })
        //register user
        builder.addCase(userRegister.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(userRegister.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.user = payload.data;
        })
        builder.addCase(userRegister.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        })
        // current user
        builder.addCase(currentUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(currentUser.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.user = payload.user;
        })
        builder.addCase(currentUser.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        })
    },
});


export default authSlice;