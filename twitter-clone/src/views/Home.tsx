import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, CircularProgress } from "@mui/material";
import ResponsiveAppBar from "../components/AppBar";
import Tweet from "../components/Tweet";
import AddNewTweet from "../components/AddNewTweet";
import { fetchTweets } from "../tweets/tweetSlice";
import { AppDispatch, RootState } from "../store/store";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tweets = useSelector((state: RootState) => state.tweets.tweets);
  const loading = useSelector((state: RootState) => state.tweets.loading);

  useEffect(() => {
    dispatch(fetchTweets());
  }, [dispatch]);

  return (
    <>
      <ResponsiveAppBar />
      <Container maxWidth="lg">
        <AddNewTweet />
        {loading ? (
          <CircularProgress />
        ) : (
          tweets.map((tweet) => <Tweet key={tweet.id} tweet={tweet} />)
        )}
      </Container>
    </>
  );
};

export default Home;
