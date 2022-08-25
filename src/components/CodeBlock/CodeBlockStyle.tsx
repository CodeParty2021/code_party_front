import styled from "styled-components";
import Editor, { EditorProps } from "@monaco-editor/react";
import { ComponentProps } from "react";
import { FONT } from "styles/constants/constants";

export type CodeBlockStyleProps = {};

const paddingSize = 16;

export const CodeBlockStyle = styled.div<CodeBlockStyleProps>`
  .monaco-editor {
    padding-left: ${paddingSize}px;
    width: 100%;
    border-radius: 8px;
  }

  .overflow-guard {
    border-radius: 8px;
  }
`;

interface EditorStyleProps {
  fontSize: number;
  editorHeight: number;
}

type EditorPropsExtend = EditorProps & EditorStyleProps;

export const editorStyleProps: (
  editorProps: EditorPropsExtend
) => ComponentProps<typeof Editor> = (props) => {
  return {
    theme: "vs-dark",
    height: props.editorHeight,
    width: `calc(100% - ${paddingSize}px)`,
    options: {
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
        top: paddingSize,
        bottom: paddingSize,
      },
      readOnly: true,
      renderLineHighlight: "none",
      scrollBeyondLastLine: false,
    },
  };
};
