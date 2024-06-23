import App from "../pages/home/App.tsx";
import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../components/layout/rootLayout.tsx";
import { CategoriesPage } from "../pages/categories";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/category/:id",
        element: <CategoriesPage />,
      },
    ],
  },
]);
