import { createSlice } from "@reduxjs/toolkit";
import { userProps } from "../../vite-env";

const initialState = {
    isLoading: false as boolean,
    searchUser: {} as userProps,
    errMessage: "" as string | undefined
}

const userSearchSlice = createSlice({
    name: 'userSearchSlice',
    initialState,
    reducers: {

        getAllSearchUserRequest: (state) => {
            state.isLoading = true;
        },
        getAllSearchUserSuccess: (state, action) => {
            state.isLoading = false
            state.searchUser = action.payload
        },
        getAllSearchUserFails: (state, action) => {
            state.isLoading = false,
                state.errMessage = action.payload
        }
    }
})

export const {
    getAllSearchUserRequest,
    getAllSearchUserSuccess,
    getAllSearchUserFails,
} = userSearchSlice.actions;

export default userSearchSlice.reducer