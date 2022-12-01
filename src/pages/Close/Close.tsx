import { StarBackground } from "components/StarBackground/StarBackground";
import React from "react";
type Prop = {};

export const Close: React.FC<Prop> = () => {
  return (
    <div id="overlay">
      <div id="content">
        <StarBackground>
          <h1>イベントへのご参加ありがとうございました!!</h1>
          <p>イベント外でALGOSMOを遊ぶことはできません。申し訳ありません...</p>
          <p>
            twitter や facebookでイベントの通知を行っておりますので
            よろしければフォローいただけますと嬉しいです。
          </p>
          <a href={"https://twitter.com/algosmo"}>Twitterへはこちらから</a>
          <a href={"https://www.facebook.com/profile.php?id=100081888022946"}>
            FaceBookへはこちらから
          </a>
          <p>次回イベントで会えるのをお待ちしております!</p>
        </StarBackground>
      </div>
    </div>
  );
};
