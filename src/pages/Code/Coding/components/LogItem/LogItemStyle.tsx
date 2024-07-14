import styled, { css } from "styled-components";
import { GRAY_90, ORANGE_30, ORANGE_50, ORANGE_80 } from "styles/colors";
import { FlexGap } from "styles/FlexGap/FlexGap";

export type LogItemStyleProps = {
  state?: "default" | "active";
};

const defaultStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  ${FlexGap({ gap: "10px", direction: "row" })}

  color: ${GRAY_90};
  line-height: 160%;

  width: 100%;

  .logitem_turnnum {
    display: block;
    width: 24px;
    flex-shrink: 0;
    text-align: center;
  }

  .logitem_bar {
    width: 2px;
    background: ${GRAY_90};
    align-self: stretch;
    flex-shrink: 0;
    flex-grow: 0;
  }

  .logitem_log {
    flex-grow: 1;
    flex-shrink: 1;
    word-break: break-all;
    white-space: pre-wrap;
  }
`;

const activeStyle = css`
  position: relative;
  color: ${ORANGE_80};
  background-color: ${ORANGE_30}50;
  border-radius: 8px;

  .logitem_bar {
    background: ${ORANGE_50};
  }
`;

export const LogItemStyle = styled.div<LogItemStyleProps>`
  ${defaultStyle}

  ${({ state }) => state === "active" && activeStyle}
`;

LogItemStyle.defaultProps = {
  state: "default",
};
