import React from "react";
import ReactDOM from "react-dom/client";
import "./main.scss";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./api/store.ts";
import { router } from "./api/route.tsx";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
