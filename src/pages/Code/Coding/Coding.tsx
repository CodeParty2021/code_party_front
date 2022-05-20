import React from "react";
import { useCodingState } from "./hooks/useCodeHooks";

// import Editor from "@monaco-editor/react";
// import Unity from "react-unity-webgl";
// import styled from "styled-components";
import {
  AlgoEditorStyle,
  Background,
  BackLink,
  ButtonStyle,
  CodingStyle,
  ContainerMain,
  ContainerUnity,
  ContainerWrap,
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

type Props = {};

export const CodeCoding: React.FC<Props> = () => {
  const {
    code,
    loading,
    isCode,
    execCode,
    turnLog,
    handleEditorDidMount,
    closeEditorButtonHandler,
    showUnity,
    unityContext,
    toggleLogHandler,
    showLog,
    showError,
  } = useCodingState();
  return (
    <CodingStyle>
      <Background color="blue" />
      <WhiteBackground showUnity={showUnity} />
      <BackLink to="/event/select-mode">
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
            title="シンタックスエラー！"
            value="スタッフに聞いてみよう"
            color="red"
            showInfo={showError}
          />
          <MessageStyle
            title="ヨミコミチュウ！"
            value="しばらくお待ちください"
            color="red"
            showInfo={!isCode(code)}
          />
          <MessageStyle
            title="ローディングチュウ..."
            value="しばらくお待ちください"
            color="blue"
            showInfo={loading}
          />
          <AlgoEditorStyle
            defaultLanguage="python"
            defaultValue={code && code.codeContent}
            onMount={handleEditorDidMount}
            close={showUnity || loading || showError || !isCode(code)}
            width="70vw"
            height="90vh"
            showUnity={showUnity}
            showInfo={loading || showError || !isCode(code)}
          />
          {showUnity ? (
            <ButtonStyle
              value="コード画面に戻る"
              color="blue"
              size="M"
              onClick={closeEditorButtonHandler}
            />
          ) : loading || showError || !isCode(code) ? (
            <ButtonStyle
              value="コード画面に戻る"
              color="black"
              size="M"
              onClick={closeEditorButtonHandler}
            />
          ) : (
            <ButtonStyle
              value="ゲーム画面で確認"
              color="pink"
              size="M"
              onClick={execCode}
            />
          )}
        </ContainerMain>
        <LogPanel onCloseButtonClick={toggleLogHandler}>
          {turnLog.map((turn, index) => {
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
