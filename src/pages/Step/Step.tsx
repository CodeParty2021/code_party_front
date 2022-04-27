import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { oneStepUpdateAsync } from "../../services/StepAPI/StepAPI";
import StepDetail from "./components/StepDetail";

type Props = {};

export const Step: React.FC<Props> = () => {
  const steps = useSelector((state: RootState) => state.steps);
  const dispatch = useDispatch();
  const { id } = useParams();

  var info: React.ReactElement;

  if (id !== undefined) {
    var parsed = parseInt(id);
    //ステージ情報を取得
    info = <StepDetail step={steps.stepList[parsed]}></StepDetail>;

    // ステージ情報を更新
    useEffect(() => {
      dispatch(oneStepUpdateAsync(parsed));
    }, [dispatch]);
  } else {
    //除外
    info = <>ステージ情報が見つかりませんでした．</>;
  }

  return (
    <div>
      <h1>1Stage詳細</h1>
      <ul>
        <li>{info}</li>
      </ul>
      <Link to="/stage/">ステージ一覧に戻る</Link>
    </div>
  );

};