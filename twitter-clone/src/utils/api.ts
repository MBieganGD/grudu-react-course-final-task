import axios, { AxiosInstance, AxiosResponse } from "axios";
import { User } from "../types/User";
import { TweetProps } from "../types/TweetProps";

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:3001",
});

export const ApiEndpoints = {
  getUsers: "/users",
  getUserByEmail: (email: string) => `/users?email=${email}`,
  createUser: "/users",
  getTweets: "/tweets",
  getUserById: (id: string) => `/users?id=${id}`,
  createTweet: "/tweets",
};

export const authApi = {
  login: async (email: string, password: string): Promise<User> => {
    const response: AxiosResponse<User[]> = await api.get(
      ApiEndpoints.getUserByEmail(email)
    );
    const user = response.data[0];
    if (user && user.password === password) {
      return user;
    }
    throw new Error("Invalid email or password");
  },

  signUp: async (
    email: string,
    fullName: string,
    password: string
  ): Promise<User> => {
    const existingUserResponse: AxiosResponse<User[]> = await api.get(
      ApiEndpoints.getUserByEmail(email)
    );
    if (existingUserResponse.data.length > 0) {
      throw new Error("Email is already registered");
    }

    const id = fullName.replace(/\s/g, "").toLowerCase();
    const response: AxiosResponse<User> = await api.post(
      ApiEndpoints.createUser,
      {
        id,
        name: fullName,
        password,
        email,
      }
    );
    return response.data;
  },
};

export const tweetApi = {
  fetchTweets: async (): Promise<TweetProps[]> => {
    const response: AxiosResponse<TweetProps[]> = await api.get(
      ApiEndpoints.getTweets
    );
    const tweets = response.data;

    const tweetsWithAuthors = await Promise.all(
      tweets.map(async (tweet) => {
        const userResponse: AxiosResponse<User[]> = await api.get(
          ApiEndpoints.getUserById(tweet.author_id)
        );
        return { ...tweet, author: userResponse.data[0] };
      })
    );

    return tweetsWithAuthors;
  },

  addTweet: async (tweetText: string, userId: string): Promise<TweetProps> => {
    const response: AxiosResponse<TweetProps> = await api.post(
      ApiEndpoints.createTweet,
      {
        text: tweetText,
        author_id: userId,
      }
    );
    const userResponse: AxiosResponse<User[]> = await api.get(
      ApiEndpoints.getUserById(userId)
    );
    return { ...response.data, author: userResponse.data[0] };
  },
};

export default api;
