import React from "react";

interface Props {
  onClick: Function;
}

export const Button: React.FC<Props> = ({ onClick, children }) => {
  return <button onClick={() => onClick()}>{children}</button>;
};
