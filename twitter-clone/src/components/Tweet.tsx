import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import { TweetProps } from "../types/TweetProps";

const Tweet: React.FC<{ tweet: TweetProps }> = ({ tweet }) => {
  return (
    <Card
      sx={{
        margin: { xs: "1rem 0.2rem", md: "1rem 1rem" },
        border: "1px solid #e1e8ed",
        borderRadius: 3,
        boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            NL
          </Avatar>
        }
        action={<TwitterIcon color="primary" sx={{ display: "flex", mr: 1 }} />}
        title={
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {tweet.author?.name}
            </Typography>
            <Typography
              variant="body2"
              component="span"
              sx={{ color: "gray", ml: 1 }}
            >
              @{tweet.author?.id}
            </Typography>
          </Box>
        }
      />

      <CardContent sx={{ paddingTop: 0 }}>
        <Typography
          variant="body1"
          sx={{ whiteSpace: "pre-wrap" }}
          dangerouslySetInnerHTML={{
            __html: `${tweet.text}`,
          }}
        ></Typography>
      </CardContent>
    </Card>
  );
};

export default Tweet;
