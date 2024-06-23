import { type FC } from "react";
import { InputProps } from "./types.ts";

import cls from "./style.module.scss";

export const Input: FC<InputProps> = ({ autoFocus, ...props }) => {
  return (
    <div>
      <input {...props} className={cls.input} autoFocus={autoFocus} />
    </div>
  );
};
