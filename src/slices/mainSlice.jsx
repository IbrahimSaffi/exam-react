import { createSlice } from "@reduxjs/toolkit";

// rename mainState this is slice name in store
const mainSlice = createSlice({
    name: "mainSlice",
    initialState: {
        //rename first state
     currUser:null,
     feedbackPerson:null,
    },
    reducers: {
        //rename first reducer
        setCurrUser: (state, action) => {
           state.currUser=action.payload
        },
        setFeedbackPerson:(state,action)=>{
            state.feedbackPerson = action.payload
        },
    },
})


export default mainSlice.reducer;
export const {setCurrUser,setFeedbackPerson} = mainSlice.actions;