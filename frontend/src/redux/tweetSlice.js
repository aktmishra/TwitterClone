import { createSlice } from "@reduxjs/toolkit";

const tweetSlice = createSlice({
    name: "tweet",
    initialState:{
        allTweet: null,
        followingTweet: false,
        refresh: true
    },
    reducers:{
        getAllTweet:(state, action)=>{
            state.allTweet = action.payload;
        },
        getFollowingTweet:(state, action)=>{
            state.followingTweet = action.payload;
        },
        getRefresh: (state, action)=>{
            state.refresh= !state.refresh
        },
        getFollowingTweet:(state, action)=>{
            state.followingTweet = action.payload;
        }
    }
})

export const{getAllTweet, getFollowingTweet, getRefresh} = tweetSlice.actions;
export default tweetSlice.reducer;