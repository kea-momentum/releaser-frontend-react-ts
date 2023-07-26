import { ReleaseReport } from "@/types";
import Tag from "../\bTag";
import * as S from "./ReportEditForm.styled";
import { checkVersionType } from "@/util/functions/version";
import Triangle from "@/public/images/Triangle.svg";
import Circle from "@/public/images/Circle.svg";
import Rectangle from "@/public/images/Rectangle.svg";

export default function ReportEditForm({
  releaseReport,
}: {
  releaseReport: ReleaseReport;
}) {
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

  console.log(releaseReport);
  return (
    <>
      <S.VersionHeader>
        {getVersion(releaseReport.releaseVersion)}
        {releaseReport.releaseVersion}
      </S.VersionHeader>
      <S.TitleHeader>{releaseReport.releaseTitle}</S.TitleHeader>

      <S.IssueContainer>
        {releaseReport.tagsList?.map(tag => (
          <S.IssueSubContainer>
            <S.TagContainer>
              <Tag tagText={tag.tag} />
            </S.TagContainer>
            {tag.titleList.map(title => (
              <div>
                <div>{title.issueId}</div>
                <div>{title.title}</div>
                <div>{title.summary}</div>
              </div>
            ))}
          </S.IssueSubContainer>
        ))}
      </S.IssueContainer>
    </>
  );
}
