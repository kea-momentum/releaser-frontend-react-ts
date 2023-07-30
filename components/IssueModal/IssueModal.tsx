import * as S from "./IssueModal.styled";
import React, {Fragment, useEffect, useState} from "react";
import Title from "../ReleaseModal/Title";
import ContentsMarkDown from "../ReleaseModal/ContentsMarkDown/ContentsMarkDown";
import Comments from "@/components/Comments";
import ModalButtons from "../ModalButtons";
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import DatePicker from "antd/lib/date-picker";
import Space from "antd/lib/space";
import type { DatePickerProps } from 'antd/es/date-picker';
import Dropdown from "antd/lib/dropdown";
import { Search } from "lucide-react";
import { projectMemberListRequest } from "@/api/projectMember";
import MomentumProfile from "@/public/images/Momentum.svg";
import { FiCheck } from "react-icons/fi";
import { issueCreateEdit } from "@/api/issue";
import { Issue } from "@/util/Issue";
import { Alert } from "@/util/Alert";
import { useRouter } from "next/router";
import { IssueData, IssueDataForEdit } from "@/types/issue";

interface IssueModalProps {
    onClose: () => void;
    type: string;
    onSave: (issueData: IssueData) => void;
    projectId?: number;
    issueId?: number;
    issueDataForEdit?: IssueDataForEdit;
}

interface TagItem {
    key: string;
    label: string;
    backgroundStyle: string;
}

interface Member {
    memberId: number;
    name: string;
    img: string;
}

