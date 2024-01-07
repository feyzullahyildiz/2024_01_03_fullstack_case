import {
  configureStore,
  combineReducers,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import meReducer from "./me/meSlice";
import taskReducer from "./task/taskSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  me: meReducer,
  task: taskReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
