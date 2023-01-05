import { Avatar } from "components/Avatar/Avatar";
import { Button } from "components/Button/Button";
import React from "react";
import { Badge } from "../components/Badge/Badge";
import { PlayerPlateCard } from "../components/PlayerPlateCard/PlayerPlateCard";
import { Status } from "../components/Status/Status";
import { ColumnBottomStye, ColumnTopStye } from "./PlayerPlateOtherStyle";

type Props = {
  userName?: string;
  userType?: "user" | "anonymous";
  userPhoto?: string;
  badge?: string;
  color?: "turquoise" | "leaf" | "orange" | "magenta";
  status: "default" | "ready" | "disconnecting" | "bot" | "waiting";
  onClickChangeCPU?: () => void;
};

export const PlayerPlateOther: React.FC<Props> = ({
  userName,
  userType,
  userPhoto,
  badge,
  color,
  status,
  onClickChangeCPU,
}) => {
  return (
    <PlayerPlateCard
      color={color}
      status={status}
      viewAlgo={status === "default" || status === "ready" || status === "bot"}
      size="M"
      playerIcon={
        status === "bot" ? undefined : (
          <Avatar
            userPhotoUrl={userPhoto}
            type={
              status === "disconnecting"
                ? "anonymous"
                : status === "waiting"
                ? "anonymous"
                : userType || "anonymous"
            }
            color={
              status === "disconnecting"
                ? "gray"
                : status === "waiting"
                ? "gray"
                : color === "magenta"
                ? "pink"
                : color
            }
          />
        )
      }
      columnTop={
        <ColumnTopStye waiting={status === "waiting"}>
          {status === "waiting" ? (
            <Button
              color="white"
              size="S"
              value="コンピュータにする"
              onClick={onClickChangeCPU}
            />
          ) : (
            <>
              <span className="playerplateme-name">{userName}</span>
              <Badge badgeName={badge} color={color} />
            </>
          )}
        </ColumnTopStye>
      }
      columnBottom={
        <ColumnBottomStye>
          {status === "default" ? (
            <Status
              statusMessage="コード未選択"
              viewCheckMark={false}
              color={color}
            />
          ) : status === "ready" ? (
            <Status
              statusMessage="準備完了"
              viewCheckMark={true}
              color={color}
            />
          ) : status === "disconnecting" ? (
            <Status
              statusMessage="切断中…"
              viewCheckMark={false}
              color={color}
            />
          ) : status === "bot" ? (
            <Status
              statusMessage="準備完了"
              viewCheckMark={true}
              color={color}
            />
          ) : (
            <Status
              statusMessage="待機中…"
              viewCheckMark={false}
              color={color}
            />
          )}
        </ColumnBottomStye>
      }
    />
  );
};
