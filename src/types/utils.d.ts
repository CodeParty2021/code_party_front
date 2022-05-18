import { IconPrototype } from "components/icons/components/IconPrototype/IconPrototype";
import { ComponentProps } from "react";

export type Icon24 = {
  size?: 24 | any;
} & Omit<ComponentProps<typeof IconPrototype>, "filename" | "size">;

export type Icon32 = {
  size?: 32 | any;
} & Omit<ComponentProps<typeof IconPrototype>, "filename" | "size">;
