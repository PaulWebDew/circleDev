import { type FC } from "react";
import { IIconProps } from "./types.ts";

export const EditIcon: FC<IIconProps> = ({
  color,
  width,
  height,
  ...props
}) => {
  return (
    <div
      style={{ display: "flex", justifyItems: "center", alignItems: "center" }}
      {...props}
    >
      <svg
        width={width || 24}
        height={height || 24}
        viewBox="0 -0.5 21 21"
        fill="none"
      >
        <g
          id="Page-1"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g
            id="Dribbble-Light-Preview"
            transform="translate(-339.000000, -360.000000)"
            fill={"currentColor" || color}
          >
            <g id="icons" transform="translate(56.000000, 160.000000)">
              <path
                d="M283,220 L303.616532,220 L303.616532,218.042095 L283,218.042095 L283,220 Z M290.215786,213.147332 L290.215786,210.51395 L296.094591,205.344102 L298.146966,207.493882 L292.903151,213.147332 L290.215786,213.147332 Z M299.244797,202.64513 L301.059052,204.363191 L299.645788,205.787567 L297.756283,203.993147 L299.244797,202.64513 Z M304,204.64513 L299.132437,200 L288.154133,209.687714 L288.154133,215.105237 L293.78657,215.105237 L304,204.64513 Z"
                id="edit-[#1483]"
              ></path>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};
