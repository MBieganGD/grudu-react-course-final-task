// src/features/tweets/tweetSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../utils/api";
import { TweetProps } from "../types/TweetProps";

interface TweetState {
  tweets: TweetProps[];
  loading: boolean;
  error: string | null;
}

const initialState: TweetState = {
  tweets: [],
  loading: false,
  error: null,
};

export const fetchTweets = createAsyncThunk("tweets/fetchTweets", async () => {
  const response = await api.get("/tweets");
  const tweets = response.data;

  const userPromises = tweets.map(async (tweet: TweetProps) => {
    const userResponse = await api.get(`/users?id=${tweet.author_id}`);
    tweet.author = userResponse.data[0];
    return tweet;
  });

  return Promise.all(userPromises);
});

export const addTweet = createAsyncThunk(
  "tweets/addTweet",
  async ({ tweetText, userId }: { tweetText: string; userId: string }) => {
    const response = await api.post("/tweets", {
      text: tweetText,
      author_id: userId,
    });
    return response.data;
  }
);

const tweetSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTweets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTweets.fulfilled, (state, action) => {
        state.loading = false;
        state.tweets = action.payload;
      })
      .addCase(fetchTweets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tweets";
      })
      .addCase(addTweet.fulfilled, (state, action) => {
        state.tweets.push(action.payload);
      });
  },
});

export default tweetSlice.reducer;
