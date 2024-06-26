import { useState } from "react";

export const useModalTimer = (
  num: number,
): { isActive: boolean; start: () => void } => {
  const [isActive, setIsActive] = useState(false);

  const start = () => {
    setIsActive(true);
    setTimeout(() => setIsActive(false), num);
  };
  console.log(isActive);
  return { isActive, start };
};
