import { AlgoStyle } from "components/Character/Algo/AlgoStyle";
import { PlayerPlateColors } from "components/PlayerPlate/colors";
import styled, { css } from "styled-components";
import { FlexGap } from "styles/FlexGap/FlexGap";

export type PlayerPlateCardStyleProps = {
  color?: "turquoise" | "leaf" | "orange" | "magenta";
  status?: "default" | "ready" | "disconnecting" | "bot" | "waiting";
  size?: "L" | "M";
};

const defaultStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px;
  ${FlexGap({ gap: "16px", direction: "column" })}

  position: relative;

  border-radius: 48px;
  background-color: ${PlayerPlateColors.background};

  .playerplatecard_playericon {
    position: absolute;
    top: 30px;
    left: 30px;
  }

  .playerplatecard_window {
    position: relative;
    border-radius: 24px;
    align-self: stretch;
    flex-grow: 1;
    overflow: hidden;

    ${AlgoStyle} {
      position: absolute;
      bottom: -48px;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .playerplatecard_column_top,
  .playerplatecard_column_middle,
  .playerplatecard_column_bottom {
    width: 100%;
  }

  .playerplatecard_column_top,
  .playerplatecard_column_middle {
    border-bottom: 1px solid ${PlayerPlateColors.border};
  }

  .playerplatecard_column_bottom {
  }

  .playerplatecard_border {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    pointer-events: none;

    border: 1px solid ${PlayerPlateColors.border};
    border-radius: 48px;
  }
`;

const turquoiseStyle = css`
  .playerplatecard_window {
    background-color: ${PlayerPlateColors.turquoise.back};
  }

  .playerplatecard_border {
    border-color: ${PlayerPlateColors.turquoise.main};
  }
`;

const leafStyle = css`
  .playerplatecard_window {
    background-color: ${PlayerPlateColors.leaf.back};
  }

  .playerplatecard_border {
    border-color: ${PlayerPlateColors.leaf.main};
  }
`;

const orangeStyle = css`
  .playerplatecard_window {
    background-color: ${PlayerPlateColors.orange.back};
  }

  .playerplatecard_border {
    border-color: ${PlayerPlateColors.orange.main};
  }
`;

const magentaStyle = css`
  .playerplatecard_window {
    background-color: ${PlayerPlateColors.magenta.back};
  }

  .playerplatecard_border {
    border-color: ${PlayerPlateColors.magenta.main};
  }
`;

const defaultBorderStyle = css`
  .playerplatecard_border {
    border-color: ${PlayerPlateColors.border};
  }
`;

const readyStyle = css`
  .playerplatecard_border {
    border-width: 4px;
  }
`;

const disconnectingStyle = css`
  .playerplatecard_window {
    background-color: ${PlayerPlateColors.gray.back};
  }

  .playerplatecard_border {
    border-color: ${PlayerPlateColors.border};
  }
`;

const botStyle = css`
  .playerplatecard_window {
    background-color: ${PlayerPlateColors.gray.back};
  }

  .playerplatecard_border {
    border-width: 4px;
  }
`;

const waitingStyle = css`
  .playerplatecard_window {
    background-color: ${PlayerPlateColors.gray.back};
  }

  .playerplatecard_border {
    border-color: ${PlayerPlateColors.border};
  }
`;

const lStyle = css`
  width: 432px;
  height: 588px;
`;

const mStyle = css`
  width: 320px;
  height: 408px;
`;

export const PlayerPlateCardStyle = styled.div<PlayerPlateCardStyleProps>`
  ${defaultStyle}

  ${({ color }) => color === "turquoise" && turquoiseStyle}
  ${({ color }) => color === "leaf" && leafStyle}
  ${({ color }) => color === "orange" && orangeStyle}
  ${({ color }) => color === "magenta" && magentaStyle}

  ${({ status }) => status === "default" && defaultBorderStyle}
  ${({ status }) => status === "ready" && readyStyle}
  ${({ status }) => status === "disconnecting" && disconnectingStyle}
  ${({ status }) => status === "bot" && botStyle}
  ${({ status }) => status === "waiting" && waitingStyle}

  ${({ size }) => size === "L" && lStyle}
  ${({ size }) => size === "M" && mStyle}
`;

PlayerPlateCardStyle.defaultProps = {
  color: "turquoise",
  status: "default",
  size: "M",
};
