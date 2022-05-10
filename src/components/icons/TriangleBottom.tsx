import React, { ComponentProps } from "react";
import {
  IconPrototype,
  IconsDir,
} from "./components/IconPrototype/IconPrototype";

type Props = {
  size?: 32;
} & Omit<ComponentProps<typeof IconPrototype>, "filename" | "size">;

const TriangleBottom: React.FC<Props> = ({ size = 32, ...props }) => {
  return (
    <IconPrototype
      filename={`${IconsDir()}/triangle_bottom_${size}.svg`}
      size={`${size}px`}
      {...props}
    />
  );
};

export default TriangleBottom;
