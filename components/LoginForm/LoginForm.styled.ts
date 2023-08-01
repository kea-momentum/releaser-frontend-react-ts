import styled from "styled-components";
type EnabledButton = {
  enabled?: number;
};
export const InputOuterBox = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
`;

export const PasswordOuterBox = styled.div<EnabledButton>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const InputBox = styled.div`
  width: 83%;
  height: 50px;

  display: flex;
  justify-content: start;

  border-radius: 12px;
  border: 2px solid var(--greyscale-200, #e2e8f0);
  margin-top: 10px;
  &:focus-within {
    background-color: #e2e8f0;
  }
`;

export const IconBox = styled.div`
  width: 15%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InputSpace = styled.input`
  width: 80%;
  height: 100%;

  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  box-shadow: none;
  font: inherit;
  appearance: none;
  background-color: transparent;
  &:focus {
    background-color: #e2e8f0;
  }
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px white inset;
    box-shadow: 0 0 0 1000px white inset;
  }
  &:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 1000px #e2e8f0 inset;
    box-shadow: 0 0 0 1000px #e2e8f0 inset;
  }
`;

export const AlertContainer = styled.div`
  width: 83%;
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;
export const LoginButton = styled.div<EnabledButton>`
  font-weight: 600;

  width: 83%;
  height: 56px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 12px;
  margin-top: 10px;
  color: #ffffff;
  background: #434343;
  cursor: ${({ enabled }) => (enabled ? "pointer" : "not-allowed")};
  pointer-events: ${({ enabled }) => (enabled ? "auto" : "none")};
  background: ${({ enabled }) => (enabled ? "#434343" : "#7d7d7d")};
`;

export const SocialLoginContainer = styled.div`
  width: 83%;
  height: 56px;

  display: flex;
  justify-content: center;
  margin-top: 8px;
`;

export const KakaoLogin = styled.div`
  font-weight: 600;

  width: 50%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 12px;
  cursor: pointer;

  background: #ffdfa1;
`;

export const GoogleLogin = styled.div`
  font-weight: 600;

  width: 50%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 12px;
  margin-right: 6px;
  cursor: pointer;

  background: #e9e9e9;
`;

export const BottomContainer = styled.div`
  width: 50%;
  height: 100%;

  display: flex;
  justify-content: flex-end;
`;

export const Button = styled.div`
  font-weight: 500;
  font-size: 13.5px;
  margin-left: 10px;
  cursor: pointer;
`;
