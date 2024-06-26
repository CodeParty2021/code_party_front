import React, { ComponentProps } from "react";
import {
  IconPrototype,
  IconsDir,
} from "./components/IconPrototype/IconPrototype";

type Props = {
  size?: 24;
} & Omit<ComponentProps<typeof IconPrototype>, "filename" | "size">;

const Mail: React.FC<Props> = ({ size = 24, ...props }) => {
  return (
    <IconPrototype
      filename={`${IconsDir()}/mail_${size}.svg`}
      size={`${size}px`}
      {...props}
    />
  );
};

export default Mail;
