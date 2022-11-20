import { Sword } from "components/icons";
import styled from "styled-components";
import { GRAY_100, GRAY_40, RED_70, TURQUOISE_50 } from "styles/colors";

export const TitlePosition = styled.div`
  position: absolute;
  top: 128px;
  left: 205px;
  display: flex;
`;

export const SwordIcon = styled(Sword)`
  margin-right: 32px;
`;

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  transform: translateY(-50%) translateX(-50%);
`;

export const Card = styled.div`
  display: flex;
  width: 1511px;
  border-radius: 32px;
  margin: 51px;
  background-color: white;
`;

export const AlgoStarBanner = styled.img`
  width: 560px;
  height: 240px;
  border-radius: 32px 0 0 32px;
`;

export const AlgoGatherBanner = styled.img`
  border-radius: 32px 0 0 32px;
  width: 560px;
  height: 368px;
`;

export const ContentsArea = styled.div`
  align-items: center;
  flex-grow: 1;
  margin: auto 52px auto 52px;
  border-radius: 0 32px 32px 0;
`;

export const WithButton = styled.div`
  display: flex;
  justify-content: space-between;
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

export const Form = styled.input`
  width: 663px;
  height: 76px;
  border: 2px solid ${GRAY_40};
  border-radius: 12px;
  padding: 24px;
  font-size: 24px;
  &:focus {
    border: 2px solid ${TURQUOISE_50};
  }
  &::placeholder {
    font-family: "Noto Sans JP";
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 150%;
    color: ${GRAY_40};
  }
`;

export const Description = styled.p`
  margin: 32px 0;
  font-family: "Noto Sans JP";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 35px;
`;

export const ErrorMessage = styled.span`
  color: ${RED_70};
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
`;
