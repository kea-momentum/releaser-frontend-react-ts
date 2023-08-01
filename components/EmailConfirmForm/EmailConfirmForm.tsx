import * as S from "./EmailConfirmForm.styled";
import { ChangeEvent, useState, useEffect } from "react";
import Mail from "../../public/images/Mail.svg";
import Lock from "../../public/images/Lock.svg";
import { Fragment } from "react";
import { useRouter } from "next/router";
import AlertMessage from "../AlertMessage";
import { useTimer } from "@/hooks/useTimer";
import * as api from "@/api";
import { Alert } from "@/util/Alert";

export default function EmailConfirmForm() {
  const [email, setEmail] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [allowSendEmail, setAllowSendEmail] = useState(0);
  const [warningMessage, setWarningMessage] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [minutes, seconds] = useTimer({
    timerStart: showCodeInput,
    setShow: setShowCodeInput,
  });
  const router = useRouter();

  useEffect(() => {
    if (email === "") {
      setWarningMessage("이메일을 입력해주세요");
      setAllowSendEmail(0);
    } else {
      setWarningMessage("");
      setAllowSendEmail(1);
    }
  }, [email, authCode]);

  const onClickSendEmail = async () => {
    Alert.success("이메일이 전송되었습니다.");
    setShowCodeInput(true);
    await api
      .postAuthEmailRequest({
        email,
      })
      .then(response => {})
      .catch(error => {});
  };

  const onClickConfirmEmail = async () => {
    await api
      .postConfirmEmailCode({
        email,
        authCode,
      })
      .then(response => {
        if (response.isSuccess) {
          Alert.success("이메일 인증에 성공하였습니다.", "/SignUp", router);
        } else {
          Alert.error("잘못된 인증번호 입니다.");
        }
      });
  };

  return (
    <Fragment>
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
      {showCodeInput && (
        <S.InputOuterBox>
          <S.InputBox>
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

      {showCodeInput ? (
        <S.SignUpButton
          enabled={allowSendEmail}
          onClick={() => onClickConfirmEmail()}
        >
          이메일 인증하기
        </S.SignUpButton>
      ) : (
        <S.SignUpButton
          enabled={allowSendEmail}
          onClick={() => onClickSendEmail()}
        >
          인증번호 전송
        </S.SignUpButton>
      )}
      <S.AlertContainer>
        {showCodeInput && (
          <AlertMessage
            message={`${minutes}분 ${seconds}초 내로 인증번호를 입력해주세요`}
          />
        )}
      </S.AlertContainer>
    </Fragment>
  );
}
