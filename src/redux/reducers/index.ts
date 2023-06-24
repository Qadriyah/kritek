import { combineReducers } from "@reduxjs/toolkit";
import postSlice from "./postSlice";

const rootReducer = combineReducers({
  posts: postSlice,
});

export default rootReducer;
