import { Description } from "./components/Description/Description";

import React from "react";
import { useCodingState } from "./hooks/CodeHooks";

import Editor from "@monaco-editor/react";
import Unity from "react-unity-webgl";
import styled from "styled-components";

type Props = {};

const FlexBox = styled.div`
  width: 100%;
  display: flex;
`;
const LeftBox = styled.div`
  overflow: auto;
  width: 50%;
  height: 100vh;
`;
const RightBox = styled.div`
  width: 50%;
  height: 100vh;
  padding: 8px;
  background: #b0c4de;
  border-radius: 8px;
`;
const Modal = styled.div<{ shown: boolean }>`
  position: absolute;
  z-index: 10;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  margin: auto;
  visibility: ${({ shown }) => (shown ? "visible" : "hidden")};
  background: gray;
  border-radius: 8px;
  margin: 20px;
  padding: 8px;
`;
const CloseButton = styled.div`
  position: absolute;
  width: 48px;
  height: 32px;
  top: -24px;
  right: 0px;
  background: gray;
  border-radius: 8px 8px 0 0;
  color: white;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;
const Log = styled.div`
  width: 100%;
  max-height: 100px;
  overflow: auto;
`;
const LogItem = styled.div`
  background: white;
  margin: 2px 0;
  display: flex;
  padding: 8px;
  border-radius: 8px;
`;
const TurnNum = styled.div`
  &:after {
    content: "";
    width: 2px;
    background: gray;
    margin: 0 0 0 8px;
  }
  display: flex;
  min-width: 32px;
  justify-content: flex-end;
`;
const LogContent = styled.div`
  margin: 0 0 0 8px;
`;

export const CodeCoding: React.FC<Props> = () => {
  const {
    res,
    put,
    turnLog,
    handleEditorDidMount,
    getCode,
    setShowUnity,
    showUnity,
    unityContext,
  } = useCodingState();
  return (
    <div>
      <FlexBox>
        <LeftBox>
          <Description />
        </LeftBox>
        <RightBox>
          {res.data && (
            <>
              <Editor
                height="569px"
                defaultLanguage="python"
                defaultValue={res.data.codeContent}
                onMount={handleEditorDidMount}
              />
              <button
                onClick={() =>
                  put(getCode(), res.data?.step || "", res.data?.language || "")
                }
              >
                実行する
              </button>
            </>
          )}
          {res.error && <>エラー</>}
          {res.loading && res.loading}
        </RightBox>
      </FlexBox>
      <Modal shown={showUnity}>
        <CloseButton onClick={() => setShowUnity(false)}>×</CloseButton>
        <Unity
          unityContext={unityContext}
          style={{ width: "800px", height: "600px" }}
        />
        <Log>
          {turnLog.map((turn, index) => {
            const log = turn.players[0].print;
            if (log) {
              return (
                <LogItem key={index}>
                  <TurnNum>
                    <div>{index + 1}</div>
                  </TurnNum>
                  <LogContent>{log}</LogContent>
                </LogItem>
              );
            }
          })}
        </Log>
      </Modal>
    </div>
  );
};
