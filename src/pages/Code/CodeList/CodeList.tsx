import { Header } from "components/Header/Header";
import { StarBackground } from "components/StarBackground/StarBackground";
import React from "react";
import {
  Content,
  Discription,
  RobotList,
  CodeListStyle,
  SettingIcon,
  Title,
  TitleLabel,
} from "./CodeListStyle";
import { CodeCard } from "./components/CodeCard";
import { CreateCodeCard } from "./components/CreateCodeCard";
import { useCodeListState } from "./hooks/useCodeListState";

type Props = {};

export const CodeList: React.FC<Props> = () => {
  const {
    codes,
    loading,
    newCodeButtonHandler,
    deleteHandler,
    backHandler,
    editHandler,
  } = useCodeListState();

  if (loading) {
    return <div>ロード中</div>;
  }
  return (
    <>
      <Header
        backMessage="モード選たくにもどる"
        backButtonHandler={backHandler}
      />
      <StarBackground>
        <CodeListStyle>
          <Content>
            <Title>
              <SettingIcon />
              <TitleLabel>ガレージ</TitleLabel>
            </Title>
            <Discription>ロボットは作成した順番にならんでいます</Discription>
            <RobotList>
              {codes.map((code, index) => {
                return (
                  <CodeCard
                    key={code.id}
                    id={code.id}
                    codeContent={code.codeContent}
                    updatedAt={code.updatedAt}
                    editHandler={editHandler}
                    deleteHandler={deleteHandler}
                    number={index + 1}
                  ></CodeCard>
                );
              })}
              <CreateCodeCard newCodeButtonHandler={newCodeButtonHandler} />
            </RobotList>
          </Content>
        </CodeListStyle>
      </StarBackground>
    </>
  );
};
