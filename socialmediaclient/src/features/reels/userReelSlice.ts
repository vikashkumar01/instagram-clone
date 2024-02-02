import {createSlice} from '@reduxjs/toolkit'
import { userPostProps } from '../../vite-env';

const initialState={
  isLoading: false as boolean,
  reel:{} as userPostProps,
  errMessage:"" as string|undefined

}

const reelSlice = createSlice({
     name:"reelSlice",
     initialState,
     reducers:{
          
        getAllReelsRequest:(state)=>{
          state.isLoading=true;
        },
        getAllReelsSuccess:(state,action)=>{
           state.isLoading=false;
           state.reel = action.payload 
        },
        getAllReelsFails:(state,action)=>{
          state.isLoading = false;
          state.errMessage = action.payload
        }
     }
})

export const {
    getAllReelsRequest,
    getAllReelsSuccess,
    getAllReelsFails
} =reelSlice.actions;
export default reelSlice.reducer;