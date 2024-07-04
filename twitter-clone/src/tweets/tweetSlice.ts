import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TweetProps } from "../types/TweetProps";
import { tweetApi } from "../utils/api";

interface TweetState {
  tweets: TweetProps[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: TweetState = {
  tweets: [],
  status: "idle",
  error: null,
};

export const fetchTweets = createAsyncThunk("tweets/fetchTweets", async () => {
  return await tweetApi.fetchTweets();
});

export const addTweet = createAsyncThunk(
  "tweets/addTweet",
  async ({ tweetText, userId }: { tweetText: string; userId: string }) => {
    return await tweetApi.addTweet(tweetText, userId);
  }
);

const tweetSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTweets.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchTweets.fulfilled,
        (state, action: PayloadAction<TweetProps[]>) => {
          state.status = "succeeded";
          state.tweets = action.payload;
        }
      )
      .addCase(fetchTweets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch tweets";
      })
      .addCase(addTweet.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        addTweet.fulfilled,
        (state, action: PayloadAction<TweetProps>) => {
          state.status = "succeeded";
          state.tweets.unshift(action.payload);
        }
      )
      .addCase(addTweet.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to add tweet";
      });
  },
});

export default tweetSlice.reducer;
