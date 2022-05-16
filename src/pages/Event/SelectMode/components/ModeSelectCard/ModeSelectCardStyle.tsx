import { ReactSVG } from "react-svg";
import styled, { css } from "styled-components";
import { modeSelectCard } from "styles/colors";
import { FONT_WEIGHT } from "styles/constants/constants";
import { FlexGap } from "styles/FlexGap/FlexGap";

export type ModeSelectCardStyleProps = {};

type localStyleProps = {
  disabled?: boolean;
};

const defaultStyle = css`
  display: flex;
  flex-direction: column;
  overflow: hidden;

  width: 616px;
  height: 744px;
  position: relative;

  background: ${modeSelectCard.bg};
  border-radius: 64px;

  font-weight: ${FONT_WEIGHT.BOLD};
  color: ${modeSelectCard.font};
  fill: ${modeSelectCard.font};

  .modeselectcard_container_image {
    height: 412px;
    align-self: stretch;
    position: relative;

    & > img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  .modeselectcard_container_main {
    display: flex;
    flex-direction: column;
    align-items: center;
    ${FlexGap({ gap: "32px", direction: "column" })}
    padding: 0 16px;
    align-self: stretch;
  }

  .modeselectcard_modename {
    font-size: 30px;
    transform: matrix(1, 0, -0.08, 1, 0, 0);
  }

  .modeselectcard_description {
    font-size: 24px;
    transform: matrix(1, 0, -0.08, 1, 0, 0);
    text-align: start;
  }

  .modeselectcard_border {
    position: absolute;
    width: 100%;
    height: 100%;

    border-radius: 64px;
    box-sizing: border-box;
    border: 2px solid ${modeSelectCard.border};
  }
`;

const hoverStyle = css`
  :hover {
    background: ${modeSelectCard.hover.bg};
    color: ${modeSelectCard.hover.font};
    fill: ${modeSelectCard.hover.font};

    .modeselectcard_border {
      border: 8px solid ${modeSelectCard.hover.border};
    }
  }
`;

const disabledStyle = css`
  .modeselectcard_container_info {
    display: flex;
    ${FlexGap({ gap: "10px", direction: "row" })}
    padding: 16px 24px;

    background: ${modeSelectCard.hoverInfo.bg};
    color: ${modeSelectCard.hoverInfo.font};
    border-radius: 0px 0px 16px 16px;

    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -100%);
    transition: transform 0.5s ease;
  }
`;

const disabledHoverStyle = css`
  :hover .modeselectcard_container_info {
    transform: translate(-50%, 0);
  }

  .modeselectcard_container_image > img,
  .modeselectcard_container_main > * {
    opacity: 0.3;
  }
`;

export const ModeSelectCardStyle = styled.button<
  localStyleProps & ModeSelectCardStyleProps
>`
  ${defaultStyle}

  ${({ disabled }) => !disabled && hoverStyle}
  ${({ disabled }) => disabled && disabledStyle}
  ${({ disabled }) => disabled && disabledHoverStyle}
`;

ModeSelectCardStyle.defaultProps = {};

const convexHoverStyle = css`
  ${ModeSelectCardStyle}:hover & {
    fill: ${modeSelectCard.hover.bg};
  }
`;

export const ModeSelectCardConvexStyle = styled(ReactSVG)<
  localStyleProps & ModeSelectCardStyleProps
>`
  width: 184px;
  height: 53px;

  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  fill: ${modeSelectCard.bg};

  ${({ disabled }) => !disabled && convexHoverStyle}
`;
