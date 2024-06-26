import React from "react";
import { LogErrorStyle, LogErrorStyleProps } from "./LogErrorStyle";

type Props = LogErrorStyleProps;

export const LogError: React.FC<Props> = ({ children, ...styleProps }) => {
  return (
    <LogErrorStyle {...styleProps}>
      <span className="log_error_label">エラーがおきました！</span>
      <span>{children}</span>
    </LogErrorStyle>
  );
};
