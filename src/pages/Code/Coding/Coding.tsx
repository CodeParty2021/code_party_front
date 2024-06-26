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
  PanelText,
  TabStyle,
  TabWrap,
  UnityStyle,
  WatchingLogo,
  WhiteBackground,
} from "./CodingStyle";
import { LogPanel } from "./components/LogPanel/LogPanel";
import { LogItem } from "./components/LogItem/LogItem";
import { IconButton } from "components/IconButton/IconButton";
import { ArrowLeft } from "components/icons";
import { Loading } from "pages/Loading/Loading";
import { SettingItems } from "./components/SettingItem/SettingItems";
import { LogError } from "./components/LogError/LogError";
type Props = {};

export const CodeCoding: React.FC<Props> = () => {
  const {
    // 状態変数
    state,
    panelState,
    // 状態変数を扱いやすくしたもの
    loading,
    showUnity,
    showLog,
    showSetting,
    showMessage,
    // データ
    code,
    turnLog,
    handleEditorDidMount,
    unityContext,
    // コールバック関数
    buttonHandler,
    toggleLogHandler,
    toggleSettingHandler,
    closePanelHandler,
    changeStep,
    linkToNotion,
    //エラーレスポンス
    error,
    // その他
    backLinkState,
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
      <BackLink to={backLinkState.route}>
        <IconButton Icon={ArrowLeft} />
        <span>{backLinkState.label}</span>
      </BackLink>
      <ContainerWrap show={showLog || showSetting}>
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
        <LogPanel onCloseButtonClick={closePanelHandler} state={panelState}>
          {panelState == "log" && error && <LogError>{error}</LogError>}
          {turnLog &&
            panelState == "log" &&
            turnLog.map((turn, index) => {
              const log = turn.players[0].print;
              if (log) {
                return <LogItem key={index} turnNum={index + 1} log={log} />;
              }
            })}
          {code && panelState == "setting" && (
            <>
              <PanelText>モードを選択</PanelText>
              <SettingItems
                robotProperty={[
                  {
                    step: 2,
                    name: "一人用モード",
                  },
                  {
                    step: 3,
                    name: "ロボット1",
                  },
                  {
                    step: 4,
                    name: "ロボット2",
                  },
                  {
                    step: 5,
                    name: "ロボット3",
                  },
                  {
                    step: 6,
                    name: "ロボット4",
                  },
                  {
                    step: 7,
                    name: "最強ロボ",
                  },
                ]}
                stepChange={changeStep}
                selected={code.step}
              />
            </>
          )}
        </LogPanel>
      </ContainerWrap>
      <TabWrap show={!(showLog || showSetting)}>
        {" "}
        <TabStyle value="LOG" onClick={toggleLogHandler} />
        <TabStyle value="SETTING" onClick={toggleSettingHandler} />
        <TabStyle value="HELP" onClick={linkToNotion} />
      </TabWrap>
    </CodingStyle>
  );
};
