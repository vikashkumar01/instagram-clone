import { createSlice } from '@reduxjs/toolkit'
import { userNotification } from '../../vite-env';

const initialState = {
  isLoading: false as boolean,
  notification: {} as userNotification,
  successMessage: "" as string | undefined,
  errMessage: "" as string | undefined

}

const userNotificationsSlice = createSlice({
  name: "userNotificationsSlice",
  initialState,
  reducers: {


    getUserNotificationRequest: (state) => {
      state.isLoading = true;
    },
    getUserNotificationSuccess: (state, action) => {
      state.isLoading = false;
      state.notification = action.payload;
    },
    getUserNotificationFails: (state, action) => {
      state.isLoading = false;
      state.errMessage = action.payload;
    },

    deleteUserNotificationRequest:(state)=>{
      state.isLoading = false;
    },
    deleteUserNotificationSuccess: (state, action)=>{
      state.isLoading = false;
      state.successMessage = action.payload;
    },
    deleteUserNotificationFails: (state, action)=>{
      state.isLoading = false;
      state.errMessage = action.payload;
    }
  }
})

export const { 
      getUserNotificationRequest,
      getUserNotificationSuccess,
      getUserNotificationFails,
      deleteUserNotificationRequest,
      deleteUserNotificationSuccess,
      deleteUserNotificationFails,
} = userNotificationsSlice.actions;

export default userNotificationsSlice.reducer;