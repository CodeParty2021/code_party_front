import { IconPrototype } from "components/icons/components/IconPrototype/IconPrototype";
import { ComponentProps } from "react";

export type Icon32 = {
  size?: 32 | any;
} & Omit<ComponentProps<typeof IconPrototype>, "filename" | "size">;
