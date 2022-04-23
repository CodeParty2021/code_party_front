import styled from "styled-components";
import { Flex, FlexProps } from "styles/Flex/Flex";
import { Mixable, MixableProps } from "styles/Mixable/Mixable";

export type VFrameProps = Omit<FlexProps, "direction"> & MixableProps;

export const VFrame = styled.div<VFrameProps>`
  ${(p) =>
    Flex({
      display: p.display,
      direction: "column",
      alignItems: p.alignItems,
      justifyContent: p.justifyContent,
      wrap: p.wrap,
      spacing: p.spacing,
    })}

  ${(p) => Mixable({ mixin: p.mixin })}
`;

VFrame.defaultProps = {
  alignItems: "flex-start",
  justifyContent: "flex-start",
  wrap: "nowrap",
  spacing: "0px",
};
