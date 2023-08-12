import * as S from "./Tag.styled";
import { TAG_COLOR } from "@/constants";
import { TagType } from "@/types/issue";

type TagProps = {
  tagText: TagType;
};

export default function Tag({ tagText }: TagProps) {
  return <S.TagContainer color={TAG_COLOR[tagText]}>{tagText}</S.TagContainer>;
}
