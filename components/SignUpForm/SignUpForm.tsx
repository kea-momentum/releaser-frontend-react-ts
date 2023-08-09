import * as S from "./SignUpForm.styled";
import { ChangeEvent, useState, useEffect } from "react";
import User from "../../public/images/User.svg";
import Mail from "../../public/images/Mail.svg";
import Lock from "../../public/images/Lock.svg";
import AlertMessage from "../AlertMessage";
import { Fragment } from "react";
import { signUpRequest } from "@/api";
import { useRouter } from "next/router";
import { Alert } from "@/util";
import { SIGNUP_FORM_MESSAGE } from "@/constants";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [allowSignUp, setAllowSignUp] = useState(0);
  const [warningMessage, setWarningMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setEmail(window?.sessionStorage.getItem("email") ?? "-");
    }
  }, []);

  useEffect(() => {
    if (name === "") {
      setWarningMessage(SIGNUP_FORM_MESSAGE.NAME_WARNING);
      setAllowSignUp(0);
    } else if (email === "") {
      setWarningMessage(SIGNUP_FORM_MESSAGE.EMAIL_WARNING);
      setAllowSignUp(0);
    } else if (password === "" || password !== newPassword) {
      setWarningMessage(SIGNUP_FORM_MESSAGE.CHECK_PASSWORD);
      setAllowSignUp(0);
    } else {
      setWarningMessage("");
      setAllowSignUp(1);
    }
  }, [name, email, password, newPassword]);

  const onClickSignUp = async () => {
    await signUpRequest({
      name,
      email,
      password,
    })
      .then(response => {
        Alert.successWithResponse(SIGNUP_FORM_MESSAGE.SIGNUP_SUCEESS).then(
          response => {
            if (response.isConfirmed) {
              router.push("/Login");
            }
          },
        );
      })
      .catch(error => {
        Alert.error(SIGNUP_FORM_MESSAGE.SIGNUP_FAIL);
      });
  };

  return (
    <Fragment>
      <S.InputOuterBox>
        <S.InputBox enabled={1}>
          <S.IconBox>
            <User />
          </S.IconBox>
          <S.InputSpace
            placeholder="사용자명"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
        </S.InputBox>
      </S.InputOuterBox>
      <S.InputOuterBox>
        <S.InputBox enabled={0}>
          <S.IconBox>
            <Mail />
          </S.IconBox>
          <S.InputSpace
            placeholder="이메일"
            value={email ?? "-"}
            disabled={true}
          />
        </S.InputBox>
      </S.InputOuterBox>
      <S.InputOuterBox>
        <S.InputBox enabled={1}>
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
      <S.PasswordOuterBox>
        <S.InputBox enabled={1}>
          <S.IconBox>
            <Lock />
          </S.IconBox>
          <S.InputSpace
            placeholder="비밀번호 확인"
            type="password"
            value={newPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewPassword(e.target.value)
            }
          />
        </S.InputBox>
      </S.PasswordOuterBox>

      <S.SignUpButton enabled={allowSignUp} onClick={onClickSignUp}>
        회원가입
      </S.SignUpButton>
      <S.AlertContainer>
        {warningMessage && <AlertMessage message={warningMessage} />}
      </S.AlertContainer>
    </Fragment>
  );
}
