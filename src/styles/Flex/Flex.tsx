import { css } from "styled-components";
import { Properties } from "csstype";

export type FlexProps = {
  display?: "flex" | "inline-flex";
  direction?: Properties["flexDirection"];
  wrap?: Properties["flexWrap"];
  alignItems?: Properties["alignItems"];
  justifyContent?: Properties["justifyContent"];
  spacing?: Properties["width"];
};

export const Flex = ({
  display = "flex",
  direction = "column",
  wrap = "nowrap",
  alignItems = "flex-start",
  justifyContent = "flex-start",
  spacing,
}: FlexProps) => css<FlexProps>`
  display: ${display};
  flex-direction: ${direction};
  flex-wrap: ${wrap};
  align-items: ${alignItems};
  justify-content: ${justifyContent};

  & > *:not(:first-of-type) {
    ${!spacing
      ? undefined
      : direction == "column"
      ? "margin: " + spacing + " 0;"
      : direction == "row"
      ? "margin: 0 " + spacing + ";"
      : undefined}
  }
`;
