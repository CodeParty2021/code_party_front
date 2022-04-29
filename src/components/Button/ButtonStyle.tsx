import styled, { css } from "styled-components";
import { FlexGap } from "styles/FlexGap/FlexGap";
import { Bold } from "styles/Fonts/Base/Bold";

export type ButtonStyleProps = {
  color?: "black" | "blue" | "pink";
  size?: "S" | "M" | "L";
  status?: "default" | "disabled";
};

const defaultStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  // font
  ${Bold}
  color: ${({ theme }) => theme.color.plainWhite};

  .frame {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
`;

const blackStyle = css`
  background: ${(p) => p.theme.color.lightBlackShadow};
  .frame {
    background: ${(p) => p.theme.color.lightBlack};
  }
  &:hover {
    background: ${(p) => p.theme.color.grayShadow};
    .frame {
      background: ${(p) => p.theme.color.gray};
    }
  }
`;

const blueStyle = css`
  background: ${(p) => p.theme.color.blueShadow};
  .frame {
    background: ${(p) => p.theme.gradation.bluePurple};
  }
`;

const pinkStyle = css`
  background: ${(p) => p.theme.color.pinkShadow};
  .frame {
    background: ${(p) => p.theme.gradation.pinkOrange};
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
  background: ${(p) => p.theme.color.lightGrayShadow};
  .frame {
    background: ${(p) => p.theme.color.lightGray};
    & > * {
      opacity: 0.2;
    }
  }
  &:hover {
    background: ${(p) => p.theme.color.lightGrayShadow};
    .frame {
      background: ${(p) => p.theme.color.lightGray};
    }
  }
`;

export const ButtonStyle = styled.button<ButtonStyleProps>`
  ${defaultStyle}

  ${({ color }) => color == "black" && blackStyle}
  ${({ color }) => color == "blue" && blueStyle}
  ${({ color }) => color == "pink" && pinkStyle}

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
