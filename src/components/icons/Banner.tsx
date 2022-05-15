import React, { ComponentProps } from "react";
import {
  IconPrototype,
  IconsDir,
} from "./components/IconPrototype/IconPrototype";

type Props = {
  size?: 32;
} & Omit<ComponentProps<typeof IconPrototype>, "filename" | "size">;

const Banner: React.FC<Props> = ({ size = 32, ...props }) => {
  return (
    <IconPrototype
      filename={`${IconsDir()}/banner_${size}.svg`}
      size={`${size}px`}
      {...props}
    />
  );
};

export default Banner;
