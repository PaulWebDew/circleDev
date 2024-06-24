import { type FC } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../header";
import { Sidebar } from "../sidebar";
import { Footer } from "../footer";

import cls from "./style.module.scss";
import { Toaster } from "react-hot-toast";

export const RootLayout: FC = () => {
  return (
    <section className={cls.app}>
      <Toaster position="top-right" />
      <Header />
      <main className={cls.main}>
        <Sidebar />
        <Outlet />
      </main>
      <Footer />
    </section>
  );
};
