import React, { ComponentProps } from "react";
import {
  IconPrototype,
  IconsDir,
} from "./components/IconPrototype/IconPrototype";

type Props = {
  size?: 16;
} & Omit<ComponentProps<typeof IconPrototype>, "filename" | "size">;

const Check: React.FC<Props> = ({ size = 16, ...props }) => {
  return (
    <IconPrototype
      filename={`${IconsDir()}/check_${size}.svg`}
      size={`${size}px`}
      {...props}
    />
  );
};

export default Check;
