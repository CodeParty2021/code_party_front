import { ReactSVG } from "react-svg";
import styled, { css } from "styled-components";
import { GRAY_90, RED_50, TURQUOISE_50, WHITE } from "styles/colors";
import { FONT } from "styles/constants/constants";
import { FlexGap } from "styles/FlexGap/FlexGap";

export type MessageStyleProps = {
  color?: "blue" | "red";
};

const defaultStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  .message_container_main {
    display: flex;
    flex-direction: column;
    align-items: center;
    ${FlexGap({ gap: "24px", direction: "column" })}

    padding: 72px 32px 0 32px;

    width: 614px;
    height: 210px;
    border-radius: 48px;
    background: ${WHITE};
  }

  .message_title {
    font-family: ${FONT.F_851Gkktt};
    font-size: 32px;
    line-height: 25px;
  }

  .message_value {
    font-size: 24px;
    line-height: 150%;
    color: ${GRAY_90};
    text-align: center;
  }
`;

const blueStyle = css`
  .message_title {
    color: ${TURQUOISE_50};
  }
`;

const redStyle = css`
  .message_title {
    color: ${RED_50};
  }
`;

export const MessageStyle = styled.div<MessageStyleProps>`
  ${defaultStyle}

  ${({ color }) => color == "blue" && blueStyle}
  ${({ color }) => color == "red" && redStyle}
`;

MessageStyle.defaultProps = {
  color: "blue",
};

export const MessageTriangleStyle = styled(ReactSVG)`
  width: 40px;
  height: 16px;
  fill: ${WHITE};
`;
