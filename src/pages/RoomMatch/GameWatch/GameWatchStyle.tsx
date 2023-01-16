import { Message } from "components/Message/Message";
import { ComponentProps } from "react";
import { ReactSVG } from "react-svg";
import styled, { css } from "styled-components";
import { WHITE } from "styles/colors";
import { IResponse } from "./hooks/useGameWatchState";
import { BackLinkButton } from "components/BackLink/BackLinkStyle";
import Unity from "react-unity-webgl";
import { FlexGap } from "styles/FlexGap/FlexGap";

type PrivateProps = {
  state: IResponse["state"];
};

const defaultStyle = css`
  position: relative;
  width: 100vw;
  height: 100vh;

  /* BackLinkStyle */
  ${BackLinkButton} {
    position: absolute;
    top: 32px;
    left: 32px;
  }

  .gamewatch_message {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    ${FlexGap({ gap: "8px", direction: "column" })}

    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -100%);
    transition: all 0.5s ease;
  }

  .gamewatch_unity {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px 48px 0;
    ${FlexGap({ gap: "8px", direction: "column" })}
    transition: opacity 0.5s ease;
  }
`;

const analyzingStyle = css`
  .gamewatch_message {
    top: 50%;
    transform: translate(-50%, calc(-50% - 110px));
  }

  .gamewatch_unity {
    opacity: 0;
  }
`;

const runningStyle = css``;

const finishStyle = css``;

export const GameWatchStyle = styled.div<PrivateProps>`
  ${defaultStyle}

  ${({ state }) => state === "Analyzing" && analyzingStyle}
  ${({ state }) => state === "Running" && runningStyle}
  ${({ state }) => state === "Finish" && finishStyle}
  ${({ state }) => state === "AnalyzingError" && analyzingStyle}
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

export const messageProps = (
  state: IResponse["state"]
): ComponentProps<typeof Message> => {
  if (state === "Analyzing")
    return {
      title: "シミュレーションチュウ",
      value: "しばらくお待ちください",
      color: "blue",
    };
  else if (state === "AnalyzingError")
    return {
      title: "エラー",
      value: "左上の戻るボタンをおしてください！",
      color: "red",
    };
  else
    return {
      title: "このメッセージは",
      value: "出ないはずだよ",
      color: "blue",
    };
};
