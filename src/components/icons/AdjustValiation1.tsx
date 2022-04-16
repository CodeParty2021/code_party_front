import React, { ComponentProps } from "react";
import {
  IconPrototype,
  IconsDir,
} from "./components/IconPrototype/IconPrototype";

type Props = {
  size?: 16 | 32;
} & Omit<ComponentProps<typeof IconPrototype>, "filename" | "size">;

const AdjustValiation1: React.FC<Props> = ({ size = 16, ...props }) => {
  return (
    <IconPrototype
      filename={`${IconsDir()}/adjust_valiation1_${size}.svg`}
      size={`${size}px`}
      {...props}
    />
  );
};

export default AdjustValiation1;
