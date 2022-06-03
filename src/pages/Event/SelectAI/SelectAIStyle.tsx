import { IconButton } from "components/IconButton/IconButton";
import { PlanetPicture } from "components/PlanetPicture/PlanetPicture";
import styled from "styled-components";
import { FONT } from "styles/constants/constants";
import { FlexGap } from "styles/FlexGap/FlexGap";

export const SelectAIStyle = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 50px 204px 0 204px;
`;
export const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Back = styled.div`
  position: absolute;
  top: 10px;
  left: 0;
`;
export const Title = styled.div`
  height: 25px;
  display:flex;
  ${FlexGap({ gap: "32px" })}
  align-items:center;
  padding-bottom:29px;
`;
export const TitleLabel = styled.div`
  font-family: ${FONT.NOTO_SANS};
  font-style: normal;
  font-weight: 700;
  font-size: 25px;
  line-height: 25px;
  font-feature-settings: "palt" on;

  color: #2a2c33;
  transform: matrix(1, 0, -0.08, 1, 0, 0);
`;
export const Discription = styled.div`
  font-family: ${FONT.NOTO_SANS};
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 18px;

  color: #2f364d;
`;

export const RobotList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 378px);
  justify-content: center;
  overflow: auto;
`;
export const BackButton = styled(IconButton)`
  position: absolute;
  left: 20px;
  top: 19px;
`;

export const Planet = styled(PlanetPicture)`
  position: absolute;
  width: 87px;
  height: 87px;
  left: -43px;
  top: 0px;
`;
