import React from "react";
import {
  ClearConditionStyleProps,
  ClearConditionStyle,
  TitleBar,
  RBEdge,
  Condition,
  State,
} from "./ClearConditionStyle";

type Props = ClearConditionStyleProps & {
  conditions: string[];
  states?: boolean[];
};

export const ClearCondition: React.FC<Props> = ({
  conditions,
  states = [],
  ...styleProps
}) => {
  return (
    <ClearConditionStyle {...styleProps}>
      <TitleBar />
      {conditions.map((c, i) => (
        <Condition key={i}>
          {states.length > i && <State state={states[i]} />}
          <div>{c}</div>
        </Condition>
      ))}
      <RBEdge />
    </ClearConditionStyle>
  );
};
