import React from "react";
import { Background } from "../components/Background";
import { ModeSelectCard } from "./components/ModeSelectCard/ModeSelectCard";
import { useSelectModeState } from "./hooks/useSelectModeState";
import { InnerBox, MarginBox } from "./SelectModeStyle";

type Props = {};

export const EventSelectMode: React.FC<Props> = () => {
  const { loading, beginTrainHandler, beginBattleHandler } =
    useSelectModeState();
  if (loading) {
    return <div>ロード中</div>;
  }
  return (
    <>
      <InnerBox>
        <MarginBox>
          <ModeSelectCard
            mode={"solo"}
            onClick={beginTrainHandler}
          ></ModeSelectCard>
        </MarginBox>
        <MarginBox>
          <ModeSelectCard
            mode={"battle"}
            onClick={beginBattleHandler}
          ></ModeSelectCard>
        </MarginBox>
      </InnerBox>{" "}
      <Background />
    </>
  );
};
