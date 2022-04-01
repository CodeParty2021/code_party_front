import { Description } from "./components/Description/Description";

import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useCode } from "./hooks/CodeHooks";

import Editor from "@monaco-editor/react";
import Unity, { UnityContext } from "react-unity-webgl";
import styled from "styled-components";

type Props = {};
//TODO:ここstepかstageごとに変更する必要あり
const unityContext = new UnityContext({
  loaderUrl: "unity/sp/web.loader.js",
  dataUrl: "unity/sp/web.data.unityweb",
  frameworkUrl: "unity/sp/web.framework.js.unityweb",
  codeUrl: "unity/sp/web.wasm.unityweb",
});
const FlexBox = styled.div`
  width: 100%;
  display: flex;
`;
const LeftBox = styled.div`
  scroll: auto;
  width: 50%;
`;
const RightBox = styled.div`
  width: 50%;
`;

export const CodeCoding: React.FC<Props> = () => {
  const { id } = useParams();
  console.log(id);
  const { res, put, json } = useCode(id);

  const editorRef = useRef(
    null
  ) as React.MutableRefObject<null | HTMLInputElement>;

  // eslint-disable-next-line no-unused-vars
  function handleEditorDidMount(editor: any, _monaco: any) {
    editorRef.current = editor;
  }
  function getCode(): string {
    if (editorRef.current == null) throw "editorRefが初期化されてません";
    // @ts-ignore
    return editorRef.current?.getValue();
  }
  const loadJson = (json: string) => {
    unityContext.send("JSONLoader", "LoadJSON", json);
  };

  useEffect(() => {
    loadJson(json);
  }, [json]);
  return (
    <div>
      <div>コーディング画面</div>

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
      <div style={{ visibility: json === "" ? "hidden" : "visible" }}>
        <Unity
          unityContext={unityContext}
          style={{ width: "800px", height: "600px" }}
        />
      </div>
    </div>
  );
};
