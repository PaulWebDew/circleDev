import {type FC} from "react";
import cls from "./style.module.scss";
import {Link, useNavigate} from "react-router-dom";

export const Header: FC = () => {
  const navigate = useNavigate();
  return (
    <header className={cls.header}>
      <div className={cls.logo} role={"button"} onClick={() => navigate("/")}>
        <span className={cls.firstLetter}>C</span>
        <div className={cls.logoText}>
          <span>ircle</span>
          <span>dev</span>
        </div>
      </div>
      <nav>
        <Link to={'/'}>Home</Link>
      </nav>
    </header>
  );
};
