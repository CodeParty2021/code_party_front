import Editor from "@monaco-editor/react";
import { Properties } from "csstype";
import { ComponentProps } from "react";
import { ReactSVG } from "react-svg";
import styled, { css } from "styled-components";
import { algoEditor } from "styles/colors";
import { FONT } from "styles/constants/constants";

export type AlgoEditorStyleProps = {
  width?: Properties["width"];
  height?: Properties["height"];
  close?: boolean;
};

const defaultStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  transition: width .5s ease, height .5s ease;

  .algoeditor_container_body {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px;

    overflow: hidden;

    background: ${algoEditor.codingBG};
    box-sizing: border-box;
    border: 16px solid ${algoEditor.algoFrame};
    border-radius: 48px;

    transition: border-radius .5s ease;

    align-self: stretch;
    flex-grow: 1;
    flex-shrink: 1;
  }

  .algoeditor_container_header {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    padding: 18px 16px 16px;

    background: ${algoEditor.algoBody};

    align-self: stretch;
    flex-grow: 0;
    flex-shrink: 0;
  }

  .algoeditor_container_editor {
    align-self: stretch;
    flex-grow: 1;
    flex-shrink: 1;
  }

  .algoeditor_container_footer {
    height: 32px;

    background: ${algoEditor.algoBody};

    align-self: stretch;
    flex-grow: 0;
  }
`;

const withSizeStyle = css<AlgoEditorStyleProps>`
  width: ${({width}) => width};
  height: ${({height}) => height};

  .algoeditor_container_editor {
    height: calc(${({height}) => height} - 172px - 32px - 20px - 30px - 34px);
  }
`;

const closeStyle = css`
  width: 149px;
  height: 117px;

  .algoeditor_container_body {
    border-radius: 32px;
  }
`

export const AlgoEditorStyle = styled.div<AlgoEditorStyleProps>`
  ${defaultStyle}

  ${({width, height}) => width && height && withSizeStyle}
  ${({close}) => close && closeStyle}
`;

AlgoEditorStyle.defaultProps = {
  width: "1200px",
  height: "800px",
  close: false,
};

export const AlgoHeadPartsStyle = styled(ReactSVG)`
  width: 46px;
  height: 20px;

  flex-shrink: 0;
  flex-grow: 0;

  .algoheadparts_color_main {
    fill: ${algoEditor.algoColor};
  }
`;

export const AlgoEyeStyle = styled(ReactSVG)`
  width: 59px;
  height: 30px;

  .algoeye_color_main {
    fill: ${algoEditor.algoColor};
  }
`;

export const EditorStyleProps: () => ComponentProps<typeof Editor> = () => {
  return {
    theme: "vs-dark",
    options: {
      fontFamily: FONT.CONSOLAS,
      fontSize: 20,
      lineHeight: 30,
    },
    height: "100%",
  }
};