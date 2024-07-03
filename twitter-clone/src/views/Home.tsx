import React from "react";
import ResponsiveAppBar from "../components/AppBar";
import Tweet from "../components/Tweet";
import { Container } from "@mui/material";
import AddNewTweet from "../components/AddNewTweet";

const Home: React.FC = () => {
  return (
    <>
      <ResponsiveAppBar />
      <Container maxWidth="lg">
        <AddNewTweet></AddNewTweet>
        <Tweet></Tweet>
        <Tweet></Tweet>
        <Tweet></Tweet>
        <Tweet></Tweet>
        <Tweet></Tweet>
      </Container>
    </>
  );
};

export default Home;
