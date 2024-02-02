import { createSlice } from '@reduxjs/toolkit'
import { userPostProps, userProps } from '../../vite-env';

const initialState = {
  isLoading: false as boolean,
  allFeed: {} as userPostProps,
  singlePost: {} as userPostProps,
  userStory: {} as userProps,
  sucessMessage: '' as string,
  deleteFeed: '' as string,
  updateFeed: '' as string,
  errMessage: "" as string | undefined

}

const feedSlice = createSlice({
  name: "feedSlice",
  initialState,
  reducers: {

    createFeedRequest: (state) => {
      state.isLoading = true;
    },
    createFeedSuccess: (state, action) => {
      state.isLoading = false;
      state.sucessMessage = action.payload
    },
    createFeedFails: (state, action) => {
      state.isLoading = false;
      state.errMessage = action.payload
    },

    getAllFeedRequest: (state) => {
      state.isLoading = true;
    },
    getAllFeedSuccess: (state, action) => {
      state.isLoading = false;
      state.allFeed = action.payload
    },
    getAllFeedFails: (state, action) => {
      state.isLoading = false;
      state.errMessage = action.payload
    },

    getFeedByIdRequest: (state) => {
      state.isLoading = true;
    },
    getFeedByIdSuccess: (state, action) => {
      state.isLoading = false;
      state.singlePost = action.payload;
    },
    getFeedByIdFails: (state, action) => {
      state.isLoading = false;
      state.errMessage = action.payload;
    },

    updateFeedRequest: (state) => {
      state.isLoading = true;
    },
    updateFeedSuccess: (state, action) => {
      state.isLoading = false;
      state.singlePost = action.payload;
    },
    updateFeedFails: (state, action) => {
      state.isLoading = false;
      state.errMessage = action.payload;
    },

    updateFeedImageOrVideoRequest: (state) => {
      state.isLoading = true;
    },
    updateFeedImageOrVideoSuccess: (state, action) => {
      state.isLoading = false;
      state.singlePost = action.payload;
    },
    updateFeedImageOrVideoFails: (state, action) => {
      state.isLoading = false;
      state.errMessage = action.payload;
    },

    deleteFeedByIdRequest: (state) => {
      state.isLoading = true;
    },
    deleteFeedByIdSuccess: (state, action) => {
      state.isLoading = false;
      state.deleteFeed = action.payload;
    },
    deleteFeedByIdFails: (state, action) => {
      state.isLoading = false;
      state.errMessage = action.payload;
    },

    createCommentOfFeedRequest: (state) => {
      state.isLoading = false;
    },
    createCommentOfFeedSuccess: (state, action) => {
      state.isLoading = false;
      state.sucessMessage = action.payload
    },
    createCommentOfFeedFails: (state, action) => {
      state.isLoading = false;
      state.errMessage = action.payload
    },

    likeOrUnLikeRequest: (state) => {
      state.isLoading = true;
    },
    likeOrUnlikedSuccess: (state, action) => {
      state.isLoading = false;
      state.sucessMessage = action.payload;
    },
    likeOrUnlikedFails: (state, action) => {
      state.isLoading = false;
      state.errMessage = action.payload;
    },

    likeOrUnlikedCommentRequest: (state) => {
      state.isLoading = true;
    },
    likeOrUnlikedCommentSuccess: (state, action) => {
      state.isLoading = false;
      state.sucessMessage = action.payload;
    },
    likeOrUnlikedCommentFails: (state, action) => {
      state.isLoading = false;
      state.errMessage = action.payload;
    },

    deleteCommentRequest: (state) => {
      state.isLoading = true;
    },
    deleteCommentSuccess: (state, action) => {
      state.isLoading = false;
      state.sucessMessage = action.payload;
    },
    deleteCommentFails: (state, action) => {
      state.isLoading = false;
      state.errMessage = action.payload;
    },

    reportPostRequest: (state) => {
      state.isLoading = true;
    },
    reportPostSuccess: (state, action) => {
      state.isLoading = false;
      state.sucessMessage = action.payload;
    },
    reportPostFails: (state, action) => {
      state.isLoading = false;
      state.errMessage = action.payload;
    },


    createStoryRequest:(state)=>{
       state.isLoading = true;
    },
    createStorySuccess:(state, action)=>{
        state.isLoading = false;
        state.sucessMessage = action.payload
    },
    createStoryFails:(state, action)=>{
        state.isLoading = false;
        state.errMessage = action.payload
    },

    getAllUserOfHavingStroyRequest: (state) => {
      state.isLoading = true;
    },
    getAllUserOfHavingStroySuccess: (state, action) => {
      state.isLoading = false;
      state.userStory = action.payload;
    },
    getAllUserHavingStoryFails: (state, action) => {
      state.isLoading = false;
      state.errMessage = action.payload;
    },

    deleteStoryRequest: (state) => {
      state.isLoading = false;
    },
    deleteStorySuccess:(state,action)=>{
      state.isLoading = false;
      state.sucessMessage= action.payload
    },
    deleteStoryFails:(state,action)=>{
      state.isLoading = false;
      state.errMessage = action.payload
    }

  }
})

export const {
  createFeedRequest,
  createFeedSuccess,
  createFeedFails,
  getAllFeedRequest,
  getAllFeedSuccess,
  getAllFeedFails,
  getFeedByIdRequest,
  getFeedByIdSuccess,
  getFeedByIdFails,
  updateFeedRequest,
  updateFeedSuccess,
  updateFeedFails,
  updateFeedImageOrVideoRequest,
  updateFeedImageOrVideoSuccess,
  updateFeedImageOrVideoFails,
  deleteFeedByIdRequest,
  deleteFeedByIdSuccess,
  deleteFeedByIdFails,
  createCommentOfFeedRequest,
  createCommentOfFeedSuccess,
  createCommentOfFeedFails,
  likeOrUnLikeRequest,
  likeOrUnlikedSuccess,
  likeOrUnlikedFails,
  likeOrUnlikedCommentRequest,
  likeOrUnlikedCommentSuccess,
  likeOrUnlikedCommentFails,
  deleteCommentRequest,
  deleteCommentSuccess,
  deleteCommentFails,
  reportPostRequest,
  reportPostSuccess,
  reportPostFails,
  createStoryRequest,
  createStorySuccess,
  createStoryFails,
  getAllUserOfHavingStroyRequest,
  getAllUserOfHavingStroySuccess,
  getAllUserHavingStoryFails,
  deleteStoryRequest,
  deleteStorySuccess,
  deleteStoryFails

} = feedSlice.actions;

export default feedSlice.reducer;