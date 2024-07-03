import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  TextField,
  Typography,
} from "@mui/material";

const MAX_CHAR_COUNT = 140;

const AddNewTweet: React.FC = () => {
  const [tweetText, setTweetText] = useState("");
  const remainingChars = MAX_CHAR_COUNT - tweetText.length;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= MAX_CHAR_COUNT) {
      setTweetText(event.target.value);
    }
  };

  return (
    <Card
      sx={{
        margin: { xs: "1rem 0.2rem 3rem", md: "1rem 1rem 5rem" },
        padding: "2rem",
        border: "1px solid #e1e8ed",
        borderRadius: 3,
        boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <TextField
        id="tweet-text"
        placeholder="What's happening?"
        multiline
        rows={4}
        variant="standard"
        fullWidth
        InputProps={{ disableUnderline: true }}
        value={tweetText}
        onChange={handleChange}
        sx={{
          "& .MuiInputBase-input": {
            fontSize: "1.25rem",
          },
        }}
      />

      <Divider sx={{ margin: "1rem 0" }} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "0.5rem",
          alignItems: "center",
        }}
      >
        <Typography
          variant="body2"
          component="span"
          sx={{
            color: remainingChars < 0 ? "red" : "gray",
            ml: 1,
            borderRight: "0.2px solid gray",
            padding: "0.5rem",
          }}
        >
          {remainingChars < 0 ? "Too many characters" : `${remainingChars}`}
        </Typography>

        <Button
          variant="contained"
          disabled={tweetText.length < 1 || tweetText.length > MAX_CHAR_COUNT}
          sx={{ borderRadius: 3 }}
        >
          Tweet
        </Button>
      </Box>
    </Card>
  );
};

export default AddNewTweet;
