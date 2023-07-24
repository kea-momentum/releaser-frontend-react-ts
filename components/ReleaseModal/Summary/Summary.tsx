import { ChangeEvent, Dispatch, SetStateAction } from "react";
import * as S from "./Summary.styled";

export default function Summary({
  summary,
  setSummary,
}: {
  summary: any;
  setSummary?: Dispatch<SetStateAction<string>>;
}) {
  const onChangeSummary = (event: ChangeEvent<HTMLInputElement>) => {
    if (setSummary) {
      setSummary(event.target.value);
    }
  };

  return (
    <S.SummaryInput
      placeholder="릴리즈에 대한 내용을 요약해 주세요"
      type="text"
      value={summary}
      onChange={onChangeSummary}
      maxLength={60}
    />
  );
}
