import * as S from "./Tag.styled";
import { TAG_COLOR } from "@/constants/Tag";

type TagProps = {
  tagText: keyof typeof TAG_COLOR;
};

export default function Tag({ tagText }: TagProps) {
  return <S.TagContainer color={TAG_COLOR[tagText]}>{tagText}</S.TagContainer>;
}
