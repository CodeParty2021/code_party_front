import styled, { css } from "styled-components";
import { button } from "styles/colors";
import { FONT_WEIGHT } from "styles/constants/constants";
import { FlexGap } from "styles/FlexGap/FlexGap";
import { Icon16 } from "types/utils";

export type ButtonStyleProps = {
  color?: "black" | "blue" | "pink" | "green" | "white";
  size?: "S" | "M" | "M2" | "L";
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
    width: 100%;
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

const whiteStyle = css`
  background: ${button.white.side};
  color: ${button.white.font};
  .frame {
    border: 1px solid ${button.white.side};
    background: ${button.white.surface};
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

const m2Style = css`
  border-radius: 16px;
  padding-bottom: 6px;
  font-size: 24px;

  .frame {
    border-radius: 16px;
    padding: 12px 40px;
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
  color: ${button.font};
  .frame {
    background: ${button.disabled.surface};
    border: none;
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
  ${({ color }) => color == "white" && whiteStyle}

  ${({ size }) => size == "S" && sStyle}
  ${({ size }) => size == "M" && mStyle}
  ${({ size }) => size == "M2" && m2Style}
  ${({ size }) => size == "L" && lStyle}

  ${({ status }) => status == "disabled" && disabledStyle}
`;

ButtonStyle.defaultProps = {
  color: "black",
  size: "M",
  status: "default",
};

export const IconProps = ({ color, status }: ButtonStyleProps): Icon16 => {
  const fill =
    status === "disabled"
      ? button.black.font
      : color === "black"
      ? button.black.font
      : color === "blue"
      ? button.blue.font
      : color === "pink"
      ? button.pink.font
      : color === "green"
      ? button.green.font
      : color === "white"
      ? button.white.font
      : button.black.font;

  return {
    size: 16,
    fill: fill,
  };
};
