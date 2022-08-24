import styled from "styled-components";
import Editor, { EditorProps } from "@monaco-editor/react";
import { ComponentProps } from "react";
import { FONT } from "styles/constants/constants";

export type CodeBlockStyleProps = {};

export const CodeBlockStyle = styled.div<CodeBlockStyleProps>`
  .CodeBlock > .monaco-editor {
    display: flex;
    padding: 0 32px 0 16px;

    width: 100%;

    border-radius: 8px;
  }
`;

interface EditorStyleProps {
  fontSize: number;
  editorHeight: number;
  contentHeight: number;
}

type EditorPropsExtend = EditorProps & EditorStyleProps;

export const editorStyleProps: (
  editorProps: EditorPropsExtend
) => ComponentProps<typeof Editor> = (props) => {
  return {
    theme: "vs-dark",
    height: props.editorHeight,
    width: "100%",
    options: {
      fixedOverflowWidgets: false,
      contextmenu: false,
      domReadOnly: true,
      folding: false,
      fontFamily: FONT.CONSOLAS,
      fontSize: props.fontSize,
      lineHeight: props.fontSize * 1.5,
      lineNumbersMinChars: 0,
      minimap: {
        enabled: false,
      },
      overviewRulerLanes: 0,
      padding: {
        top: 16,
        bottom: 16,
      },
      readOnly: true,
      renderLineHighlight: "none",
      scrollBeyondLastLine: false,
      scrollbar: {
        vertical: props.editorHeight < props.contentHeight ? "auto" : "hidden",
        horizontal: "hidden",
        handleMouseWheel: props.editorHeight < props.contentHeight,
      },
    },
  };
};
