import { Button } from "components/Button/Button";
import { PlanetPicture } from "components/PlanetPicture/PlanetPicture";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import Unity from "react-unity-webgl";
import styled, { css } from "styled-components";
import { GRAY_90, WHITE } from "styles/colors";
import { FONT_WEIGHT } from "styles/constants/constants";
import { FlexGap } from "styles/FlexGap/FlexGap";
import { AlgoEditor } from "./components/AlgoEditor/AlgoEditor";
import { Tab } from "./components/Tab/Tab";
import { Message } from "./components/Message/Message";
import { CodeState } from "./hooks/useCodeHooks";
import { ComponentProps } from "react";

type ShowUnityProps = {
  showUnity?: boolean;
};

type ShowLogProps = {
  showLog?: boolean;
};

type ShowInfoProps = {
  showInfo?: boolean;
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

export const WhiteBackground = styled.div<ShowUnityProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${WHITE};
  opacity: 0;

  transition: opacity 0.5s ease;

  ${({ showUnity }) =>
    showUnity &&
    css`
      opacity: 0.5;
    `}
`;

export const BackLink = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${FlexGap({ gap: "16px", direction: "row" })}

  position: absolute;
  top: 32px;
  left: 32px;

  color: ${GRAY_90};
  font-weight: ${FONT_WEIGHT.BOLD};
  font-size: 20px;
  line-height: 160%;
  text-decoration: none;
  font-feature-settings: "palt" on;

  & > span {
    transform: matrix(1, 0, -0.08, 1, 0, 0);
  }
`;

export const TabStyle = styled(Tab)<ShowLogProps>`
  position: absolute;
  top: 26px;
  right: 0;

  transition: all 0.5s ease;

  ${({ showLog }) =>
    showLog &&
    css`
      right: -44px;
    `}
`;

export const ContainerWrap = styled.div<ShowLogProps>`
  display: flex;
  flex-direction: row;
  align-items: stretch;

  height: 100%;
  width: calc(100% + 527px);

  transition: width 0.5s ease;

  ${({ showLog }) =>
    showLog &&
    css`
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
  ${FlexGap({ gap: "8px", direction: "column" })}

  height: 100%;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  transition: opacity 0.5s ease;

  ${({ showUnity }) =>
    !showUnity &&
    css`
      opacity: 0;
    `}
`;

export const UnityStyle = styled(Unity)`
  width: calc(90vh * 4 / 3);
  height: 90vh;
  border-radius: 12px;
  flex-grow: 0;
  flex-shrink: 0;
`;

export const WatchingLogo = styled(ReactSVG)`
  width: 50px;
  height: 32px;
  fill: ${WHITE};
`;

export const AlgoEditorStyle = styled(AlgoEditor)<
  ShowUnityProps & ShowInfoProps
>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  transition: all 0.5s ease;

  ${({ showUnity }) =>
    showUnity &&
    css`
      opacity: 0;
      transform: translate(-50%, calc(-50% + 85.5px));
    `}

  ${({ showInfo }) =>
    showInfo &&
    css`
      transform: translate(-50%, calc(-50% + 85.5px));
    `}
`;

export const MessageStyle = styled(Message)<ShowInfoProps>`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -100%);
  transition: all 0.5s ease;

  ${({ showInfo }) =>
    showInfo &&
    css`
      top: 50%;
      transform: translate(-50%, calc(-50% - 110px));
    `}
`;

export const ButtonStyle = styled(Button)`
  position: absolute;
  bottom: 32px;
  right: 69px;
`;

export const messageProps = (state: CodeState["messageType"]): ComponentProps<typeof Message> => {
  if(state === "loading") return {
    title: "ヨミコミチュウ！",
    value: "しばらくお待ちください",
    color: "blue",
  };
  else return {
    title: "エラー",
    value: "スタッフに聞いてみよう",
    color: "red",
  };
};

export const buttonProps = (state: CodeState["buttonType"]): ComponentProps<typeof Button> => {
  const size = "M";
  if(state === "unityLoading") return {
    value: "ロード中...",
    color: "pink",
    size,
    status: "disabled",
  }
  else if(state === "closeInfo" || state === "toEditor") return {
    value: "コード画面に戻る",
    color: "black",
    size,
  }
  else if(state === "toGame") return {
    value: "ゲーム画面で確認",
    color: "pink",
    size,
  }
  else return {};
};
