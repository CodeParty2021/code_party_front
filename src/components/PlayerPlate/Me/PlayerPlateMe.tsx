import { Button } from "components/Button/Button";
import React from "react";
import { Badge } from "../components/Badge/Badge";
import { PlayerPlateCard } from "../components/PlayerPlateCard/PlayerPlateCard";
import { Status } from "../components/Status/Status";
import {
  ColumnBottomStye,
  ColumnMiddleStye,
  ColumnTopStye,
} from "./PlayerPlateMeStyle";

type Props = {
  userName?: string;
  userPhoto?: string;
  badge?: string;
  color?: "turquoise" | "leaf" | "orange" | "magenta";
  status: "default" | "ready";
  selectedCodeName?: string;
  onClickSelectCode?: () => void;
  onClickSelectOtherCode?: () => void;
};

export const PlayerPlateMe: React.FC<Props> = ({
  userName,
  badge,
  color,
  status,
  selectedCodeName,
  onClickSelectCode,
  onClickSelectOtherCode,
}) => {
  return (
    <PlayerPlateCard
      color={color}
      status={status}
      viewAlgo={true}
      size="L"
      playerIcon={<div>avatar</div>}
      columnTop={
        <ColumnTopStye>
          <span className="playerplateme-name">{userName}</span>
          <Badge badgeName={badge} color={color} />
        </ColumnTopStye>
      }
      columnMiddle={
        <ColumnMiddleStye>
          {status === "default" ? (
            <Button
              color="blue"
              size="L"
              value="コードを選ぶ"
              onClick={onClickSelectCode}
            />
          ) : (
            <>
              <Button
                color="white"
                size="M"
                value="別のコードを選ぶ"
                onClick={onClickSelectOtherCode}
              />
              <span className="playerplateme-codename">{selectedCodeName}</span>
            </>
          )}
        </ColumnMiddleStye>
      }
      columnBottom={
        <ColumnBottomStye>
          {status === "default" ? (
            <Status
              statusMessage="コード未選択"
              viewCheckMark={false}
              color={color}
            />
          ) : (
            <Status
              statusMessage="準備完了"
              viewCheckMark={true}
              color={color}
            />
          )}
        </ColumnBottomStye>
      }
    />
  );
};
