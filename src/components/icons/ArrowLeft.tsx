import React, { ComponentProps } from "react";
import {
  IconPrototype,
  IconsDir,
} from "./components/IconPrototype/IconPrototype";

type Props = {
  size?: 16 | 24;
} & Omit<ComponentProps<typeof IconPrototype>, "filename" | "size">;

const ArrowLeft: React.FC<Props> = ({ size = 16, ...props }) => {
  return (
    <IconPrototype
      filename={`${IconsDir()}/arrow_left_${size}.svg`}
      size={`${size}px`}
      {...props}
    />
  );
};

export default ArrowLeft;
