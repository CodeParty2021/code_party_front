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
          <Link to="/mode-select">モード選択画面</Link>
        </li>
        <li>
          <Link to="/casual-battle">カジュアルロビー画面</Link>
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
          <Link to="/free-coding">フリーコーディング</Link>
        </li>
        <li>
          <Link to="/codes">ガレージ画面（コード一覧)</Link>
        </li>
      </ul>
      <h1>ログインユーザ</h1>
      <p>{user?.displayName}さん</p>
      {isLogin && <SignOutButton />}
    </div>
  );
};
