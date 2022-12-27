import React from "react";
import { useCodingState } from "./hooks/useCodeHooks";

import {
  AlgoEditorStyle,
  Background,
  BackLink,
  buttonProps,
  ButtonStyle,
  CodingStyle,
  ContainerMain,
  ContainerUnity,
  ContainerWrap,
  messageProps,
  MessageStyle,
  TabStyle,
  UnityStyle,
  WatchingLogo,
  WhiteBackground,
} from "./CodingStyle";
import { LogPanel } from "./components/LogPanel/LogPanel";
import { LogItem } from "./components/LogItem/LogItem";
import { IconButton } from "components/IconButton/IconButton";
import { ArrowLeft } from "components/icons";
import { Loading } from "pages/Loading/Loading";
type Props = {};

export const CodeCoding: React.FC<Props> = () => {
  const {
    // 状態変数
    state,
    // 状態変数を扱いやすくしたもの
    loading,
    showUnity,
    showLog,
    showMessage,
    // データ
    code,
    turnLog,
    handleEditorDidMount,
    unityContext,
    // コールバック関数
    buttonHandler,
    toggleLogHandler,
    // その他
    backLinkRoute,
  } = useCodingState();
  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <CodingStyle>
      <Background color="blue" />
      <WhiteBackground showUnity={showUnity} />
      <BackLink to={backLinkRoute}>
        <IconButton Icon={ArrowLeft} />
        <span>モード選択に戻る</span>
      </BackLink>
      <ContainerWrap showLog={showLog}>
        <ContainerMain>
          <ContainerUnity showUnity={showUnity}>
            <UnityStyle unityContext={unityContext} />
            <WatchingLogo src="/img/watching_logo.svg" wrapper="svg" />
          </ContainerUnity>
          <MessageStyle
            {...messageProps(state.messageType)}
            showInfo={showMessage}
          />
          <AlgoEditorStyle
            defaultLanguage="python"
            defaultValue={code && code.codeContent}
            onMount={handleEditorDidMount}
            close={showUnity || showMessage}
            width="70vw"
            height="90vh"
            showUnity={showUnity}
            showInfo={showMessage}
          />
          <ButtonStyle
            {...buttonProps(state.buttonType)}
            onClick={buttonHandler}
          />
        </ContainerMain>
        <LogPanel onCloseButtonClick={toggleLogHandler}>
          {turnLog &&
            turnLog.map((turn, index) => {
              const log = turn.players[0].print;
              if (log) {
                return <LogItem key={index} turnNum={index + 1} log={log} />;
              }
            })}
        </LogPanel>
      </ContainerWrap>
      <TabStyle value="LOG" onClick={toggleLogHandler} showLog={showLog} />
    </CodingStyle>
  );
};
