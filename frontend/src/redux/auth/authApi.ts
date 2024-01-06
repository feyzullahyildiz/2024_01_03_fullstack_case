import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../service/api";
import { isAxiosError } from "axios";

type LoginParams = { email: string; password: string };

interface LoginRes {
  success: boolean;
  token: string;
}

export const actionStartLogin = createAsyncThunk(
  "/api/auth/login",
  async ({ email, password }: LoginParams, thunkApi) => {
    try {
      return await api.post<LoginRes>("/auth/login", {
        email,
        password,
      });
    } catch (error) {
      if (isAxiosError(error)) {
        const err = error.response?.data || error;
        return thunkApi.rejectWithValue(err);
      }
      throw error;
    }
  }
);

type SignupParams = { name: string; email: string; password: string };
export const actionStartSignup = createAsyncThunk(
  "/api/auth/signup",
  async ({ name, email, password }: SignupParams, thunkApi) => {
    try {
      return await api.post("/auth/signup", {
        name,
        email,
        password,
      });
    } catch (error) {
      if (isAxiosError(error)) {
        const err = error.response?.data || error;
        return thunkApi.rejectWithValue(err);
      }
      throw error;
    }
  }
);
