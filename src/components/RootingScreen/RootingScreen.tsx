import { SignOutButton } from "components/SignOutButton/SignOutButton";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "store";

type Props = {};

export const RootingScreen: React.FC<Props> = () => {
  const { user, isLogin } = useSelector((state: RootState) => state.user);
  return (
    <div>
      <p> ==============</p>
      <h3>以下開発用画面</h3>

      <a href="https://strap.app/app/board/jkJsgBr4NKM8IvxIYo8s">
        画面名称はこちら
      </a>
      <ul>
        <li>
          <Link to="/">トップページ</Link>
        </li>
        <li>
          <Link to="/stages">ステージ選択画面</Link>
        </li>
        <li>
          <Link to="/start">ログイン画面</Link>
        </li>
        <li>
          <Link to="/mode-select">選択画面Top</Link>
        </li>
        <li>
          <Link to="/free-coding">フリーコーディング</Link>
        </li>
        <li>
          <Link to="/codes">コード一覧</Link>
        </li>
        <li>
          <Link to="/Lp">LP画面</Link>
        </li>
      </ul>

      <h1>ロボット開発モード系のページ</h1>
      <ul>
        <li>
          <Link to="/robot-development/top">ロボット開発モードの選択画面</Link>
        </li>

        <li>
          <Link to="/robot-development/specification">
            ロボットの設計仕様書
          </Link>
        </li>
        <li>
          <Link to="/garage">ロボットのステータスを見る</Link>
        </li>
      </ul>
      <h1>ルーム対戦モード系のページ</h1>
      <ul>
        <li>
          <Link to="/casual-battle">カジュアルロビー画面</Link>
        </li>
        <li>
          <Link to="/casual-battle/invitation/:roomId">
            カジュアル対戦招待画面
          </Link>
        </li>
        <li>
          <Link to="/casual-battle/waiting-room">待機招待画面</Link>
        </li>
        <li>
          <Link to="/casual-battle/search-room">ルーム参加画面</Link>
        </li>
        <li>
          <Link to="/casual-battle/result">観戦画面</Link>
        </li>
        <li>
          <Link to="/casual-battle/pick-code">対戦させるロボットを選ぶ</Link>
        </li>
      </ul>
      <h1>チュートリアル系のページ</h1>
      <ul>
        <li>
          <Link to="/tutorial/world/:id/missions">ミッション一覧</Link>
        </li>
        <li>
          <Link to="/tutorial/world/:world_id/mission/:mission_id/step/:step_id">
            ミッションの詳細(step)用のページ
          </Link>
        </li>
        <li>
          <Link to="/tutorial/world/:world_id/mission/:mission_id/end">
            ミッション終了後のページ
          </Link>
        </li>
        <li>
          <Link to="/tutorial/world/:world_id/intro">
            ワールド・ゲームの説明画面
          </Link>
        </li>
      </ul>
      <h1>イベント系のページ</h1>
      <ul>
        <li>
          <Link to="/event">トップページ</Link>
        </li>
        <li>
          <Link to="/event/select-mode">モード選択</Link>
        </li>
        <li>
          <Link to="/event/set-name">名前設定</Link>
        </li>
        <li>
          <Link to="/event/select-ai">対戦相手の選択</Link>
        </li>
      </ul>
      <h1>ログインユーザ</h1>
      <p>{user?.displayName}さん</p>
      {isLogin && <SignOutButton />}
    </div>
  );
};
