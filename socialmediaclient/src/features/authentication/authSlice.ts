import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { errUserPropsType, userPropsType, sucessLoginPropsType } from '../../vite-env';

const initialState = {
    isLoading: false as boolean,
    successMessage: "" as string | undefined,
    errMessage: {} as errUserPropsType |string| null,
    user: {} as userPropsType | null,
    isAuthenticated: null as boolean|null,
    token: "" as string | undefined,
}

const authSlice = createSlice({

    name: "auth",
    initialState,
    reducers: {

        signupRequest: (state) => {
            state.isLoading = true;
        },
        signupSuccess: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.successMessage = action.payload
        },
        signupFail: (state, action: PayloadAction<errUserPropsType>) => {
            state.isLoading = false;
            state.errMessage = action.payload
        },

        signInRequest: (state) => {
            state.isLoading = true;
        },
        signInSuccess: (state, action: PayloadAction<sucessLoginPropsType>) => {
            state.isLoading = false;
            state.successMessage = action.payload.message;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
        signInFail: (state, action) => {
            state.isLoading = false;
            state.errMessage = action.payload;
            state.isAuthenticated = false;
        },

        getUserRequest: (state) => {
            state.isLoading = true;
        },
        getUserSuccess: (state, action: PayloadAction<userPropsType>) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload
        },
        getUserFails: (state, action: PayloadAction<errUserPropsType>) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.errMessage = action.payload;
            state.user = null;
        },

        userForgotPasswordRequest: (state) => {
            state.isLoading = true;
        },
        userForgotPasswordSuccess: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.successMessage = action.payload
        },
        userForgotPasswordFails: (state, action: PayloadAction<errUserPropsType>) => {
            state.isLoading = false;
            state.errMessage = action.payload
        },

        userChangeForgotPasswordRequest: (state) => {
            state.isLoading = true;
        },
        userChangeForgotPasswordSuccess: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.successMessage = action.payload
        },
        userChangeForgotPasswordFails: (state, action: PayloadAction<errUserPropsType>) => {
            state.isLoading = false;
            state.errMessage = action.payload
        },

        signOutRequest: (state) => {
            state.isLoading = true;
        },
        signOutSuccess: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.successMessage = action.payload;
            state.user = null;
            state.token = undefined
        },
        signOutFails: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.errMessage = action.payload;
        },

        authClearState: (state) => {
            state.errMessage = null;
            state.successMessage = undefined
        }
    }

})

export const { 
    signupRequest,
    signupSuccess,
    signupFail,
    signInRequest,
    signInSuccess,
    signInFail,
    getUserRequest,
    getUserSuccess,
    getUserFails,
    userForgotPasswordRequest,
    userForgotPasswordSuccess,
    userForgotPasswordFails,
    userChangeForgotPasswordRequest,
    userChangeForgotPasswordSuccess,
    userChangeForgotPasswordFails,
    signOutRequest,
    signOutSuccess,
    signOutFails,
    authClearState,
} = authSlice.actions;
export default authSlice.reducer;