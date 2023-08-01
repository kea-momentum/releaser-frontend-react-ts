import * as S from "./EmailConfirmForm.styled";
import { ChangeEvent, useState, useEffect, useRef } from "react";
import Mail from "../../public/images/Mail.svg";
import Lock from "../../public/images/Lock.svg";
import { Fragment } from "react";
import { useRouter } from "next/router";
import AlertMessage from "../AlertMessage";
import { useTimer } from "@/hooks/useTimer";

export default function EmailConfirmForm() {
  const [email, setEmail] = useState("");
  const [confirmCode, setConfirmCode] = useState("");
  const [allowSendEmail, setAllowSendEmail] = useState(0);
  const [warningMessage, setWarningMessage] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [minutes, seconds] = useTimer(showCodeInput);
  const router = useRouter();

  useEffect(() => {
    if (email === "") {
      setWarningMessage("이메일을 입력해주세요");
      setAllowSendEmail(0);
    } else {
      setWarningMessage("");
      setAllowSendEmail(1);
    }
  }, [email, confirmCode]);

  const onClickSendEmail = async () => {
    setShowCodeInput(true);
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
              value={confirmCode}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setConfirmCode(e.target.value)
              }
            />
          </S.InputBox>
        </S.InputOuterBox>
      )}

      <S.SignUpButton enabled={allowSendEmail} onClick={onClickSendEmail}>
        {showCodeInput ? "이메일 인증하기" : "인증번호 전송"}
      </S.SignUpButton>
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
