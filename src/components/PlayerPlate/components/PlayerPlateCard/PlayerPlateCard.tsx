import { Algo } from "components/Character/Algo/Algo";
import React, { ReactElement } from "react";
import {
  PlayerPlateCardStyle,
  PlayerPlateCardStyleProps,
} from "./PlayerPlateCardStyle";

type Props = PlayerPlateCardStyleProps & {
  playerIcon: ReactElement;
  viewAlgo: boolean;
  columnTop: ReactElement;
  columnMiddle?: ReactElement;
  columnBottom: ReactElement;
};

export const PlayerPlateCard: React.FC<Props> = ({
  playerIcon,
  viewAlgo,
  columnTop,
  columnMiddle,
  columnBottom,
  ...styleProps
}) => {
  return (
    <PlayerPlateCardStyle {...styleProps}>
      <div className="playerplatecard_window">
        {viewAlgo && <Algo color={styleProps.color} />}
      </div>
      <div className="playerplatecard_column_top">{columnTop}</div>
      {columnMiddle && (
        <div className="playerplatecard_column_middle">{columnMiddle}</div>
      )}
      <div className="playerplatecard_column_bottom">{columnBottom}</div>

      {/* absolute要素 */}
      <div className="playerplatecard_playericon">{playerIcon}</div>
      <div className="playerplatecard_border" />
    </PlayerPlateCardStyle>
  );
};
