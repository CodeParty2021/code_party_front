import styled from "styled-components";
import { Flex, FlexProps } from "styles/Flex/Flex";
import { Mixable, MixableProps } from "styles/Mixable/Mixable";

type Props = Omit<FlexProps, "display" | "direction"> & MixableProps;

export const HFrame = styled.div<Props>`
  ${(p) =>
    Flex({
      display: "flex",
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
