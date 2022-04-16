import React, { ComponentProps } from "react";
import {
  IconPrototype,
  IconsDir,
} from "./components/IconPrototype/IconPrototype";

type Props = {
  size?: 32;
} & Omit<ComponentProps<typeof IconPrototype>, "filename" | "size">;

const ShuffleValidation2: React.FC<Props> = ({ size = 32, ...props }) => {
  return (
    <IconPrototype
      filename={`${IconsDir()}/Shuffle_validation2_${size}.svg`}
      size={`${size}px`}
      {...props}
    />
  );
};

export default ShuffleValidation2;
