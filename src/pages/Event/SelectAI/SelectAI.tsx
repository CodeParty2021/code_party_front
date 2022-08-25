import { ArrowLeft } from "components/icons";
import React from "react";
import { Background } from "../components/Background";
import { RobotLink } from "./components/RobotLink";
import { useSelectAIState } from "./hooks/useSelectAIState";
import { Loading } from "pages/Loading/Loading";
import {
  Back,
  BackButton,
  Content,
  Discription,
  Planet,
  RobotList,
  SelectAIStyle,
  Title,
  TitleLabel,
} from "./SelectAIStyle";
type Props = {};

export const EventSelectAI: React.FC<Props> = () => {
  const { loading, beginTrainHandler, backButtonHandler } = useSelectAIState();
  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <>
      <SelectAIStyle>
        <Back>
          <Planet color="blue" />
          <BackButton Icon={ArrowLeft} onClick={backButtonHandler} />
        </Back>
        <Content>
          <Title>
            <TitleLabel>対戦ロボット</TitleLabel>
            <Discription>対戦相手のロボットを選ぼう！</Discription>
          </Title>
          <RobotList>
            <RobotLink
              label="ロボ1"
              number={1}
              onClick={() => beginTrainHandler(3)}
            />
            <RobotLink
              label="ロボ2"
              number={2}
              onClick={() => beginTrainHandler(4)}
            />
            <RobotLink
              label="ロボ3"
              number={3}
              onClick={() => beginTrainHandler(5)}
            />
            <RobotLink
              label="ロボ4"
              number={4}
              onClick={() => beginTrainHandler(6)}
            />
            <RobotLink
              label="最強ロボ"
              number={5}
              onClick={() => beginTrainHandler(7)}
            />
          </RobotList>
        </Content>
      </SelectAIStyle>
      <Background />
    </>
  );
};
