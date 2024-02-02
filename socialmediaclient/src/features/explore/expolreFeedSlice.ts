import {createSlice} from '@reduxjs/toolkit'
import { userPostProps } from '../../vite-env';

const initialState={
  isLoading: false as boolean,
  explorefeed:{} as userPostProps,
  errMessage:"" as string|undefined

}

const exploreFeedSlice = createSlice({
     name:"exploreFeed",
     initialState,
     reducers:{
          
        getAllExploreFeedRequest:(state)=>{
          state.isLoading=true;
        },
        getAllExploreFeedSuccess:(state,action)=>{
           state.isLoading=false;
           state.explorefeed = action.payload 
        },
        getAllExploreFeedFails:(state,action)=>{
          state.isLoading = false;
          state.errMessage = action.payload
        }
     }
})

export const {
    getAllExploreFeedRequest,
    getAllExploreFeedSuccess,
    getAllExploreFeedFails
} =exploreFeedSlice.actions;
export default exploreFeedSlice.reducer;