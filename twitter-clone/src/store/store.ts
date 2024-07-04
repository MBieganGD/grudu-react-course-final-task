import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../auth/authSlice";
import tweetReducer from "../tweets/tweetSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    tweets: tweetReducer,
  },
});

const userFromStorage = localStorage.getItem("user");
if (userFromStorage) {
  store.dispatch({
    type: "auth/login/fulfilled",
    payload: JSON.parse(userFromStorage),
  });
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
