import React from "react";
import { AlgoStyle, AlgoStyleProps } from "./AlgoStyle";

type Props = AlgoStyleProps & {};

export const Algo: React.FC<Props> = ({ ...styleProps }) => {
  return <AlgoStyle src="/img/algo.svg" {...styleProps} />;
};
