import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { stageUpdateAsync } from "../../services/StageAPI/StageAPI";
import StageDetail from "./components/StageDetail";

type Prop = {};

export const StageList: React.FC<Prop> = () => {
  var list: React.ReactElement[] = [];

  const stages = useSelector((state: RootState) => state.stages);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(stageUpdateAsync());
  }, [dispatch]);

  Object.entries(stages.stageList).forEach(([key, value]) => {
    list.push(
      <li key={key}>
        <StageDetail stage={value}></StageDetail>
        <Link to={"/stage/" + value.id}>詳細を表示</Link>
      </li>
    );
  });

  return (
    <div>
      <h1>Stages</h1>
      <ul>{list}</ul>
      <Link to="/">トップに戻る</Link>
    </div>
  );
};
