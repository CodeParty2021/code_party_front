import styled from "styled-components";
import { Flex, FlexProps } from "styles/Flex/Flex";
import { Mixable, MixableProps } from "styles/Mixable/Mixable";

export type HFrameProps = Omit<FlexProps, "direction"> & MixableProps;

export const HFrame = styled.div<HFrameProps>`
  ${(p) =>
    Flex({
      display: p.display,
      direction: "row",
      alignItems: p.alignItems,
      justifyContent: p.justifyContent,
      wrap: p.wrap,
      spacing: p.spacing,
    })}

  ${(p) => Mixable({ mixin: p.mixin })}
`;

HFrame.defaultProps = {
  alignItems: "flex-start",
  justifyContent: "flex-start",
  wrap: "nowrap",
  spacing: "0px",
};
