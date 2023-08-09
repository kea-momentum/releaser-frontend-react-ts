import * as S from "./ContentsMarkDown.styled";
import { useState, ChangeEvent, useEffect } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";

export default function ContentsMarkDown({
  type,
  content,
  setContent,
}: {
  type: string;
  content: string;
  setContent?: any;
}) {
  const [isPreview, setIsPreview] = useState(false);
  // const [markDownText, setMarkDownText] = useState(content);
  useEffect(() => {
    if (!setContent) {
      setIsPreview(true);
    }
  });

  const onClickPreview = () => {
    setIsPreview(!isPreview);
  };

  const onChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (setContent) {
      setContent(e.target.value);
    }
  };

  const headerStyle =
    type === "release"
      ? { marginTop: "5px", marginLeft: "5px" }
      : { marginTop: "2px", marginLeft: "28px", marginBottom: "6px" };

  const contentAreaStyle =
    type === "release"
      ? { width: "693px", height: "330px" }
      : { width: "92%", height: "80%" };

  return (
    <>
      <S.Header style={headerStyle}>
        {type === "release" && <div>릴리즈에 대한 설명 </div>}
        {type === "issue" && <div>이슈에 대한 설명 </div>}

        {setContent &&
          (isPreview ? (
            <S.PreviewButton onClick={onClickPreview}>작성하기</S.PreviewButton>
          ) : (
            <S.PreviewButton onClick={onClickPreview}>미리보기</S.PreviewButton>
          ))}
      </S.Header>
      {isPreview ? (
        <S.ContentAreaPreview style={contentAreaStyle}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </S.ContentAreaPreview>
      ) : (
        <S.ContentArea
          style={contentAreaStyle}
          value={content ?? ""}
          onChange={onChangeText}
        />
      )}
    </>
  );
}
