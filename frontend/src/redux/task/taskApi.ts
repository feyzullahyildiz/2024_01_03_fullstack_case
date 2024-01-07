import { createAsyncThunk } from "@reduxjs/toolkit";
import { authenticatedApi } from "../../service/api";

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

export const actionFetchTasks = createAsyncThunk("api/task", async () => {
  await new Promise((res) => setTimeout(res, 500));
  return authenticatedApi.get<TaskResponse>("/task").then((res) => res.data);
});

type CreateParams = {
  title: string;
  description?: string;
  dueDate: Date;
};
export const actionCreateTask = createAsyncThunk(
  "api/task/create",
  async (params: CreateParams) => {
    return authenticatedApi
      .post<TaskResponse>("/task", params)
      .then((res) => res.data);
  }
);

type DeleteParams = {
  id: string;
};
export const actionDeleteTask = createAsyncThunk(
  "api/task/delete",
  (params: DeleteParams) => {
    return authenticatedApi
      .delete<TaskResponse>(`/task/${params.id}`)
      .then((res) => res.data);
  }
);
type UpdateParams = {
  id: string;
  status: string;
};
export const actionUpdateStatusTask = createAsyncThunk(
  "api/task/update/status",
  (params: UpdateParams) => {
    return authenticatedApi
      .put<TaskResponse>(`/task/${params.id}/status`, { status: params.status })
      .then((res) => res.data);
  }
);
