import styled, { css } from "styled-components";
import { RED_20, RED_50, RED_70 } from "styles/colors";

export type LogErrorStyleProps = {};

const defaultStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;

  color: ${RED_70};
  line-height: 160%;

  background: ${RED_20}50;
  border: 2px solid ${RED_50};
  border-radius: 8px;

  width: 100%;

  .log_error_label {
    font-size: 14px;
    font-weight: bold;
  }
`;

export const LogErrorStyle = styled.div<LogErrorStyleProps>`
  ${defaultStyle}
`;

LogErrorStyle.defaultProps = {};
