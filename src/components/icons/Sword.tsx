import React, { ComponentProps } from "react";
import {
  IconPrototype,
  IconsDir,
} from "./components/IconPrototype/IconPrototype";

type Props = {
  size?: 64;
} & Omit<ComponentProps<typeof IconPrototype>, "filename" | "size">;

const Sword: React.FC<Props> = ({ size = 64, ...props }) => {
  return (
    <IconPrototype
      filename={`${IconsDir()}/sword_${size}.svg`}
      size={`${size}px`}
      {...props}
    />
  );
};

export default Sword;
