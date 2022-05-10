import React from "react";
import { useSelectAIState } from "./hooks/useSelectAIState";

type Props = {};

export const EventSelectAI: React.FC<Props> = () => {
  const { loading, beginTrainHandler } = useSelectAIState();
  if (loading) {
    return <div>ロード中</div>;
  }
  return (
    <div>
      <button onClick={() => beginTrainHandler("3")}>
        <h3>ロボ1</h3>
      </button>
      <button onClick={() => beginTrainHandler("4")}>
        <h3>ロボ2</h3>
      </button>
      <button onClick={() => beginTrainHandler("5")}>
        <h3>ロボ3</h3>
      </button>
      <button onClick={() => beginTrainHandler("6")}>
        <h3>ロボ4</h3>
      </button>
    </div>
  );
};
