import { type FC, MouseEventHandler, useRef } from "react";

import { IModalProps } from "./types.ts";

import cls from "./style.module.scss";
import clsx from "clsx";
import { createPortal } from "react-dom";

export const Modal: FC<IModalProps> = ({
  children,
  open,
  closeModal,
  title,
  ...props
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const clickOutside: MouseEventHandler<HTMLDivElement> = (e) => {
    if (!modalRef.current?.contains(e.target as Element)) {
      closeModal();
    }
  };
  return (
    <>
      {open &&
        createPortal(
          <div
            className={clsx(cls.wrapper, open && cls.open)}
            {...props}
            onClick={clickOutside}
          >
            <div className={cls.modalContainer} ref={modalRef}>
              {title && <h2>{title}</h2>}
              {children}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};
