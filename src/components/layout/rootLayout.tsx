import { type FC } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../header";
import { Sidebar } from "../sidebar";
import { Footer } from "../footer";

import cls from "./style.module.scss";

export const RootLayout: FC = () => {
  return (
    <section className={cls.app}>
      <Header />
      <main className={cls.main}>
        <Sidebar />
        <Outlet />
      </main>
      <Footer />
    </section>
  );
};
