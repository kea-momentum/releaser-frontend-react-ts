import * as S from "./LoginForm.styled";
import { ChangeEvent, useState, useEffect } from "react";
import Mail from "../../public/images/Mail.svg";
import Lock from "../../public/images/Lock.svg";
import AlertMessage from "../AlertMessage";
import { Fragment } from "react";
import { loginRequest } from "@/api";
import { setAccessToken, setRefreshToken } from "@/storage/Cookie";
import { useRouter } from "next/router";
import * as api from "@/api";
import { LOGIN_FORM_PLACEHOLDER, LOGIN_FORM_MESSAGE, PAGE } from "@/constants";
import { loginState } from "@/storage/atom";
import { useSetRecoilState } from "recoil";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [allowSignUp, setAllowSignUp] = useState(0);
  const [warningMessage, setWarningMessage] = useState("");
  const handleIsLogin = useSetRecoilState<boolean>(loginState);
  const router = useRouter();

  if (typeof window !== "undefined") {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");
    const refreshToken = urlParams.get("refreshToken");

    if (accessToken && refreshToken) {
      window.sessionStorage.setItem("accessToken", accessToken);
      setRefreshToken(refreshToken);
      router.push(PAGE.PROJECT_WORKSPACE_PAGE);
    }
  }

  useEffect(() => {
    if (email === "") {
      setWarningMessage(LOGIN_FORM_MESSAGE.EMAIL_WARNING);
      setAllowSignUp(0);
    } else if (password === "") {
      setWarningMessage(LOGIN_FORM_MESSAGE.PASSWORD_WARNING);
      setAllowSignUp(0);
    } else {
      setWarningMessage("");
      setAllowSignUp(1);
    }
  }, [email, password]);

  const onClickLogin = async () => {
    await loginRequest({
      email,
      password,
    })
      .then(response => {
        window.sessionStorage.setItem(
          "accessToken",
          response.result.accessToken,
        );
        window.sessionStorage.setItem(
          "email",
          email
        );
        setRefreshToken(response.result.refreshToken);
        handleIsLogin(true);
        router.push(PAGE.PROJECT_WORKSPACE_PAGE);
      })
      .catch(error => {
        alert("로그인실패");
      });
  };

  const onClickSignUp = () => {
    router.push(PAGE.EMAIL_CONFIRM_PAGE);
  };

  const onClickFindPass = () => {
    router.push(PAGE.FIND_PASSWORD_PAGE);
  };

  const googleLogin = () => {
    router.push(
      "https://releaser.shop/oauth2/authorize/google?redirect_uri=https://releaser.shop/api/auth/token",
    );
  };

  const kakaoLogin = () => {
    router.push(
      "https://releaser.shop/oauth2/authorize/kakao?redirect_uri=http://localhost:3000/Login",
    );
  };

  return (
    <Fragment>
      <S.InputOuterBox></S.InputOuterBox>
      <S.InputOuterBox>
        <S.InputBox>
          <S.IconBox>
            <Mail />
          </S.IconBox>
          <S.InputSpace
            placeholder={LOGIN_FORM_PLACEHOLDER.EMAIL}
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
            placeholder={LOGIN_FORM_PLACEHOLDER.PASSWORD}
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
        <S.KakaoLogin onClick={() => kakaoLogin()}>카카오 로그인</S.KakaoLogin>
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
