import { css } from "styled-components";
import { Properties } from "csstype";

export type PaddingProps = {
  all?: Properties["paddingTop"];

  topBottom?: Properties["paddingTop"];
  leftRight?: Properties["paddingTop"];

  top?: Properties["paddingTop"];
  bottom?: Properties["paddingBottom"];
  right?: Properties["paddingRight"];
  left?: Properties["paddingLeft"];
};

export const Padding = (props?: PaddingProps) => css`
  ${props?.top &&
  css`
    padding-top: ${props?.top};
  `}
  ${props?.bottom &&
  css`
    padding-bottom: ${props?.bottom};
  `}
  ${props?.left &&
  css`
    padding-left: ${props?.left};
  `}
  ${props?.right &&
  css`
    padding-right: ${props?.right};
  `}
  ${props?.topBottom &&
  css`
    padding-top: ${props?.topBottom};
    padding-bottom: ${props?.topBottom};
  `}
  ${props?.leftRight &&
  css`
    padding-left: ${props?.leftRight};
    padding-right: ${props?.leftRight};
  `}
  ${props?.all &&
  css`
    padding-top: ${props?.all};
    padding-bottom: ${props?.all};
    padding-left: ${props?.all};
    padding-right: ${props?.all};
  `}
`;
