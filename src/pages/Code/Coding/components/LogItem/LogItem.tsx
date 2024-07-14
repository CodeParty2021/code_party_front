import React from "react";
import { LogItemStyle, LogItemStyleProps } from "./LogItemStyle";

type Props = LogItemStyleProps & {
  id?: string;
  turnNum: number;
  log: string;
};

export const LogItem: React.FC<Props> = ({
  id,
  turnNum,
  log,
  ...styleProps
}) => {
  return (
    <LogItemStyle id={id} {...styleProps}>
      <span className="logitem_turnnum">{turnNum}</span>
      <div className="logitem_bar" />
      <span className="logitem_log">{log}</span>
    </LogItemStyle>
  );
};
