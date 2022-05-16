import styled, { css } from "styled-components";
import { Properties } from "csstype";
import { ReactSVG } from "react-svg";

export type PlanetPictureStyleProps = {
  size?: Properties["width"];
};

const defaultStyle = css``;

const withSizeStyle = css<PlanetPictureStyleProps>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`;

export const PlanetPictureStyle = styled(ReactSVG)<PlanetPictureStyleProps>`
  ${defaultStyle}

  ${({ size }) => size && withSizeStyle}
`;

PlanetPictureStyle.defaultProps = {
  color: "yellow",
  size: "161px",
};
