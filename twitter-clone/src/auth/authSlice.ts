import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../types/User";

interface AuthState {
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/users?email=${email}`
      );
      if (response.data.length > 0) {
        const user = response.data[0];
        if (user.password === password) {
          return user;
        } else {
          return thunkAPI.rejectWithValue("Invalid password");
        }
      } else {
        return thunkAPI.rejectWithValue("Invalid email");
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (
    {
      email,
      fullName,
      password,
    }: { email: string; fullName: string; password: string },
    thunkAPI
  ) => {
    try {
      const existingUserResponse = await axios.get(
        `http://localhost:3001/users?email=${email}`
      );

      if (existingUserResponse.data.length > 0) {
        return thunkAPI.rejectWithValue("Email is already registered");
      }

      const id = fullName.split(" ").join("").toLowerCase();
      const response = await axios.post(`http://localhost:3001/users`, {
        id: id,
        name: fullName,
        password: password,
        email: email,
      });

      if (response.data) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue("Cannot sign up");
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.status = "idle";
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<{ email: string; name: string }>) => {
          state.status = "succeeded";
          state.user = action.payload;
          localStorage.setItem("user", JSON.stringify(action.payload));
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(
        signUp.fulfilled,
        (state, action: PayloadAction<{ email: string; name: string }>) => {
          state.status = "succeeded";
          state.user = action.payload;
          localStorage.setItem("user", JSON.stringify(action.payload));
        }
      )
      .addCase(signUp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
