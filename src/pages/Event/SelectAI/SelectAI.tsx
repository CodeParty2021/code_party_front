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
      <button onClick={() => beginTrainHandler("2")}>
        <h3>ロボ１</h3>
      </button>
      <button onClick={() => beginTrainHandler("3")}>
        <h3>ロボ２</h3>
      </button>
    </div>
  );
};
