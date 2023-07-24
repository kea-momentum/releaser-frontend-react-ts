import IssuePreview from "@/components/IssuePreview";
import * as S from "./ConnectedIssueSection.styled";
import { useState, useEffect } from "react";
export default function ConnectedIssueSection({
  connectedIssues,
  setConnectedIssues,
  issues,
  setIssues,
}: {
  connectedIssues?: any;
  issues: any;
  setConnectedIssues?: any;
  setIssues?: any;
}) {
  const [issueId, setIssueId] = useState(-1);

  useEffect(() => {
    if (setConnectedIssues) {
      if (issueId > 0) {
        setIssues([
          ...issues,
          connectedIssues?.find((issue: any) => issue.issueId === issueId),
        ]);
        const updatedConnectedIssues = connectedIssues?.filter(
          (connectedIssue: any) => connectedIssue.issueId !== issueId,
        );
        setConnectedIssues(updatedConnectedIssues);
        setIssueId(0);
      }
    }
  }, [issueId]);

  return (
    <S.ConnectedIssuesOuterSection>
      <S.ConnectedIssueInnerSection>
        <S.ConnectedIssuesContainer>
          {connectedIssues &&
            connectedIssues.map((connectedIssue: any) => (
              <IssuePreview
                key={connectedIssue.issueId}
                connectedIssue={connectedIssue}
                setIssueId={setIssueId}
                type="Release"
              />
            ))}
        </S.ConnectedIssuesContainer>
      </S.ConnectedIssueInnerSection>
    </S.ConnectedIssuesOuterSection>
  );
}
