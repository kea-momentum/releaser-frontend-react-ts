import * as S from "./FindPassWordForm.styled";
import { ChangeEvent, useState, useEffect } from "react";
import User from "../../public/images/User.svg";
import Mail from "../../public/images/Mail.svg";
import Lock from "../../public/images/Lock.svg";
import AlertMessage from "../AlertMessage";
import { Fragment } from "react";
import { useRouter } from "next/router";
import { Alert } from "@/util";
import * as api from "@/api";
import { useTimer } from "@/hooks/useTimer";
import {
  EMAIL_CONFIRM_FORM_MESSAGE,
  FIND_PASSWORD_FORM_MESSAGE,
  SIGNUP_FORM_PLACEHOLDER,
  EMAIL_CONFIRM_FORM_PLACEHOLDER,
} from "@/constants";

export default function FindPassWordForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [allowSignUp, setAllowSignUp] = useState(0);
  const [warningMessage, setWarningMessage] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [minutes, seconds] = useTimer({
    timerStart: showCodeInput,
    setShow: setShowCodeInput,
  });
  const [enabled, setEnabled] = useState(1);
  const router = useRouter();

  useEffect(() => {
    if (name === "") {
      setWarningMessage(FIND_PASSWORD_FORM_MESSAGE.NAME_WARNING);
      setAllowSignUp(0);
    } else if (email === "") {
      setWarningMessage(FIND_PASSWORD_FORM_MESSAGE.EMAIL_WARNING);
      setAllowSignUp(0);
    } else if (showPasswordInput && password === "") {
      setWarningMessage(FIND_PASSWORD_FORM_MESSAGE.NEW_PASSWORD_WARNING);
    } else if (showPasswordInput && confirmPassword === "") {
      setWarningMessage(FIND_PASSWORD_FORM_MESSAGE.CHECK_NEW_PASSWORD);
    } else {
      setWarningMessage("");
      setAllowSignUp(1);
    }
  }, [name, email, password, confirmPassword]);

  const onClickConfirmEmail = async () => {
    await api
      .postConfirmPasswordEmailCode({ email, name, authCode })
      .then(response => {
        console.log(response);
        if (response.isSuccess) {
          Alert.success(EMAIL_CONFIRM_FORM_MESSAGE.EMAIL_CONFIRM_SUCCESS);
          setShowPasswordInput(true);
        } else {
          Alert.error(EMAIL_CONFIRM_FORM_MESSAGE.WRONG_CONFIRM_NUMBER);
        }
      });
  };

  const onClickSendEmail = async () => {
    Alert.success(EMAIL_CONFIRM_FORM_MESSAGE.EMAIL_SENT);
    setShowCodeInput(true);
    setEnabled(0);
    await api.postConfirmPasswordEmail({
      email,
      name,
    });
  };

  const onClickSetPassword = async () => {
    await api
      .postResetPassword({ email, password, confirmPassword })
      .then(response => {
        if (response.isSuccess) {
          Alert.success(
            FIND_PASSWORD_FORM_MESSAGE.SET_NEW_PASSWORD_SUCCESS,
            "/Login",
            router,
          );
        }
      });
  };

  return (
    <Fragment>
      <S.InputOuterBox>
        <S.InputBox enabled={enabled}>
          <S.IconBox>
            <User />
          </S.IconBox>
          <S.InputSpace
            placeholder={SIGNUP_FORM_PLACEHOLDER.USER_NAME}
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            disabled={showCodeInput}
          />
        </S.InputBox>
      </S.InputOuterBox>
      <S.InputOuterBox>
        <S.InputBox enabled={enabled}>
          <S.IconBox>
            <Mail />
          </S.IconBox>
          <S.InputSpace
            placeholder={SIGNUP_FORM_PLACEHOLDER.EMAIL}
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            disabled={showCodeInput}
          />
        </S.InputBox>
      </S.InputOuterBox>
      {showCodeInput && !showPasswordInput && (
        <S.InputOuterBox>
          <S.InputBox enabled={1}>
            <S.IconBox>
              <Lock />
            </S.IconBox>
            <S.InputSpace
              placeholder={EMAIL_CONFIRM_FORM_PLACEHOLDER.CONFIRM_NUMBER}
              type="text"
              value={authCode}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setAuthCode(e.target.value)
              }
            />
          </S.InputBox>
        </S.InputOuterBox>
      )}
      {showPasswordInput && (
        <Fragment>
          <S.InputOuterBox>
            <S.InputBox enabled={1}>
              <S.IconBox>
                <Lock />
              </S.IconBox>
              <S.InputSpace
                placeholder={SIGNUP_FORM_PLACEHOLDER.PASSWORD}
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
                placeholder={SIGNUP_FORM_PLACEHOLDER.PASSWORD_CONFIRM}
                type="password"
                value={confirmPassword}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setConfirmPassword(e.target.value)
                }
              />
            </S.InputBox>
          </S.PasswordOuterBox>
        </Fragment>
      )}

      {!showCodeInput ? (
        <S.SignUpButton enabled={allowSignUp} onClick={onClickSendEmail}>
          이메일 인증번호 전송
        </S.SignUpButton>
      ) : showPasswordInput ? (
        <S.SignUpButton enabled={allowSignUp} onClick={onClickSetPassword}>
          새로운 비밀번호 설정
        </S.SignUpButton>
      ) : (
        <S.SignUpButton enabled={allowSignUp} onClick={onClickConfirmEmail}>
          이메일 인증하기
        </S.SignUpButton>
      )}
      <S.AlertContainer>
        {showCodeInput && !showPasswordInput && (
          <AlertMessage
            message={`${minutes}분 ${seconds}초 내로 인증번호를 입력해주세요`}
          />
        )}
        {warningMessage !== "" && <AlertMessage message={warningMessage} />}
      </S.AlertContainer>
    </Fragment>
  );
}
