import { createAsyncThunk } from "@reduxjs/toolkit";
import { MeService } from "../../service/MeService";

export const actionMe = createAsyncThunk("api/me", () => {
  return MeService.me();
});
