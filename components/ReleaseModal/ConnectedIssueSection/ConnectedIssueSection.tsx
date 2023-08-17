import IssuePreview from "@/components/IssuePreview";
import * as S from "./ConnectedIssueSection.styled";
import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
export default function ConnectedIssueSection({
  connectedIssues,
  setConnectedIssues,
  issues,
  setIssues,
  releaseDeploy,
}: {
  connectedIssues?: any;
  issues: any;
  setConnectedIssues?: any;
  setIssues?: any;
  releaseDeploy?: boolean;
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
              <Router>
                <IssuePreview
                  key={connectedIssue.issueId}
                  issueList={connectedIssue}
                  setIssueId={setIssueId}
                  type="Release"
                  releaseDeploy={releaseDeploy}
                />
              </Router>
            ))}
        </S.ConnectedIssuesContainer>
      </S.ConnectedIssueInnerSection>
    </S.ConnectedIssuesOuterSection>
  );
}
