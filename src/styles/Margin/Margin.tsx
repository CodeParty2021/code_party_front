import { css } from "styled-components";
import { Properties } from "csstype";

export type MarginProps = {
  all?: Properties["marginTop"];

  topBottom?: Properties["marginTop"];
  leftRight?: Properties["marginTop"];

  top?: Properties["marginTop"];
  bottom?: Properties["marginBottom"];
  right?: Properties["marginRight"];
  left?: Properties["marginLeft"];
};

export const Margin = (props: MarginProps) => css`
  ${props.top &&
  css`
    margin-top: ${props.top};
  `}
  ${props.bottom &&
  css`
    margin-bottom: ${props.bottom};
  `}
  ${props.left &&
  css`
    margin-left: ${props.left};
  `}
  ${props.right &&
  css`
    margin-right: ${props.right};
  `}
  ${props.topBottom &&
  css`
    margin-top: ${props.topBottom};
    margin-bottom: ${props.topBottom};
  `}
  ${props.leftRight &&
  css`
    margin-left: ${props.leftRight};
    margin-right: ${props.leftRight};
  `}
  ${props.all &&
  css`
    margin-top: ${props.all};
    margin-bottom: ${props.all};
    margin-left: ${props.all};
    margin-right: ${props.all};
  `}
`;
