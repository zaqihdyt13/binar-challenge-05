import { combineReducers } from "@reduxjs/toolkit";
import PostReducers from "./PostReducers";
import AuthReducers from "./AuthReducers";

// We will have some reducers here
export default combineReducers({
  post: PostReducers,
  auth: AuthReducers,
});