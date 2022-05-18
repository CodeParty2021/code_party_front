import styled, { css } from "styled-components";
import { iconButton } from "styles/colors";

export type IconButtonStyleProps = {};

const defaultStyle = css`
  display: flex;
  padding: 12px;
  border-radius: 48px;
  background: ${iconButton.bg};
`;

export const IconButtonStyle = styled.button<IconButtonStyleProps>`
  ${defaultStyle}
`;

IconButtonStyle.defaultProps = {};
