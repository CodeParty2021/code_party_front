import { AlgoHead } from "components/Character/Algo/Head/AlgoHead";
import { ReactSVG } from "react-svg";
import styled from "styled-components";
import { GRAY_80, WHITE } from "styles/colors";
import { FONT } from "styles/constants/constants";

export const ModalPosition = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  min-height: 540px;
`;

export const ModalStyle = styled.div`
  position: relative;
  width: 984px;
  min-height: 532px;
  border: 8px solid ${WHITE};
  border-radius: 32px;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 32px;
`;

export const SignInButton = styled.button`
  width: 306px;
  background-color: ${WHITE};
  display: flex;
  margin: 4px;
  height: 56px;
  border-radius: 8px;
  text-align: left;
  text-align: center;
  padding: 12px 32px;
`;

export const ModalTitle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: ${WHITE};
  border-radius: 12px 0px 32px 0px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 32px 12px;

  & > span {
    font-family: ${FONT.NOTO_SANS};
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 23px;
    text-align: center;
    font-feature-settings: "palt" on;

    color: ${GRAY_80};

    transform: matrix(1, 0, -0.08, 1, 0, 0);
  }
`;
export const AlgoBox = styled.div`
  position: relative;
  width: 455px;
  height: 159px;
  margin-bottom: 25px;
  margin-top: 48px;
`;

export const AlgoHeadMini = styled(AlgoHead)`
  position: absolute;
  width: 75px;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  & div svg {
    width: 100%;
    height: 100%;
  }
`;

export const Balloon = styled(ReactSVG)`
  position: absolute;
  left: 0;
  bottom: 0;
  height: 94px;
`;

export const Message = styled.div`
  position: absolute;
  bottom: 17px;
  left: 50%;
  right: -50%;
  font-family: ${FONT.NOTO_SANS};
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 29px;

  text-align: center;
  font-feature-settings: "palt" on;

  color: ${WHITE};
  transform: translateX(-50%) matrix(1, 0, -0.08, 1, 0, 0);
`;

export const IconArea = styled.div`
  display: block;
  margin: auto 24px auto 0;
  height: 24px;
  text-align: center;
`;

export const ButtonText = styled.p`
  margin: auto auto auto 0;
  font-weight: 700;
  color: ${GRAY_80};
`;

export const BackLinkPosition = styled.div`
  position: absolute;
  top: 32px;
  left: 32px;
`;

// 背景色にmix-blend-modeを適用するために重ねている。
// setnamemodal自体に適用するとその子コンポーネントすべてが透過される。
export const BackgroundBlur = styled.div`
  position: absolute;
  width: 984px;
  height: 532px;
  background: linear-gradient(239.43deg, #f5f5f5 0.81%, #f7f4ff 100%);
  mix-blend-mode: multiply;
  border: 8px solid ${WHITE};
  backdrop-filter: blur(4px);
  border-radius: 32px;
  z-index: -1;
`;
