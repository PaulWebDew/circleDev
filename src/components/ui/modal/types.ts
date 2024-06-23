import React, { ReactNode } from "react";

export interface IModalProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  open: boolean;
  closeModal: () => void;
  title?: string;
}
