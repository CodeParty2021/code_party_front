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
  padding: 0;
  gap: ${spacing};

  & > * {
    flex-grow: 0;
    flex-shrink: 0;
  }

  ${!spacing ? undefined : css`
    @supports not (gap: ${spacing}) {
      & > *:not(:first-child) {
        ${direction == "column"
          ? `margin-top: ${spacing}`
          : direction == "row"
          ? `margin-left: ${spacing}`
          : undefined}
      }
    }
  `}
`;
