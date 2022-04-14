import React, { ComponentProps } from "react";
import {
  IconPrototype,
  IconsDir,
} from "./components/IconPrototype/IconPrototype";

type Prop = {
  size?: 16;
} & Omit<ComponentProps<typeof IconPrototype>, "filename" | "size">;

const ShuffleValidation1: React.FC<Prop> = ({ size = 16, ...props }) => {
  return (
    <IconPrototype
      filename={`${IconsDir()}/Shuffle_validation1_${size}.svg`}
      size={`${size}px`}
      {...props}
    />
  );
};

export default ShuffleValidation1;
