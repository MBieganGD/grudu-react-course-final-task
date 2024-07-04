import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../auth/authSlice";
import tweetReducer from "../tweets/tweetSlice";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    auth: authReducer,
    tweets: tweetReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
