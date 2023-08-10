import * as S from "./Title.styled";
import { Dispatch, Fragment, SetStateAction, ChangeEvent } from "react";
import { CONTENT_TYPE } from "@/constants";

export default function Title({
  type,
  title,
  setTitle,
}: {
  type: string;
  title: string;
  setTitle?: Dispatch<SetStateAction<string>>;
}) {
  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    if (setTitle) {
      setTitle(event.target.value);
    }
  };

  return (
    <Fragment>
      {type === CONTENT_TYPE.RELEASE && (
        <S.TitleContainer>
          <S.TitleInput
            placeholder="릴리즈 노트 제목을 입력해주세요"
            value={title}
            onChange={onChangeTitle}
          />
        </S.TitleContainer>
      )}
      {type === CONTENT_TYPE.ISSUE && (
        <S.IssueTitleInput
          placeholder="이슈 제목"
          value={title}
          onChange={onChangeTitle}
        />
      )}
    </Fragment>
  );
}
