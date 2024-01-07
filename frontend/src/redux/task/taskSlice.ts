import { createSlice } from "@reduxjs/toolkit";
import { ITask, actionFetchTasks } from "./taskApi";

interface State {
  isLoading: boolean;
  isSuccess: boolean;
  isFailed: boolean;
  tasks: ITask[];
}

const initialState: State = {
  isLoading: false,
  isSuccess: false,
  isFailed: false,
  tasks: [],
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(actionFetchTasks.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isFailed = false;
      // state.tasks = [];
    });
    builder.addCase(actionFetchTasks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isFailed = false;
      state.tasks = action.payload.data;
    });
    builder.addCase(actionFetchTasks.rejected, (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isFailed = true;
      state.tasks = [];
    });
  },
});
export default taskSlice.reducer;
