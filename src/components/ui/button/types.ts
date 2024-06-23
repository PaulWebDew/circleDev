import React, { ReactNode } from "react";

export interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  beforeIcon?: ReactNode;
  children: ReactNode;
  buttonClass?: string;
  afterIcon?: ReactNode;
}
