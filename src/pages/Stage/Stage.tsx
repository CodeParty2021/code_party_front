import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { oneStageUpdateAsync } from "../../services/StageAPI/StageAPI";
import StageDetail from "./components/StageDetail";

type Prop = {};

export const Stage: React.FC<Prop> = () => {
  const stages = useSelector((state: RootState) => state.stages);
  const dispatch = useDispatch();
  const { id } = useParams();

  var info: React.ReactElement;

  if (id !== undefined) {
    var parsed = parseInt(id);
    //ステージ情報を取得
    info = <StageDetail stage={stages.stageList[parsed]}></StageDetail>;

    // ステージ情報を更新
    useEffect(() => {
      dispatch(oneStageUpdateAsync(parsed));
    }, [dispatch]);
  } else {
    //除外
    info = <>ステージ情報が見つかりませんでした．</>;
  }

  return (
    <div>
      <h1>Stage詳細</h1>
      <ul>
        <li>{info}</li>
      </ul>
      <Link to="/stage">ステージ一覧に戻る</Link>
    </div>
  );
};
