import React from "react";
import { Link } from "react-router-dom";
import { useSelectModeState } from "./hooks/useSelectModeState";

type Props = {};

export const EventSelectMode: React.FC<Props> = () => {
  const { loading, beginTrainHandler } = useSelectModeState();
  if (loading) {
    return <div>ロード中</div>;
  }
  return (
    <div>
      <button onClick={beginTrainHandler}>
        <h3>1.くんれんモード</h3>
      </button>
      <Link to="/event/select-ai">
        <button>
          <h3>2.たいせんモード</h3>
        </button>
      </Link>
    </div>
  );
};
