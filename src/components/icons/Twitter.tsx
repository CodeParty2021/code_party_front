import React, { ComponentProps } from "react";
import {
  IconPrototype,
  IconsDir,
} from "./components/IconPrototype/IconPrototype";

type Props = {
  size?: 24;
} & Omit<ComponentProps<typeof IconPrototype>, "filename" | "size">;

const Twitter: React.FC<Props> = ({ size = 24, ...props }) => {
  return (
    <IconPrototype
      filename={`${IconsDir()}/twitter_${size}.svg`}
      size={`${size}px`}
      {...props}
    />
  );
};

export default Twitter;
