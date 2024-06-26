import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICategory, IEditData } from "./types";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_URL }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategories: builder.query<ICategory[], any>({
      query: () => `/category`,
      providesTags: ["Category"],
    }),
    getOneCategory: builder.query<ICategory, any>({
      query: (id) => `/category/${id}`,
      providesTags: ["Category"],
    }),
    createCategory: builder.mutation<ICategory, { title: string }>({
      query: (data) => ({
        url: "/category/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation<any, string>({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
    editCategory: builder.mutation<any, IEditData>({
      query: (data) => ({
        url: `/category/${data.id}`,
        method: "PUT",
        body: { title: data.title },
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

// export const { useCreateCategoryMutation, useGetCategoriesQuery } = categoryApi;
