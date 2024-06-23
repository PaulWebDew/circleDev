import { ITask } from "../../../api/types.ts";
import { HTMLAttributes } from "react";

export interface IEditTaskProps extends HTMLAttributes<HTMLDivElement> {
  value: ITask;
}
