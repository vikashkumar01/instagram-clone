import { createSlice } from '@reduxjs/toolkit'
import { userPropsType } from '../../vite-env';

const initialState = {
  isLoading: false as boolean,
  ishighlightLoading: false as boolean,
  userProfile: {} as userPropsType | undefined,
  successMessage: "" as string | undefined,
  errMessage: "" as string | undefined
}

const profileSlice = createSlice({
  name: "profileSlice",
  initialState,
  reducers: {

    getUserProfileRequest: (state) => {
      state.isLoading = true;
    },
    getUserProfileSuccess: (state, action) => {
      state.isLoading = false;
      state.userProfile = action.payload
    },
    getUserProfileFails: (state, action) => {
      state.isLoading = false;
      state.errMessage = action.payload
    },

    changeUserProfileImageRequest: (state) => {
      state.isLoading = false;
    },
    changeUserProfileImageSuccess: (state, action) => {
      state.isLoading = false;
      state.successMessage = action.payload;
    },
    changeProfileImageFails: (state, action) => {
      state.isLoading = false;
      state.errMessage = action.payload;
    },

    updateUserProfileRequest: (state) => {
      state.isLoading = false;
    },
    updateUserProfileSuccess: (state, action) => {
      state.isLoading = false;
      state.successMessage = action.payload;
    },
    updateUserProfileFails: (state, action) => {
      state.isLoading = false;
      state.errMessage = action.payload;
    },

    changeUserPaswordRequest: (state) => {
      state.isLoading = false;
    },
    changeUserPaswordSuccess: (state, action) => {
      state.isLoading = false;
      state.successMessage = action.payload;
    },
    changeUserPaswordFails: (state, action) => {
      state.isLoading = false;
      state.errMessage = action.payload;
    },


    deleteUserRequest: (state) => {
      state.isLoading = false;
    },
    deleteUserSuccess: (state, action) => {
      state.isLoading = false;
      state.successMessage = action.payload;
    },
    deletUserFails: (state, action) => {
      state.isLoading = false;
      state.errMessage = action.payload;
    },

    followOrUnFollowUserRequest: (state) => {
      state.isLoading = true;
    },
    followOrUnFollowUserSuccess: (state, action) => {
      state.isLoading = false;
      state.successMessage = action.payload
    },
    followOrUnFollowUserFails: (state, action) => {
      state.isLoading = false;
      state.errMessage = action.payload
    },

    savePostInFavRequest: (state) => {
      state.isLoading = true;
    },
    savePostInFavSuccess: (state, action) => {
      state.isLoading = false;
      state.successMessage = action.payload;
    },
    savePostInFavFails: (state, action) => {
      state.isLoading = false;
      state.errMessage = action.payload
    },

    removeUserFavPostRequest: (state) => {
      state.isLoading = true;
    },
    removeUserFavPostSuccess: (state, action) => {
      state.isLoading = false;
      state.successMessage = action.payload
    },
    removeUserFavPostFails: (state, action) => {
      state.isLoading = false;
      state.errMessage = action.payload;
    },

    logoutUserSuccess: (state) => {
      state.isLoading = false;
      state.userProfile = undefined;
    },

    clearProfileState: (state) => {
      state.errMessage = undefined;
      state.successMessage = undefined;
    },

    createHighlightRequest: (state) => {
      state.ishighlightLoading = true
    },

    createHighlightSuccess: (state, action) => {
      state.ishighlightLoading = false
      state.successMessage = action.payload
    },

    createHighlightFails: (state, action) => {
      state.ishighlightLoading = false
      state.errMessage = action.payload
    },

    addStoryInHighlightRequest: (state) => {
      state.ishighlightLoading = true
    },

    addStoryInHighlightSuccess: (state, action) => {
      state.ishighlightLoading = false
      state.successMessage = action.payload
    },

    addStoryInHighlightFails: (state, action) => {
      state.ishighlightLoading = false
      state.errMessage = action.payload
    },

    removeStoryFromHighlightRequest: (state) => {
      state.ishighlightLoading = true
    },

    removeStoryFromHighlightSuccess: (state, action) => {
      state.ishighlightLoading = false
      state.successMessage = action.payload
    },

    deleteHighlightFails: (state, action) => {
      state.ishighlightLoading = false
      state.errMessage = action.payload
    },

    deleteHighlightRequest: (state) => {
      state.ishighlightLoading = true
    },

    deleteHighlightSuccess: (state, action) => {
      state.ishighlightLoading = false
      state.successMessage = action.payload
    },

    removeStoryFromHighlightFails: (state, action) => {
      state.ishighlightLoading = false
      state.errMessage = action.payload
    },

  }
})

export const {
  getUserProfileRequest,
  getUserProfileSuccess,
  getUserProfileFails,
  changeUserProfileImageRequest,
  changeUserProfileImageSuccess,
  changeProfileImageFails,
  updateUserProfileRequest,
  updateUserProfileSuccess,
  updateUserProfileFails,
  changeUserPaswordRequest,
  changeUserPaswordSuccess,
  changeUserPaswordFails,
  deleteUserRequest,
  deleteUserSuccess,
  deletUserFails,
  followOrUnFollowUserRequest,
  followOrUnFollowUserSuccess,
  followOrUnFollowUserFails,
  savePostInFavRequest,
  savePostInFavSuccess,
  savePostInFavFails,
  removeUserFavPostRequest,
  removeUserFavPostSuccess,
  removeUserFavPostFails,
  logoutUserSuccess,
  clearProfileState,
  createHighlightRequest,
  createHighlightSuccess,
  createHighlightFails,
  addStoryInHighlightRequest,
  addStoryInHighlightSuccess,
  addStoryInHighlightFails,
  removeStoryFromHighlightRequest,
  removeStoryFromHighlightSuccess,
  removeStoryFromHighlightFails,
  deleteHighlightRequest,
  deleteHighlightSuccess,
  deleteHighlightFails
} = profileSlice.actions;
export default profileSlice.reducer;