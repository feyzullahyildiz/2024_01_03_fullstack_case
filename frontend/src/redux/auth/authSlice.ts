import { createSlice } from "@reduxjs/toolkit";
import { actionStartLogin } from "./authApi";
import { TokenService } from "../../service/Token.service";

interface State {
  login: {
    isLoading: boolean;
    isSuccess: boolean;
    isFailed: boolean;
  };
}

const initialState: State = {
  login: {
    isLoading: false,
    isSuccess: false,
    isFailed: false,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(actionStartLogin.pending, (state) => {
        state.login.isLoading = true;
        state.login.isSuccess = false;
        state.login.isFailed = false;
      })
      .addCase(actionStartLogin.fulfilled, (state, action) => {
        state.login.isLoading = false;
        state.login.isSuccess = true;
        state.login.isFailed = false;
        TokenService.setToken(action.payload.data.token);
      })
      .addCase(actionStartLogin.rejected, (state) => {
        state.login.isLoading = false;
        state.login.isSuccess = false;
        state.login.isFailed = true;
      });
  },
  reducers: {},
});

export default authSlice.reducer;
