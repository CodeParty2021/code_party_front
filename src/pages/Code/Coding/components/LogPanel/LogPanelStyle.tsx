import { IconButton } from "components/IconButton/IconButton";
import { PlanetPicture } from "components/PlanetPicture/PlanetPicture";
import styled, { css } from "styled-components";
import { BLUE_50, GRAY_10, GRAY_30 } from "styles/colors";
import { FONT } from "styles/constants/constants";
import { FlexGap } from "styles/FlexGap/FlexGap";

export type LogPanelStyleProps = {};

const defaultStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 56px;
  position: relative;

  width: 527px;
  height: 100vh;

  overflow: hidden;
  border-radius: 48px 0px 0px 48px;

  // マス目
  background-image: linear-gradient(
      0deg,
      transparent calc(100% - 1px),
      ${GRAY_30} calc(100% - 1px)
    ),
    linear-gradient(
      90deg,
      transparent calc(100% - 1px),
      ${GRAY_30} calc(100% - 1px)
    );
  background-size: 64px 64px;
  background-repeat: repeat;
  background-position: 0 0;
  background-color: ${GRAY_10};

  .logpanel_smoke {
    position: absolute;
    left: 38px;
    right: 30px;
    top: 41px;
    bottom: 41px;

    background: ${GRAY_10};
    filter: blur(74px);
    border-radius: 63px;

    z-index: 10;
  }

  .logpanel_container_title {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px 0px;
    ${FlexGap({ gap: "33px", direction: "row" })}

    z-index: 20;
  }

  .logpanel_container_close {
    width: 68px;
    height: 87px;
    position: relative;
  }

  .logpanel_title {
    font-family: ${FONT.F_851Gkktt};
    font-size: 29px;
    color: ${BLUE_50};
  }

  .logpanel_container_main {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 8px 0 0 32px;
    margin-right: 32px;
    ${FlexGap({ gap: "8px", direction: "column" })}

    flex-grow: 1;
    flex-shrink: 1;
    align-self: stretch;

    z-index: 20;

    overflow-y: auto;
    overflow-x: hidden;

    ::-webkit-scrollbar {
      width: 8px;
    }

    ::-webkit-scrollbar-track {
      background: none;
    }

    ::-webkit-scrollbar-thumb {
      background: ${GRAY_30};
      border-radius: 4px;
    }
  }
`;

export const LogPanelStyle = styled.div<LogPanelStyleProps>`
  ${defaultStyle}
`;

LogPanelStyle.defaultProps = {};

export const IconButtonStyle = styled(IconButton)`
  position: absolute;
  left: 20px;
  top: 19px;
`;

export const PlanetPictureStyle = styled(PlanetPicture)`
  position: absolute;
  left: -43px;
`;
