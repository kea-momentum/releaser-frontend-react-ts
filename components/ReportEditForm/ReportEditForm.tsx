import { ReleaseReport } from "@/types";
import Tag from "../\bTag";
import * as S from "./ReportEditForm.styled";
import { checkVersionType } from "@/util/functions/version";
import Triangle from "@/public/images/Triangle.svg";
import Circle from "@/public/images/Circle.svg";
import Rectangle from "@/public/images/Rectangle.svg";
import Upload from "@/public/images/Upload.svg";
import { TAG_COLOR } from "@/constants/Tag";
import { useState } from "react";
import { useRef, useCallback, useEffect } from "react";
import * as api from "@/api";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import { Alert } from "@/util/Alert";
type SummaryType = {
  issueId: number;
  summary: string;
};

export default function ReportEditForm({
  releaseReport,
  projectId,
}: {
  releaseReport: ReleaseReport;
  projectId: string;
}) {
  const [writeSummary, setWriteSummary] = useState(0);
  const ref = useRef<HTMLTextAreaElement>(null);
  const refContent = useRef<HTMLDivElement>(null);
  const [summaryList, setSummaryList] = useState<SummaryType[]>([]);
  const [summary, setSummary] = useState<string>();

  useEffect(() => {
    if (ref === null || ref.current === null) {
      return;
    }
    ref.current.style.height = "30px";
    ref.current.style.height = ref.current?.scrollHeight + "px";
  }, [ref]);

  const handleResizeHeight = useCallback(() => {
    if (ref === null || ref.current === null) {
      return;
    }
    ref.current.style.height = "30px";
    ref.current.style.height = ref.current?.scrollHeight + "px";
  }, [ref]);

  const getVersion = (version: string) => {
    const type = checkVersionType(version).type;
    return type === "major" ? (
      <Circle />
    ) : type === "minor" ? (
      <Rectangle />
    ) : (
      <Triangle />
    );
  };

  const onChangeSummary = (e: any) => {
    setSummary(e.target.value);
  };

  const onClickUpload = (issueId: number) => {
    setWriteSummary(-1);
    if (
      summaryList.some(
        (summaryObject: any) => summaryObject.issueId === issueId,
      )
    ) {
      const updateSummaryList: SummaryType[] = summaryList.map(
        (summaryObject: any) => {
          if (summaryObject.issueId == issueId) {
            return { ...summaryObject, summary: summary };
          } else {
            return summaryObject;
          }
        },
      );
      setSummaryList(updateSummaryList as SummaryType[]);
      api
        .patchReleaseReport({
          projectId: projectId,
          summaryList: updateSummaryList,
        })
        .then(response => {
          if (!response.isSuccess) {
            Alert.error(response.message);
          }
        });
    } else {
      const updatedSummaryList = [
        ...summaryList,
        { issueId, summary },
      ] as SummaryType[];
      setSummaryList(updatedSummaryList);
      api
        .patchReleaseReport({
          projectId: projectId,
          summaryList: [{ issueId: issueId, summary: summary }],
        })
        .then(response => {
          if (!response.isSuccess) {
            Alert.error(response.message);
          }
        });
    }
  };

  const sumamryList = ({
    issueId,
    withComponent,
    summary,
  }: {
    issueId: number;
    withComponent: boolean;
    summary: string;
  }) => {
    const targetSummary = summaryList.find(
      (summaryObject: any) => summaryObject.issueId === issueId,
    );
    if (targetSummary && withComponent) {
      return <div>{targetSummary.summary}</div>;
    } else if (targetSummary && !withComponent) {
      return targetSummary.summary;
    }
    return summary;
  };

  const onClickTitle = ({
    issueId,
    summary,
  }: {
    issueId: number;
    summary: string;
  }) => {
    setWriteSummary(issueId);

    const matchingSummaryObject = summaryList.find(
      (summaryObject: any) => summaryObject.issueId === issueId,
    );
    if (matchingSummaryObject) {
      setSummary(matchingSummaryObject.summary);
    } else {
      setSummary(summary);
    }
  };

  return (
    <>
      <S.VersionHeader>
        {getVersion(releaseReport.releaseVersion)}
        {releaseReport.releaseVersion}
      </S.VersionHeader>
      <S.TitleHeader>{releaseReport.releaseTitle}</S.TitleHeader>
      <S.MarkDownContainer>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {releaseReport.releaseContent}
        </ReactMarkdown>
      </S.MarkDownContainer>
      <S.IssueContainer>
        {releaseReport.tagsList?.map(tag => (
          <S.IssueSubContainer key={tag.tag}>
            <S.TagContainer>
              <Tag tagText={tag.tag} />
            </S.TagContainer>
            {tag.titleList.map(title => (
              <S.IssueContent key={title.issueId}>
                <S.IssueTitle>
                  <S.IssueNumber color={TAG_COLOR[tag.tag]}>
                    #{title.issueId}
                  </S.IssueNumber>
                  <S.IssueTitleText
                    onClick={() =>
                      onClickTitle({
                        issueId: title.issueId,
                        summary: title.summary,
                      })
                    }
                  >
                    {title.title}
                  </S.IssueTitleText>
                </S.IssueTitle>

                {writeSummary !== title.issueId &&
                  sumamryList({
                    issueId: title.issueId,
                    withComponent: true,
                    summary: title.summary,
                  }) && (
                    <S.SummaryContainer ref={refContent}>
                      <S.SummaryText>
                        {sumamryList({
                          issueId: title.issueId,
                          withComponent: true,
                          summary: title.summary,
                        })}
                      </S.SummaryText>
                    </S.SummaryContainer>
                  )}

                {refContent && writeSummary === title.issueId && (
                  <S.InputContainer
                    color={TAG_COLOR[tag.tag]}
                    heightvalue={
                      ref?.current
                        ? refContent.current?.clientHeight + "px"
                        : ref.current?.scrollHeight + "px"
                    }
                  >
                    <S.InputSpace
                      rows={1}
                      placeholder="해당 이슈에 대한 추가적인 내용을 작성해주세요"
                      ref={ref}
                      onInput={handleResizeHeight}
                      value={summary}
                      onChange={(e: any) => onChangeSummary(e)}
                    />
                    <S.UploadButton
                      color={TAG_COLOR[tag.tag]}
                      onClick={() => onClickUpload(title.issueId)}
                    >
                      <Upload />
                    </S.UploadButton>
                  </S.InputContainer>
                )}
              </S.IssueContent>
            ))}
          </S.IssueSubContainer>
        ))}
      </S.IssueContainer>
    </>
  );
}
