import React from "react";
import { TabStyle, TabStyleProps } from "./TabStyle";

type Props = TabStyleProps & {
  value: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const Tab: React.FC<Props> = ({ value, onClick, ...styleProps }) => {
  return (
    <TabStyle onClick={onClick} {...styleProps}>
      <span>{value}</span>
    </TabStyle>
  );
};
