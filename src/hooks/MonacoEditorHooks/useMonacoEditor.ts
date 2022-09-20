import { OnMount } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { useCallback, useEffect, useState } from "react";

export type IResponse = {
  /**
   * 状態
   */
  monacoEditorState: MonacoEditorState;
  /**
   * MonacoEditorコンポーネントに渡す要素
   */
  handleEditorDidMount: OnMount;
  /**
   * コードの内容を取得する関数
   */
  getInputCode: () => string;
};

export type MonacoEditorState = {
  /**
   * エディターの内容
   */
  content: string;
};

const initialState = {
  content: "",
};

/**
 * MonacoEditorを扱うフック
 */
export const useMonacoEditor = (): IResponse => {
  const [codeEditor, setCodeEditor] = useState<editor.IStandaloneCodeEditor>();
  const [monacoEditorState, setMonacoEditorState] = useState<MonacoEditorState>(
    { ...initialState }
  );

  const _setContent = useCallback((content: string) => {
    setMonacoEditorState((current) => ({
      ...current,
      content,
    }));
  }, []);

  useEffect(() => {
    if (!codeEditor) return;

    // 内容変更時のコールバックを設定
    codeEditor.onDidChangeModelContent(() => {
      _setContent(codeEditor.getValue());
    });
  }, [codeEditor]);

  const handleEditorDidMount = useCallback<IResponse["handleEditorDidMount"]>(
    (editor) => {
      setCodeEditor(editor);
    },
    []
  );

  const getInputCode = useCallback<IResponse["getInputCode"]>(() => {
    if (codeEditor == null) throw "editorRefが初期化されてません";
    return codeEditor.getValue();
  }, [codeEditor]);

  return {
    monacoEditorState,
    handleEditorDidMount,
    getInputCode,
  };
};
