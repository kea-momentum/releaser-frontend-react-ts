import * as S from "./EmailConfirmForm.styled";
import { ChangeEvent, useState, useEffect } from "react";
import Mail from "../../public/images/Mail.svg";
import Lock from "../../public/images/Lock.svg";
import { Fragment } from "react";
import { useRouter } from "next/router";
import AlertMessage from "../AlertMessage";

export default function EmailConfirmForm() {
  const [email, setEmail] = useState("");
  const [confirmNumber, setConfirmNumber] = useState("");
  const [allowSignUp, setAllowSignUp] = useState(0);
  const [warningMessage, setWarningMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (email === "") {
      setWarningMessage("이메일을 입력해주세요");
      setAllowSignUp(0);
    } else if (confirmNumber === "") {
      setWarningMessage("인증번호를 입력해주세요");
      setAllowSignUp(0);
    } else {
      setWarningMessage("");
      setAllowSignUp(1);
    }
  }, [email, confirmNumber]);

  const onClickSignUp = async () => {};

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
      <S.InputOuterBox>
        <S.InputBox>
          <S.IconBox>
            <Lock />
          </S.IconBox>
          <S.InputSpace
            placeholder="인증번호"
            type="text"
            value={confirmNumber}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setConfirmNumber(e.target.value)
            }
          />
        </S.InputBox>
      </S.InputOuterBox>

      <S.SignUpButton enabled={allowSignUp} onClick={onClickSignUp}>
        인증하기
      </S.SignUpButton>
      <S.AlertContainer>
        {warningMessage && <AlertMessage message={warningMessage} />}
      </S.AlertContainer>
    </Fragment>
  );
}
