import { HTMLAttributes } from "react";
import { ICategory } from "../../../api/types.ts";

export interface IEditInputFieldProps extends HTMLAttributes<HTMLDivElement> {
  value: ICategory;
}
