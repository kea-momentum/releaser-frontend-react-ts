import * as S from "./FindPassWordForm.styled";
import { ChangeEvent, useState, useEffect } from "react";
import User from "../../public/images/User.svg";
import Mail from "../../public/images/Mail.svg";
import Lock from "../../public/images/Lock.svg";
import AlertMessage from "../AlertMessage";
import { Fragment } from "react";
import { useRouter } from "next/router";
import { Alert } from "@/util/Alert";
import * as api from "@/api";
import { useTimer } from "@/hooks/useTimer";
import { response } from "msw";

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
      setWarningMessage("이름을 입력해주세요");
      setAllowSignUp(0);
    } else if (email === "") {
      setWarningMessage("이메일을 입력해주세요");
      setAllowSignUp(0);
    } else if (showPasswordInput && password === "") {
      setWarningMessage("새로운 비밀번호를 입력하세요");
    } else if (showPasswordInput && confirmPassword === "") {
      setWarningMessage("비밀번호를 확인 해주세요");
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
          Alert.success("이메일 인증에 성공하였습니다.");
          setShowPasswordInput(true);
        } else {
          Alert.error("잘못된 인증번호 입니다.");
        }
      });
  };

  const onClickSendEmail = async () => {
    Alert.success("이메일이 전송되었습니다.");
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
          Alert.success("비밀번호가 재설정 되었습니다.", "/Login", router);
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
            placeholder="사용자명"
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
            placeholder="이메일"
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
              placeholder="인증번호"
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
