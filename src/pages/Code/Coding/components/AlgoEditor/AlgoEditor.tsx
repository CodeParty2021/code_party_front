import Editor from "@monaco-editor/react";
import React, { ComponentProps } from "react";
import {
  AlgoEditorStyle,
  AlgoEditorStyleProps,
  AlgoEyeStyle,
  AlgoHeadPartsStyle,
  EditorStyleProps,
} from "./AlgoEditorStyle";

type Props = AlgoEditorStyleProps & {
  defaultLanguage?: ComponentProps<typeof Editor>["defaultLanguage"];
  defaultValue?: ComponentProps<typeof Editor>["defaultValue"];
  onMount?: ComponentProps<typeof Editor>["onMount"];
};

export const AlgoEditor: React.FC<Props> = ({
  defaultLanguage,
  defaultValue,
  onMount,
  ...styleProps
}) => {
  return (
    <AlgoEditorStyle {...styleProps}>
      <AlgoHeadPartsStyle src="/img/algo_head_parts.svg" wrapper="svg" />
      <div className="algoeditor_container_body">
        <div className="algoeditor_container_header">
          <AlgoEyeStyle src="/img/algo_eye.svg" wrapper="svg" />
        </div>
        <div className="algoeditor_container_editor">
          <Editor
            defaultLanguage={defaultLanguage}
            value={defaultValue}
            onMount={onMount}
            {...EditorStyleProps()}
          />
        </div>
        <div className="algoeditor_container_footer" />
      </div>
    </AlgoEditorStyle>
  );
};
