import React from "react";
import { LogItemStyle, LogItemStyleProps } from "./LogItemStyle";

type Props = LogItemStyleProps & {
  turnNum: number;
  log: string;
};

export const LogItem: React.FC<Props> = ({ turnNum, log, ...styleProps }) => {
  return (
    <LogItemStyle {...styleProps}>
      <span>{turnNum}</span>
      <div className="logitem_bar" />
      <span className="logitem_log">{log}</span>
    </LogItemStyle>
  );
};
