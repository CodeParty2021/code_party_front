import React , { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { oneStageUpdateAsync } from "../../services/StageAPI/StageAPI";
import StageDetail from "../../pages/Stage/components/StageDetail";

type Props = {};

export const StepList: React.FC<Props> = () => {
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
    info = <>ステージ情報が見つかりませんでした</>;
  }

  return (
    <div>
      <h1>{info}</h1>
      <h2>Steplist!</h2>
      <div>
        step1

      </div>
      <Link to={"/stage/"+ id}>ステージ一覧に戻る</Link>
    </div>
  );
};