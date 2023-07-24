import * as S from "./Summary.styled";
import { limitLength } from "@/util/functions/limitTextLength";

export default function Summary({
  summary,
  setSummary,
}: {
  summary: any;
  setSummary?: any;
}) {
  const onChangeSummary = (event: any) => {
    setSummary(event.target.value);
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
