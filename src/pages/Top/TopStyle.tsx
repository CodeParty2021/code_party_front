import styled from "styled-components";
import { FlexGap } from "styles/FlexGap/FlexGap";

export const TopStyle = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const LogoStyle = styled.img`
  width: 665px;
  height: 306px;
`;

export const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  ${FlexGap({ gap: "8px", direction: "column" })}
  margin-top:99px;
`;

export const CenterBox = styled.div`
  display: flex;

  align-items: center;
  flex-direction: column;
`;