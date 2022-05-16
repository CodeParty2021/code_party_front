import styled, { css } from "styled-components";
import { roundedButton } from "styles/colors";
import { FlexGap } from "styles/FlexGap/FlexGap";

export type RoundedButtonStyleProps = {};

type LocalStyleProps = {
  icon?: "left" | "right" | null;
  status?: "default" | "disabled";
};

const defaultStyle = css`
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${FlexGap({ gap: "8px", direction: "row" })}

  height: 40px;

  background: ${roundedButton.bg};
  border: 1px solid ${roundedButton.border};
  border-radius: 40px;

  color: ${roundedButton.font};
  font-size: 16px;
  line-height: 160%;
`;

const nullStyle = css`
  padding: 4px 16px 4px 16px;
`;

const leftStyle = css`
  padding: 4px 16px 4px 12px;
`;

const rightStyle = css`
  padding: 4px 12px 4px 16px;
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
  ${({ icon }) => icon === null && nullStyle}
  ${({ icon }) => icon === "left" && leftStyle}
  ${({ icon }) => icon === "right" && rightStyle}
  ${({ status }) => status != "disabled" && hoverStyle}
  ${({ status }) => status == "disabled" && disabledStyle}
`;

RoundedButtonStyle.defaultProps = {
  status: "default",
  icon: null,
};