export default function IssueModal({onClose, type, onSave, projectId, issueId, issueDataForEdit}: IssueModalProps) {
    const router = useRouter();

    const tagItems: TagItem[] = [
        { key: '1', label: "DEPRECATED", backgroundStyle: "#ED726F" },
        { key: '2', label: "CHANGED", backgroundStyle: "#FFCE70" },
        { key: '3', label: "NEW", backgroundStyle: "#81A0D3" },
        { key: '4', label: "FEATURE", backgroundStyle: "#438D7F" },
        { key: '5', label: "FIXED", backgroundStyle: "#B4A9E1" },
    ];

    useEffect(() => {
        console.log("===Issue Modal===\n", issueDataForEdit); // TODO: 지울거
        if(issueDataForEdit) {
            setTitle(issueDataForEdit?.title);
            setContent(issueDataForEdit?.content);
            setMemberList(issueDataForEdit?.memberList);
            setSelectedMember(issueDataForEdit?.manager);
            if(issueDataForEdit.endDate) {
                setSelectedDate((issueDataForEdit.endDate).split("T")[0]);
            } else {
                setSelectedDate("Select date");
            }
            if(issueDataForEdit.edit === "Y") {
                setEditYN("Edited");
            } else {
                setEditYN("Not Edited");
            }
            setSelectedTag(tagItems.find(item => item.label === issueDataForEdit.tag));
        }
    }, [issueDataForEdit]);
    useEffect(() => { // TODO: 지울거
        console.log("===Issue ID===\n", issueId);
    }, [issueId]);

    const [memberList, setMemberList] = useState<Member[]>([]);
    useEffect(() => {
        if(projectId) {
            const idObject = {id: projectId};
            projectMemberListRequest(idObject).then(response => {
                if(response.isSuccess) {
                    setMemberList(response.result.memberList);
                }
            });
        }
    }, [projectId]);

    const [title, setTitle] = useState<string>();
    const [content, setContent] = useState<string>();

    const [size, setSize] = useState<SizeType>('middle');
    const [selectedDate, setSelectedDate] = useState<string>();
    const handleDatePickerChange = (
        value: DatePickerProps['value'],
        dateString: string,
    ) => {
        setSelectedDate(dateString);
    };

    const [editYN, setEditYN] = useState("Not Edited");
    const handleEditYN = () => {
        if(editYN === "Not Edited") {
            setEditYN("Edited");
        } else if(editYN === "Edited") {
            setEditYN("Not Edited");
        }
    };
    const editIconStyle =
        editYN === "Not Edited"
            ? {background: "#D9D9D9"}
            : {background: "#BF3B3B"};

    const tagDropdownStyle = (
        <S.TagListWrapper>
            {tagItems.map((item) => (
                <S.TagContainer
                    style={{background: item.backgroundStyle}}
                    key={item.key}
                    onClick={() => handleTagClick(item)}
                >
                    {item.label}
                </S.TagContainer>
            ))}
        </S.TagListWrapper>
    );
    const [selectedTag, setSelectedTag] = useState<TagItem>();
    const handleTagClick = (item: TagItem) => {
        setSelectedTag(item);
    };

    const [selectedMember, setSelectedMember] = useState<number>();
    const handleMemberClick = (memId: number) => {
        setSelectedMember(memId);
    };

    const [cancel, setCancel] = useState(false);
    const [confirm, setConfirm] = useState(false);

    useEffect(() => {
        if(confirm) {
            createIssue();
        }
    }, [confirm, cancel]);

    const createIssue = () => {
        const reqData = {
            title: title,
            content: content,
            tag: selectedTag?.label || "",
            endDate: selectedDate,
            memberId: selectedMember
        };
        const isPossible = Issue.isPossibleCreate(title, reqData.tag, content);
        if(isPossible) {
            issueCreateEdit(reqData, projectId).then(response => {
                Alert.success("새로운 이슈가 생성되었습니다");

                const createIssueData: IssueData = {
                    issueId: response.result.issueId, // 이슈 수정 시 여기서 오류
                    title: reqData.title,
                    content: reqData.content,
                    tag: reqData.tag,
                    endDate: reqData.endDate,
                    memberId: reqData.memberId,
                    lifeCycle: "NOT_STARTED",
                    edit: "N",
                };
                onSave(createIssueData);
                onClose();
            });
        }
        setConfirm(false);
    };

    return (
        <S.MainContainer>
            <S.TitleSection>
                <Title type="issue" title={title} setTitle={setTitle} />
            </S.TitleSection>

            <S.ContentSection>
                <S.ContentWrapper>
                    <S.TopContent>
                        <S.TopLeft>
                            <S.TagWrapper>
                                <div>태그</div>
                                <Dropdown overlay={tagDropdownStyle} placement="bottom" arrow>
                                    <S.TagListTitle style={selectedTag ? {background: selectedTag.backgroundStyle, color: "#FFFFFF", fontSize: "12px"} : {}}>
                                        {selectedTag?.label || "Tag"}
                                    </S.TagListTitle>
                                </Dropdown>
                            </S.TagWrapper>
                            <S.EndDateWrapper>
                                <div>마감일</div>
                                <Space style={{marginLeft: "10px"}} direction="vertical" size={12}>
                                    <DatePicker size={size} onChange={handleDatePickerChange} placeholder={selectedDate} />
                                </Space>
                            </S.EndDateWrapper>
                        </S.TopLeft>
                        <S.TopRight>
                            <S.EditYNWrapper>
                                <S.EditIconButton onClick={handleEditYN} style={editIconStyle} />
                                <div>{editYN}</div>
                            </S.EditYNWrapper>
                        </S.TopRight>
                    </S.TopContent>
                    <S.MiddleContent>
                        <S.DescriptionWrapper>
                            <ContentsMarkDown type="issue" content={content} setContent={setContent} />
                        </S.DescriptionWrapper>
                        <S.PersonDesWrapper>
                            <S.SearchPersonSection>
                                <S.SearchPersonTitle>담당자</S.SearchPersonTitle>
                                <S.SearchContainer>
                                    <S.SearchInput />
                                    <Search size={14} color="#C6C2C2" style={{cursor: "pointer"}} />
                                </S.SearchContainer>
                            </S.SearchPersonSection>
                            <S.PersonListSection>
                                {[
                                    ...memberList.filter((member) => member.memberId === selectedMember),
                                    ...memberList.filter((member) => member.memberId !== selectedMember).sort((a, b) => a.memberId - b.memberId),
                                ]
                                .map((member) => (
                                    <S.PersonItem
                                        key={member.memberId}
                                        onClick={() => handleMemberClick(member.memberId)}
                                        style={{
                                            background: selectedMember === member.memberId ? "#81A0D3" : "#FFFFFF",
                                            color: selectedMember === member.memberId ? "#FFFFFF" : "#393939",
                                        }}
                                    >
                                        <S.ProfileContainer>
                                            {member.img ? (
                                                <img src={member.img} alt="Profile" />
                                            ) : (
                                                <MomentumProfile />
                                            )}
                                        </S.ProfileContainer>
                                        <div>{member.name}</div>
                                        {selectedMember === member.memberId && (
                                            <FiCheck style={{marginLeft: "80px"}} size={12} color="#FFFFFF" />
                                        )}
                                    </S.PersonItem>
                                ))}
                            </S.PersonListSection>
                        </S.PersonDesWrapper>
                    </S.MiddleContent>
                    <S.BottomContent>
                        <S.OpinionTitle>의견</S.OpinionTitle>
                        <Comments type="issue" />
                    </S.BottomContent>
                </S.ContentWrapper>
            </S.ContentSection>

            <S.ButtonSection>
                <S.ButtonWrapper>
                    <ModalButtons type="three" setConfirm={setConfirm} />
                </S.ButtonWrapper>
            </S.ButtonSection>
        </S.MainContainer>
    );
}