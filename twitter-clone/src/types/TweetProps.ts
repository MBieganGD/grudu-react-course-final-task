import { User } from "./User";

export type TweetProps = {
  id: string;
  author_id: string;
  author?: User;
  text: string;
};
