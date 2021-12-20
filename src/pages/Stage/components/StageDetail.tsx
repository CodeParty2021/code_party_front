import React from "react";
import { Stage } from "../../../services/StageAPI/StageAPI";

type Prop = {
    stage: Stage | undefined
}

export const StageDetail: React.FC<Prop> = (props: Prop) => {
  if(props.stage === undefined)
    return(
      <>
        情報が見つかりませんでした．
      </>
    )
  return (
    <>
      ID:{props.stage.id},
      NAME:{props.stage.name},
      index: {props.stage.stage_index},
      rule:{props.stage.rule}
    </>
  );
};

export default StageDetail;