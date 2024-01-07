import { createAsyncThunk } from "@reduxjs/toolkit";
import { authenticatedApi } from "../../service/api";
import { resolveAxiosError } from "../utils";

interface MeRes {
  success: boolean;
  user: {
    _id: string;
    name: string;
    email: string;
  };
}

export const actionMe = createAsyncThunk("api/me", async (_, thunkApi) => {
  try {
    return await authenticatedApi.get<MeRes>("/me").then((res) => res.data);
  } catch (error) {
    return thunkApi.rejectWithValue(resolveAxiosError(error));
  }
});
