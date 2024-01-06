import { createSlice } from "@reduxjs/toolkit";
import { actionMe } from "./meApi";
import { TokenService } from "../../service/Token.service";

interface State {
  isLoading: boolean;
  isSuccess: boolean;
  isFailed: boolean;
  user: {
    name: string;
    email: string;
  } | null;
}

const initialState: State = {
  isLoading: false,
  isSuccess: false,
  isFailed: false,
  user: null,
};

export const meSlice = createSlice({
  name: "me",
  initialState,
  reducers: {
    actionLogout(state) {
      TokenService.clearToken();
      state.isLoading = false;
      state.isSuccess = false;
      state.isFailed = false;
      state.user = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(actionMe.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isFailed = false;
      state.user = null;
    });
    builder.addCase(actionMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isFailed = false;
      state.user = {
        name: action.payload.user.name,
        email: action.payload.user.email,
      };
    });
    builder.addCase(actionMe.rejected, (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isFailed = true;
      state.user = null;
    });
  },
});
export const { actionLogout } = meSlice.actions;
export default meSlice.reducer;
