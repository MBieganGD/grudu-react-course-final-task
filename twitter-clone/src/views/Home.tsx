import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, CircularProgress, Box, Typography } from "@mui/material";
import ResponsiveAppBar from "../components/AppBar";
import Tweet from "../components/Tweet";
import AddNewTweet from "../components/AddNewTweet";
import { fetchTweets } from "../tweets/tweetSlice";
import { AppDispatch, RootState } from "../store/store";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tweets, status, error } = useSelector(
    (state: RootState) => state.tweets
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTweets());
    }
  }, [status, dispatch]);

  return (
    <>
      <ResponsiveAppBar />
      <Container maxWidth="lg">
        <AddNewTweet />
        {status === "loading" && (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        )}
        {status === "failed" && (
          <Box my={4}>
            <Typography color="error">Error: {error}</Typography>
          </Box>
        )}
        {status === "succeeded" &&
          tweets.map((tweet) => <Tweet key={tweet.id} tweet={tweet} />)}
      </Container>
    </>
  );
};

export default Home;
