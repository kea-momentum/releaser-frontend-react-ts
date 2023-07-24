import { useEffect, useState } from "react";
import * as S from "./ConnectIssues.styled";
import axios from "axios";
import Tag from "@/components/\bTag";
// const Issues = ({
//   issue,
//   setConnectedIssues,
//   connectedIssues,
//   issues,
//   setIssues,
// }: {
//   issue: any;
//   setConnectedIssues?: any;
//   connectedIssues?: any;
//   issues: any;
//   setIssues?: any;
// }) => {
//   const onConnect = () => {
//     if (connectedIssues) {
//       setConnectedIssues([...connectedIssues, issue]);
//       const updatedIssues = issues?.filter(
//         (iu: any) => iu.issueId !== issue.issueId,
//       );
//       setIssues(updatedIssues);
//     } else {
//       setConnectedIssues([issue]);
//       const updatedIssues = issues?.filter(
//         (iu: any) => iu.issueId !== issue.issueId,
//       );
//       setIssues(updatedIssues);
//     }
//   };

//   return (
//     <S.IssueBox onClick={onConnect}>
//       <S.IssueTitle>{issue.title}</S.IssueTitle>
//     </S.IssueBox>
//   );
// };

export default function ConnectIssues({
  projectId,
  setConnectedIssues,
  connectedIssues,
  issues,
  setIssues,
}: {
  projectId: number;
  setConnectedIssues?: any;
  connectedIssues?: any;
  issues: any;
  setIssues?: any;
}) {
  const onConnect = (issue: any) => {
    if (connectedIssues) {
      setConnectedIssues([...connectedIssues, issue]);
      const updatedIssues = issues?.filter(
        (iu: any) => iu.issueId !== issue.issueId,
      );
      setIssues(updatedIssues);
    } else {
      setConnectedIssues([issue]);
      const updatedIssues = issues?.filter(
        (iu: any) => iu.issueId !== issue.issueId,
      );
      setIssues(updatedIssues);
    }
  };

  return (
    <S.IssuesSection>
      <S.IssueInnerSection>
        <S.IssuesContainer>
          {issues &&
            issues.map((issue: any, index: number) => (
              <div key={index}>
                <S.IssueBox
                  onClick={() => {
                    setIssues && onConnect(issue);
                  }}
                >
                  <S.IssueTitle>{issue.title}</S.IssueTitle>
                  <S.TagBox>
                    {" "}
                    <Tag tagText={issue.tag} />
                  </S.TagBox>
                </S.IssueBox>
              </div>
            ))}
        </S.IssuesContainer>
      </S.IssueInnerSection>
    </S.IssuesSection>
  );
}
