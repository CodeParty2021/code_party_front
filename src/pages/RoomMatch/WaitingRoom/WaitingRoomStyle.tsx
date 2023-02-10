import { Sword } from "components/icons";
import styled from "styled-components";
import { GRAY_100, GRAY_90 } from "styles/colors";
import { FlexGap } from "styles/FlexGap/FlexGap";

export const WaitingRoomStyle = styled.div`
  display: flex;
  padding: 128px;
  justify-content: space-around;
  align-items: center;
  height: 100vh;
`;

export const TitlePosition = styled.div`
  display: flex;
`;
export const Title = styled.h2`
  color: ${GRAY_100};
  font-size: 30px;
  font-weight: 700px;
  font-feature-settings: "palt" on;
  transform: matrix(1, 0, -0.08, 1, 0, 0);
  line-height: 30px;
  display: flex;
  align-items: center;
`;
export const SwordIcon = styled(Sword)`
  margin-right: 32px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  ${FlexGap({ gap: "36px" })}
`;

export const PlayerBox = styled.div`
  display: flex;
  ${FlexGap({ gap: "24px" })}
`;
export const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const InfoPanel = styled.div`
  display: flex;
  ${FlexGap({ gap: "24px" })}
  align-items: flex-end;
`;
export const RoomInfo = styled.div`
  padding: 0 24px 0;
  font-family: "Noto Sans JP";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 35px;
  /* identical to box height */

  font-feature-settings: "palt" on;

  /* GRAY_90 */

  color: ${GRAY_90};
`;

export const RoomID = styled.div`
  font-family: "Noto Sans JP";
  font-style: normal;
  font-weight: 700;
  font-size: 48px;
  line-height: 48px;
  /* identical to box height */

  font-feature-settings: "palt" on;

  /* GRAY_90 */

  color: ${GRAY_90};

  transform: matrix(1, 0, -0.08, 1, 0, 0);
`;
export const Others = styled.div`
  display: flex;
  ${FlexGap({ gap: "24px" })}
`;
export const BottomPanel = styled.div`
  display: flex;
  justify-content: flex-end;
  ${FlexGap({ gap: "24px" })}
`;
