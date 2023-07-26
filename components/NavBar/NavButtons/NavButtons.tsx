import * as S from "./NavButtons.styled";
import Notification from "@/public/images/Bell.svg";
import Docs from "@/public/images/Docs.svg";
import { useRouter } from "next/router";

export default function NavButtons({
  type,
  projectId,
}: {
  type: string;
  projectId?: number;
}) {
  const router = useRouter();

  return (
    <S.LinkButtonContainer>
      {type === "releases" && (
        <S.IconContainer>
          <Docs
            onClick={() => {
              router.push(`/ReleaseReport/${projectId}`);
            }}
          />
        </S.IconContainer>
      )}
      <S.IconContainer>
        <Notification />
      </S.IconContainer>

      {type === "releases" && (
        <S.ReleaseButton
          onClick={() => {
            router.push(`/IssueBoard/${projectId}`);
          }}
        >
          Issues
        </S.ReleaseButton>
      )}
      {type === "issues" && <S.IssueButton>Releases</S.IssueButton>}

      <S.GroupButton>Group</S.GroupButton>
    </S.LinkButtonContainer>
  );
}
