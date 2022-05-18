import React from "react";
import { AlgoHeadStyle, AlgoHeadStyleProps } from "./AlgoHeadStyle";

type Props = AlgoHeadStyleProps & {};

export const AlgoHead: React.FC<Props> = ({ ...styleProps }) => {
  return <AlgoHeadStyle src="/img/algo_head.svg" {...styleProps} />;
};
