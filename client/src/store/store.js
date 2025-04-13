import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import taskReducer from "./task-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer,
  },
});

export default store;