import React from "react";
import { Background } from "../components/Background";
import {
  DescriptionText,
  ModeSelectCard,
} from "../../../components/ModeSelectCard/ModeSelectCard";
import { useSelectModeState } from "./hooks/useSelectModeState";
import { InnerBox, MarginBox } from "./SelectModeStyle";
import { Loading } from "pages/Loading/Loading";
type Props = {};

export const EventSelectMode: React.FC<Props> = () => {
  const { loading, beginTrainHandler, beginBattleHandler } =
    useSelectModeState();
  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <>
      <InnerBox>
        <MarginBox>
          <ModeSelectCard
            imageName="grab_flag_lobo"
            title="訓練モード"
            description={
              <DescriptionText>
                <>
                  まずはこのモードでロボットを
                  <br />
                  動かす練習をしましょう。
                </>
              </DescriptionText>
            }
            icon="setting"
            onClick={beginTrainHandler}
          ></ModeSelectCard>
        </MarginBox>
        <MarginBox>
          <ModeSelectCard
            imageName="walking_lobo"
            title="対戦モード"
            description={
              <DescriptionText>
                <>
                  AIが搭載されたコンピュータと
                  <br />
                  対戦することが出来ます。
                </>
              </DescriptionText>
            }
            icon="sword"
            onClick={beginBattleHandler}
          ></ModeSelectCard>
        </MarginBox>
      </InnerBox>{" "}
      <Background />
    </>
  );
};
