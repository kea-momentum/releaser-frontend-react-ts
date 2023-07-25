import * as S from "./LoginForm.styled";
import { ChangeEvent, useState, useEffect } from "react";
import Mail from "../../public/images/Mail.svg";
import Lock from "../../public/images/Lock.svg";
import AlertMessage from "../AlertMessage";
import { Fragment } from "react";
import { loginRequest } from "@/api";
import { setAccessToken, setRefreshToken } from "@/storage/Cookie";
import { useRouter } from "next/router";
import { useGoogleLogin } from "@react-oauth/google";
import * as api from "@/api";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [allowSignUp, setAllowSignUp] = useState(0);
  const [warningMessage, setWarningMessage] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (email === "") {
      setWarningMessage("이메일을 입력해주세요");
      setAllowSignUp(0);
    } else if (password === "") {
      setWarningMessage("비밀번호를 입력해주세요");
      setAllowSignUp(0);
    } else {
      setWarningMessage("");
      setAllowSignUp(1);
    }
  }, [email, password]);

  //API 요청 참고
  const onClickLogin = async () => {
    await loginRequest({
      email,
      password,
    })
      .then(response => {
        setAccessToken(response.result.accessToken);
        setRefreshToken(response.result.refreshToken);
        if (sessionStorage.getItem("prevRoute")) {
          router.push(`${sessionStorage.getItem("prevRoute")}`);
        } else {
          router.push("/ProjectWorkspace");
        }
      })
      .catch(error => {
        alert("로그인실패");
      });
  };

  const onClickSignUp = () => {
    router.push("/SignUp");
  };

  const onClickFindPass = () => {
    router.push("/");
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async res => {
      console.log(res);
      api.gooleLoginRequest(res).then(response => {
        setAccessToken(response.result.accessToken);
        setRefreshToken(response.result.refreshToken);
      });
    },
  });

  return (
    <Fragment>
      <S.InputOuterBox></S.InputOuterBox>
      <S.InputOuterBox>
        <S.InputBox>
          <S.IconBox>
            <Mail />
          </S.IconBox>
          <S.InputSpace
            placeholder="이메일"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </S.InputBox>
      </S.InputOuterBox>
      <S.InputOuterBox>
        <S.InputBox>
          <S.IconBox>
            <Lock />
          </S.IconBox>
          <S.InputSpace
            placeholder="비밀번호"
            type="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </S.InputBox>
      </S.InputOuterBox>
      <S.PasswordOuterBox></S.PasswordOuterBox>

      <S.LoginButton enabled={allowSignUp} onClick={onClickLogin}>
        로그인
      </S.LoginButton>
      <S.SocialLoginContainer>
        <S.GoogleLogin onClick={() => googleLogin()}>구글 로그인</S.GoogleLogin>
        <S.KakaoLogin>카카오 로그인</S.KakaoLogin>
      </S.SocialLoginContainer>
      <S.AlertContainer>
        <S.BottomContainer>
          {warningMessage && <AlertMessage message={warningMessage} />}
        </S.BottomContainer>
        <S.BottomContainer>
          <S.Button onClick={onClickSignUp}>회원가입</S.Button>
          <S.Button onClick={onClickFindPass}>비밀번호 찾기</S.Button>
        </S.BottomContainer>
      </S.AlertContainer>
    </Fragment>
  );
}
