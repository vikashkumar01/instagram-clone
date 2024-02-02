import { configureStore } from '@reduxjs/toolkit'

import authSlice from './features/authentication/authSlice'
import expolreFeedSlice from './features/explore/expolreFeedSlice'
import feedSlice from './features/feed/feedSlice'
import userMessageSlice from './features/message/userMessageSlice'
import profileSlice from './features/profile/profileSlice'
import userReelSlice from './features/reels/userReelSlice'
import userNotifications from './features/notification/notificationSlice'
import userSearchSlice from './features/search/searchSlice'


export const store = configureStore({
  reducer: {
     auth:authSlice,
     exploreFeed:expolreFeedSlice,
     feed:feedSlice,
     userMessage:userMessageSlice,
     profile:profileSlice,
     reels:userReelSlice,
     notifications:userNotifications,
     search:userSearchSlice
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch