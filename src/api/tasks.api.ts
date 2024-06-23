import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICategory, ICreateTaskBody, IEditData } from "./types";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_URL }),
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: (id) => `/task/${id}`,
      providesTags: ["Tasks"],
    }),
    createTask: builder.mutation<ICategory, ICreateTaskBody>({
      query: (data) => ({
        url: "/task/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Tasks"],
    }),

    deleteTask: builder.mutation<any, string>({
      query: (id) => ({
        url: `/task/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),
    editCategory: builder.mutation<any, IEditData>({
      query: (data) => ({
        url: `/task/${data.id}`,
        method: "PUT",
        body: { title: data.title },
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});
