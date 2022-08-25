import React, { useState } from "react";
import { CodeBlockStyle, editorStyleProps } from "./CodeBlockStyle";
import Editor, { OnMount, EditorProps } from "@monaco-editor/react";

type Props = {
  code: string;
  fontSize?: number;
  height?: number; // 省略時はコンテンツの高さに自動調整
  editorProps?: EditorProps;
};

export const CodeBlock: React.FC<Props> = ({
  code = "",
  fontSize = 18,
  height = 0,
  editorProps,
  ...styleProps
}) => {
  const [editorHeight, setEditorHeight] = useState<number>(0);

  const handleEditorDidMount: OnMount = (editor) => {
    const maxHeight =
      document.parentElement?.clientHeight || window.innerHeight;
    const contentHeight = Math.min(maxHeight, editor.getContentHeight());
    setEditorHeight(height || contentHeight);
    editor.layout({ width: editor.getContentWidth(), height: editorHeight });

    // "Cannot edit in read-only editor"のツールチップを非表示にする
    const messageContribution = editor.getContribution(
      "editor.contrib.messageController"
    );
    editor.onDidAttemptReadOnlyEdit(() => {
      messageContribution?.dispose();
    });
  };

  return (
    <CodeBlockStyle {...styleProps}>
      <Editor
        className="CodeBlock"
        {...editorStyleProps({ fontSize, editorHeight })}
        defaultLanguage="python"
        loading=""
        value={code}
        onMount={handleEditorDidMount}
        {...editorProps}
      />
    </CodeBlockStyle>
  );
};
