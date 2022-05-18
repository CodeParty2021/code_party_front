import styled, { css } from "styled-components";
import { iconCircle } from "styles/colors";

export type IconCircleStyleProps = {};

const defaultStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${iconCircle.bg};
  width: 64px;
  height: 64px;
  border-radius: 78.75px;
`;

export const IconCircleStyle = styled.div<IconCircleStyleProps>`
  ${defaultStyle}
`;

IconCircleStyle.defaultProps = {};
