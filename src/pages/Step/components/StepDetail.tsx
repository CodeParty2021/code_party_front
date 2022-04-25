import React from "react";
import { Step } from "../../../services/StepAPI/StepAPI";

type Prop = {
  step: Step | undefined;
};

export const StepDetail: React.FC<Prop> = (props: Prop) => {
  if (props.step === undefined) return <>情報が見つかりませんでした．</>;

  return (
    <>
      ID:{props.step.id}, NAME:{props.step.objective}, index:
      {props.step.description}, rule:{props.step.index}
    </>
  );
};

export default StepDetail;