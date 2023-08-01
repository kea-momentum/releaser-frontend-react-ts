import * as S from "./EmailConfirmForm.styled";
import { ChangeEvent, useState, useEffect } from "react";
import User from "../../public/images/User.svg";
import Mail from "../../public/images/Mail.svg";
import Lock from "../../public/images/Lock.svg";
import AlertMessage from "../AlertMessage";
import { Fragment } from "react";
import { signUpRequest } from "@/api";
import { useRouter } from "next/router";
import { Alert } from "@/util/Alert";

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
    </Fragment>
  );
}
