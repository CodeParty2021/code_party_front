import React, { ComponentProps } from "react";
import {
  IconPrototype,
  IconsDir,
} from "./components/IconPrototype/IconPrototype";

type Props = {
  size?: 16 | 32;
} & Omit<ComponentProps<typeof IconPrototype>, "filename" | "size">;

const Adjust: React.FC<Props> = ({ size = 16, ...props }) => {
  return (
    <IconPrototype
      filename={`${IconsDir()}/adjust_${size}.svg`}
      size={`${size}px`}
      {...props}
    />
  );
};

export default Adjust;
