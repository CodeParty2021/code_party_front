import React from "react";
import { TableStyle, TableStyleProps, Tb } from "./TableStyle";

type Props = TableStyleProps & {};

export const Table: React.FC<Props> = ({ children, ...styleProps }) => {
  return (
    <div>
      <TableStyle {...styleProps}>
        <Tb>{children}</Tb>
      </TableStyle>
    </div>
  );
};
