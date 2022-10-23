import React from "react";
import {
  DescriptionText,
  ModeSelectCard,
} from "components/ModeSelectCard/ModeSelectCard";
import { useSelectModeState } from "./hooks/useSelectModeState";
import { InnerBox, MarginBox } from "./SelectModeStyle";

import { StarBackground } from "components/StarBackground/StarBackground";
type Props = {};

export const SelectMode: React.FC<Props> = () => {
  const { beginDevelopHandler, beginRoomMatchHandler } = useSelectModeState();

  return (
    <StarBackground>
      <InnerBox>
        <MarginBox>
          <ModeSelectCard
            imageName="walking_lobo"
            title="ロボット開発モード"
            description={
              <DescriptionText>
                <>
                  開発者として新しくロボットを動かすプログラムを
                  <br />
                  作成する事ができます。
                </>
              </DescriptionText>
            }
            icon="setting"
            onClick={beginDevelopHandler}
            disabled={true}
          ></ModeSelectCard>
        </MarginBox>
        <MarginBox>
          <ModeSelectCard
            imageName="grab_flag_lobo"
            title="フレンド対戦モード"
            description={
              <DescriptionText>
                過去に作成したプログラムで
                <br />
                オンライン対戦することが出来ます。
              </DescriptionText>
            }
            icon="sword"
            onClick={beginRoomMatchHandler}
          ></ModeSelectCard>
        </MarginBox>
      </InnerBox>{" "}
    </StarBackground>
  );
};
