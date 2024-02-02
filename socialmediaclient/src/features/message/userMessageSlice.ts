import { createSlice } from '@reduxjs/toolkit'
import { userChatsProps, userMessageProps} from '../../vite-env';

const initialState = {
  isLoading: false as boolean,
  userChats: {} as  userChatsProps,
  userMessageList: {} as userMessageProps,
  successMessage: "" as string | undefined,
  errMessage: "" as string | undefined

}

const userMessageSlice = createSlice({
  name: "userMessageSlice",
  initialState,
  reducers: {

    createUserMessageRequest: (state) => {
      state.isLoading = true;
    },
    createUserMessageSuccess: (state, action) => {
      state.isLoading = false;
      state.successMessage = action.payload
    },
    createUserMessageFails: (state, action) => {
      state.isLoading = false;
      state.errMessage = action.payload
    },

    getAllUserMessageRequest: (state) => {
      state.isLoading = true;
    },
    getAllUserMessageSuccess: (state, action) => {
      state.isLoading = false;
      state.userMessageList = action.payload
    },
    getAllUserMessageFails: (state, action) => {
      state.isLoading = false;
      state.errMessage = action.payload
    },

    sendMessageRequest: (state) => {
      state.isLoading = true;
    },
    sendMessageSuccess: (state, action) => {
      state.isLoading = false;
      state.successMessage = action.payload
    },
    sendMessageFails: (state, action) => {
      state.isLoading = false;
      state.errMessage = action.payload
    },

    getUserMessageRequest: (state) => {
      state.isLoading = true;
    },
    getUserMessageSuccess: (state, action) => {
      state.isLoading = false;
      state.userChats = action.payload;
    },
    getUserMessageFails: (state, action) => {
      state.isLoading = false;
      state.errMessage = action.payload;
    },

    deleteUserMessageRequest:(state)=>{
      state.isLoading = false;
    },
    deleteUserMessageSuccess: (state, action)=>{
      state.isLoading = false;
      state.successMessage = action.payload;
    },
    deleteUserMessageFails: (state, action)=>{
      state.isLoading = false;
      state.errMessage = action.payload;
    }
  }
})

export const { 
  createUserMessageRequest,
  createUserMessageSuccess,
  createUserMessageFails,
  getAllUserMessageRequest,
  getAllUserMessageSuccess,
  getAllUserMessageFails,
  sendMessageRequest,
  sendMessageSuccess,
  sendMessageFails,
  getUserMessageRequest,
  getUserMessageSuccess,
  getUserMessageFails,
  deleteUserMessageRequest,
  deleteUserMessageSuccess,
  deleteUserMessageFails
} = userMessageSlice.actions;

export default userMessageSlice.reducer;