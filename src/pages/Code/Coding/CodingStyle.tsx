import { Button } from "components/Button/Button";
import { PlanetPicture } from "components/PlanetPicture/PlanetPicture";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import Unity from "react-unity-webgl";
import styled, { css } from "styled-components";
import { BLUE_GRAY_70, WHITE } from "styles/colors";
import { FONT_WEIGHT } from "styles/constants/constants";
import { FlexGap } from "styles/FlexGap/FlexGap";
import { AlgoEditor } from "./components/AlgoEditor/AlgoEditor";
import { Tab } from "./components/Tab/Tab";

type ShowUnityProps = {
  showUnity?: boolean;
};

type ShowLogProps = {
  showLog?: boolean;
};

export const CodingStyle = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export const Background = styled(PlanetPicture)`
  position: absolute;
  width: 2510px;
  height: 2510px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const BackLink = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${FlexGap({gap: "16px", direction: "row"})}

  position: absolute;
  top: 32px;
  left: 32px;

  color: ${BLUE_GRAY_70};
  font-weight: ${FONT_WEIGHT.BOLD};
  font-size: 20px;
  line-height: 160%;
  text-decoration: none;
  font-feature-settings: 'palt' on;

  & > span {
    transform: matrix(1, 0, -0.08, 1, 0, 0);
  }
`;

export const TabStyle = styled(Tab)<ShowLogProps>`
  position: absolute;
  top: 26px;
  right: 0;

  transition: all .5s ease;

  ${({showLog}) => showLog && css`
    right: -44px;
  `}
`;

export const ContainerWrap = styled.div<ShowLogProps>`
  display: flex;
  flex-direction: row;
  align-items: stretch;

  height: 100%;
  width: calc(100% + 527px);

  transition: width .5s ease;

  ${({showLog}) => showLog && css`
    width: 100%;
  `}
`;

export const ContainerMain = styled.div`
  position: relative;
  overflow: visible;

  height: 100%;

  flex-grow: 1;
  flex-shrink: 1;

  pointer-events: none;

  & > * {
    pointer-events: all;
  }
`;

export const ContainerUnity = styled.div<ShowUnityProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 12px 48px 0;
  ${FlexGap({gap: "8px", direction: "column"})}

  height: 100%;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  transition: opacity .5s ease;

  ${({showUnity}) => !showUnity && css`
    opacity: 0;
  `}
`;

export const UnityStyle = styled(Unity)`
  width: 1334px;
  height: 1000px;
  border-radius: 12px;
  flex-grow: 0;
  flex-shrink: 0;
`;

export const WatchingLogo = styled(ReactSVG)`
  width: 50px;
  height: 32px;
  fill: ${WHITE};
`;

export const AlgoEditorStyle = styled(AlgoEditor)<ShowUnityProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  transition: all .5s ease;

  ${({showUnity}) => showUnity && css`
    opacity: 0;
  `}
`;

export const ButtonStyle = styled(Button)`
  position: absolute;
  bottom: 32px;
  right: 69px;
`;