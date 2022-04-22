import { css } from "styled-components";
import { Properties } from "csstype";

export type ShapeProps = {
  bg?: Properties["background"];
  bgImage?: Properties["backgroundImage"];
  radius?: Properties["borderRadius"];
};

export const Shape = (props: ShapeProps) => css<ShapeProps>`
  background: ${props.bg};
  background-image: ${props.bgImage};
  ${!!props.bgImage && ImageStyle}
  border-radius: ${props.radius};
`;

const ImageStyle = css`
  background-size: cover;
`;
