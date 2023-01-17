import React from "react";
import { useGameWatchState } from "./hooks/useGameWatchState";
import { useRunSimulation } from "./hooks/useRunSimulation";
import { Background } from "pages/Code/Coding/CodingStyle";
import { BackLink } from "components/BackLink/BackLink";
import {
  GameWatchStyle,
  messageProps,
  UnityStyle,
  WatchingLogo,
} from "./GameWatchStyle";
import { Message } from "components/Message/Message";
import { AlgoHead } from "components/Character/Algo/Head/AlgoHead";

type Props = {};

export const RoomMatchGameWatch: React.FC<Props> = () => {
  useRunSimulation();
  const { unityContext, exitBtnHandler, state, messageType } =
    useGameWatchState();

  return (
    <GameWatchStyle state={state}>
      <Background color="blue" />
      <div className="gamewatch_unity">
        <UnityStyle unityContext={unityContext} />
        <WatchingLogo src="/img/watching_logo.svg" wrapper="svg" />
      </div>
      <BackLink
        iconColor="blue"
        backMessage="待機部屋に戻る"
        onClick={exitBtnHandler}
      />
      <div className="gamewatch_message">
        <Message {...messageProps(messageType)} />
        <AlgoHead width="142px" height="117px" color="blue" />
      </div>
    </GameWatchStyle>
  );
};
