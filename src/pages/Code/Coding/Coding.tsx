import React from "react";
import { useCodingState } from "./hooks/useCodeHooks";

// import Editor from "@monaco-editor/react";
// import Unity from "react-unity-webgl";
// import styled from "styled-components";
import { AlgoEditorStyle, Background, BackLink, ButtonStyle, CodingStyle, ContainerMain, ContainerUnity, ContainerWrap, TabStyle, UnityStyle, WatchingLogo } from "./CodingStyle";
import { LogPanel } from "./components/LogPanel/LogPanel";
import { LogItem } from "./components/LogItem/LogItem";
import { IconButton } from "components/IconButton/IconButton";
import { ArrowLeft } from "components/icons";

type Props = {};

export const CodeCoding: React.FC<Props> = () => {
  const {
    code,
    error,
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
  } = useCodingState();
  if (loading) {
    return <div>ロード中です</div>;
  } else if (error) {
    return (
      <div>
        <p>エラーが発生しました。再読込してください</p>
        <p>{error}</p>
      </div>
    );
  } else if (isCode(code)) {
    return (
      <CodingStyle>
        <Background color="blue" />
        <BackLink to="/event/select-mode">
          <IconButton Icon={ArrowLeft} />
          <span>モード選択に戻る</span>
        </BackLink>
        <ContainerWrap showLog={showLog}>
          <ContainerMain>
            <ContainerUnity
              showUnity={showUnity}
            >
              <UnityStyle
                unityContext={unityContext}
              />
              <WatchingLogo src="/img/watching_logo.svg" wrapper="svg" />
            </ContainerUnity>
            <AlgoEditorStyle
              defaultLanguage="python"
              defaultValue={code.codeContent}
              onMount={handleEditorDidMount}
              close={showUnity}
              width="1334px"
              height="984px"
              showUnity={showUnity}
            />
            {showUnity ? <ButtonStyle
              value="コード画面に戻る"
              color="blue"
              size="M"
              onClick={closeEditorButtonHandler}
            /> : <ButtonStyle
              value="ゲーム画面で確認"
              color="pink"
              size="M"
              onClick={execCode}
            />}
          </ContainerMain>
          <LogPanel
            onCloseButtonClick={toggleLogHandler}
          >
            {turnLog.map((turn, index) => {
              const log = turn.players[0].print;
              if (log) {
                return (
                  <LogItem key={index} turnNum={index + 1} log={log} />
                );
              }
            })}
          </LogPanel>
        </ContainerWrap>
        <TabStyle value="LOG" onClick={toggleLogHandler} showLog={showLog} />
      </CodingStyle>
    );
  } else {
    return <div>ノーリソースです</div>;
  }
};
