import { Checked } from "components/icons";
import React from "react";
import { CheckedIconProps, StatusStyle, StatusStyleProps } from "./StatusStyle";

type Props = StatusStyleProps & {
  statusMessage: string;
  viewCheckMark: boolean;
};

export const Status: React.FC<Props> = ({
  statusMessage,
  viewCheckMark,
  ...styleProps
}) => {
  return (
    <StatusStyle viewCheckMark={viewCheckMark} {...styleProps}>
      {viewCheckMark && <Checked {...CheckedIconProps(styleProps)} />}
      <span className="playerplate-status-message">{statusMessage}</span>
    </StatusStyle>
  );
};
