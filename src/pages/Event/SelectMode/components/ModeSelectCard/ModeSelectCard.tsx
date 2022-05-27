import { Setting, Sword } from "components/icons";
import React from "react";
import {
  ModeSelectCardConvexStyle,
  ModeSelectCardStyle,
  ModeSelectCardStyleProps,
} from "./ModeSelectCardStyle";

type Props = ModeSelectCardStyleProps & {
  mode: "solo" | "battle";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const ModeSelectCard: React.FC<Props> = ({
  mode,
  disabled,
  onClick,
  ...styleProps
}) => {
  return (
    <ModeSelectCardStyle disabled={disabled} onClick={onClick} {...styleProps}>
      <div className="modeselectcard_container_image">
        {mode == "solo" && (
          <img src="/img/modeselectcard_solo.png" alt="訓練モード" />
        )}
        {mode == "battle" && (
          <img src="/img/modeselectcard_battle.png" alt="対戦モード" />
        )}
        <ModeSelectCardConvexStyle
          src="/img/modeselectcard_convex.svg"
          wrapper="svg"
          disabled={disabled}
          {...styleProps}
        />
        {disabled && (
          <div className="modeselectcard_container_info">
            <span>対戦できるロボットがありません</span>
          </div>
        )}
      </div>
      <div className="modeselectcard_container_main">
        {mode == "solo" && (
          <>
            <Setting size={64} />
            <span className="modeselectcard_modename">訓練モード</span>
            <span className="modeselectcard_description">
              まずはこのモードでロボットを
              <br />
              動かす練習をしましょう。
            </span>
          </>
        )}
        {mode == "battle" && (
          <>
            <Sword size={64} />
            <span className="modeselectcard_modename">対戦モード</span>
            <span className="modeselectcard_description">
              AIが搭載されたコンピュータと
              <br />
              対戦することが出来ます。
            </span>
          </>
        )}
      </div>
      <div className="modeselectcard_border" />
    </ModeSelectCardStyle>
  );
};
