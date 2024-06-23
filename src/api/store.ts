import { configureStore } from "@reduxjs/toolkit";
import { categoryApi } from "./categories.api.ts";
import { taskApi } from "./tasks.api.ts";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [categoryApi.reducerPath]: categoryApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(categoryApi.middleware, taskApi.middleware),
});

setupListeners(store.dispatch);
