import { forwardRef } from "react";
import { IButtonProps } from "./types.ts";

import cls from "./style.module.scss";
import clsx from "clsx";

type Ref = HTMLButtonElement;

export const Button = forwardRef<Ref, IButtonProps>(
  ({ children, afterIcon, buttonClass, ...props }, ref) => {
    return (
      <button ref={ref} {...props} className={clsx(cls.button, buttonClass)}>
        {afterIcon}
        {children}
      </button>
    );
  },
);
