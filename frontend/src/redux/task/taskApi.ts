import { createAsyncThunk } from "@reduxjs/toolkit";
import { authenticatedApi } from "../../service/api";
import { resolveAxiosError } from "../utils";

interface TaskResponse {
  success: boolean;
  data: ITask[];
}

export interface ITask {
  _id: string;
  title: string;
  description: string;
  status: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export const actionFetchTasks = createAsyncThunk(
  "api/task",
  async (_, thunkApi) => {
    await new Promise((res) => setTimeout(res, 300));
    try {
      return await authenticatedApi
        .get<TaskResponse>("/task")
        .then((res) => res.data);
    } catch (error) {
      return thunkApi.rejectWithValue(resolveAxiosError(error));
    }
  }
);

type CreateParams = {
  title: string;
  description?: string;
  dueDate: Date;
};
export const actionCreateTask = createAsyncThunk(
  "api/task/create",
  async (params: CreateParams, thunkApi) => {
    try {
      return await authenticatedApi
        .post<TaskResponse>("/task", params)
        .then((res) => res.data);
    } catch (error) {
      return thunkApi.rejectWithValue(resolveAxiosError(error));
    }
  }
);

type DeleteParams = {
  id: string;
};
export const actionDeleteTask = createAsyncThunk(
  "api/task/delete",
  async (params: DeleteParams, thunkApi) => {
    try {
      return await authenticatedApi
        .delete<TaskResponse>(`/task/${params.id}`)
        .then((res) => res.data);
    } catch (error) {
      return thunkApi.rejectWithValue(resolveAxiosError(error));
    }
  }
);
type UpdateParams = {
  id: string;
  status: string;
};
export const actionUpdateStatusTask = createAsyncThunk(
  "api/task/update/status",
  async (params: UpdateParams, thunkApi) => {
    try {
      return await authenticatedApi
        .put<TaskResponse>(`/task/${params.id}/status`, {
          status: params.status,
        })
        .then((res) => res.data);
    } catch (error) {
      return thunkApi.rejectWithValue(resolveAxiosError(error));
    }
  }
);
