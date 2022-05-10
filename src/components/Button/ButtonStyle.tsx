import styled, { css } from "styled-components";
import { button } from "styles/colors";
import { FONT_WEIGHT } from "styles/constants/constants";
import { FlexGap } from "styles/FlexGap/FlexGap";

export type ButtonStyleProps = {
  color?: "black" | "blue" | "pink" | "green";
  size?: "S" | "M" | "L";
  status?: "default" | "disabled";
};

const defaultStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  // font
  font-weight: ${FONT_WEIGHT.BOLD};
  line-height: 150%;
  color: ${button.font};

  .frame {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
`;

const blackStyle = css`
  background: ${button.black.side};
  .frame {
    background: ${button.black.surface};
  }
  &:hover {
    background: ${button.black.hover.side};
    .frame {
      background: ${button.black.hover.surface};
    }
  }
`;

const blueStyle = css`
  background: ${button.blue.side};
  .frame {
    background: ${button.blue.surface};
  }
`;

const pinkStyle = css`
  background: ${button.pink.side};
  .frame {
    background: ${button.pink.surface};
  }
`;

const greenStyle = css`
  background: ${button.green.side};
  .frame {
    background: ${button.green.surface};
  }
`;

const sStyle = css`
  border-radius: 8px;
  padding-bottom: 4px;
  font-size: 16px;

  .frame {
    border-radius: 8px;
    padding: 6px 16px;
    ${FlexGap({ gap: "8px", direction: "column" })}
  }
`;

const mStyle = css`
  border-radius: 24px;
  padding-bottom: 8px;
  font-size: 24px;

  .frame {
    border-radius: 24px;
    padding: 16px 48px;
    ${FlexGap({ gap: "10px", direction: "column" })}
  }
`;

const lStyle = css`
  border-radius: 24px;
  padding-bottom: 8px;
  font-size: 24px;

  .frame {
    border-radius: 24px;
    padding: 24px 64px;
    ${FlexGap({ gap: "10px", direction: "column" })}
  }
`;

const disabledStyle = css`
  background: ${button.disabled.side};
  .frame {
    background: ${button.disabled.surface};
    & > * {
      opacity: 0.2;
    }
  }
  &:hover {
    background: ${button.disabled.side};
    .frame {
      background: ${button.disabled.surface};
    }
  }
`;

export const ButtonStyle = styled.button<ButtonStyleProps>`
  ${defaultStyle}

  ${({ color }) => color == "black" && blackStyle}
  ${({ color }) => color == "blue" && blueStyle}
  ${({ color }) => color == "pink" && pinkStyle}
  ${({ color }) => color == "green" && greenStyle}

  ${({ size }) => size == "S" && sStyle}
  ${({ size }) => size == "M" && mStyle}
  ${({ size }) => size == "L" && lStyle}

  ${({ status }) => status == "disabled" && disabledStyle}
`;

ButtonStyle.defaultProps = {
  color: "black",
  size: "M",
  status: "default",
};
