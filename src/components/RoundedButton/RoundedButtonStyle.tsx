import styled, { css } from "styled-components";
import { roundedButton } from "styles/colors";
import { FlexGap } from "styles/FlexGap/FlexGap";

export type RoundedButtonStyleProps = {};

type LocalStyleProps = {
  status?: "default" | "disabled";
};

const defaultStyle = css`
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${FlexGap({ gap: "8px", direction: "row" })}
  padding: 4px 12px 4px 16px;

  background: ${roundedButton.bg};
  border: 1px solid ${roundedButton.border};
  border-radius: 40px;

  color: ${roundedButton.font};
  font-size: 16px;
  line-height: 160%;
`;

const disabledStyle = css`
  & > * {
    opacity: 0.2;
  }
`;

const hoverStyle = css`
  :hover {
    border-color: ${roundedButton.hover.border};
  }
`;

export const RoundedButtonStyle = styled.button<
  RoundedButtonStyleProps & LocalStyleProps
>`
  ${defaultStyle}

  ${({ status }) => status != "disabled" && hoverStyle}
  ${({ status }) => status == "disabled" && disabledStyle}
`;

RoundedButtonStyle.defaultProps = {};
