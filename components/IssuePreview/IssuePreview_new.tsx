import * as S from "./IssuePreview.styled";
import { issueWriterProfile } from "@/constants/profile";
import Profile from "../Profile";
import DisConnect from "@/public/images/DisConnect.svg";
import { useState, useEffect } from "react";
import { formatDate } from "@/util/functions/sliceDate";
import Tag from "../\bTag";
// import { IssueData, IssueDataForEdit } from "@/types/issue"; // TODO: 아래로 변경하고 지울거
import { IssueDetailData, IssuePreviewData } from "@/types/issue";
import { Alert } from "@/util/Alert";
import { deleteIssue, getEachIssue } from "@/api";
import { useRouter } from "next/router";
import IssueModal from "../IssueModal";

export default function IssuePreview({
    issuePreview,
    setIssueId,
    type,
    onDelete
}: {
    issuePreview: IssuePreviewData;
    setIssueId?: any;
    type: string;
    onDelete?: (issueId: number) => void;
}) {
    const isIssue = type === "Issue" ? 1 : 0;
    const [isDeploy, setIsDeploy] = useState<boolean>(false);
    const [modalType, setModalType] = useState<string>("");
    const isEdit = issuePreview.edit === "Y" ? 1 : 0;
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if(issuePreview) {
            if (issuePreview.deployYN === "Y") {
            setIsDeploy(true);
            setModalType("readOnly");
            } else {
            setIsDeploy(false);
            setModalType("edit");
            }
        }
    }, []);

    const onConnect = () => {
        issuePreview && setIssueId(issuePreview.issueId);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleEdit = () => {
        setIsModalOpen(true);
    }

    return (
        <S.IssuePreviewBox issue={isIssue} deploy={isDeploy}>
            <S.TopContainer>
                <S.Title>{issuePreview.title}</S.Title>
                <S.ResolvedToggle edit={isEdit} />
                {type === "Release" && <DisConnect onClick={onConnect} />}
            </S.TopContainer>
            {type === "Issue" && <S.MiddleContainer>{issuePreview.content}</S.MiddleContainer>}
            <S.BottomContainer issue={isIssue}>
                <S.BottomLeftContainer>
                    <Profile
                        source={issuePreview.memberImg}
                        profileType={issueWriterProfile}
                        profileName={issuePreview.memberName}
                    />
                    <S.TagBox>
                        <Tag tagText={issuePreview.tag} />
                    </S.TagBox>
                    {issuePreview.endDate && <S.DateBox>{formatDate(issuePreview.endDate)?.shortDateTime}</S.DateBox>}
                </S.BottomLeftContainer>
                <S.ButtonContainer>
                    <S.Button onClick={handleEdit}>수정</S.Button>
                    <S.IssueModal
                        isOpen={isModalOpen}
                        style={{
                            overlay: {backgroundColor: "rgba(91, 91, 91, 0.75)"}
                        }}
                    >
                        <IssueModal
                            onClose={closeModal}
                            type={modalType}
                            issueId={issuePreview.issueId}
                            onSave={editedIssueData => {
                                console.log(">>> Edited Issue Data\n", editedIssueData);
                            }}
                        />
                    </S.IssueModal>
                </S.ButtonContainer>
            </S.BottomContainer>
        </S.IssuePreviewBox>
    );
}