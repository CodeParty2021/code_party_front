import React, { ComponentProps } from "react";
import {
  IconPrototype,
  IconsDir,
} from "./components/IconPrototype/IconPrototype";

type Props = {
  size?: 64;
} & Omit<ComponentProps<typeof IconPrototype>, "filename" | "size">;

const Setting: React.FC<Props> = ({ size = 64, ...props }) => {
  return (
    <IconPrototype
      filename={`${IconsDir()}/setting_${size}.svg`}
      size={`${size}px`}
      {...props}
    />
  );
};

export default Setting;
