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

interface IssueModalProps {
    onClose: () => void;
    type: string;
    onSave: () => void;
    projectId?: number;
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

interface CreateEditReq { // FIXME: 점검 필요
    title: string;
    content: string;
    tag: string;
    endDate: string;
    memberId: number;
}

export default function IssueModal({onClose, type, onSave, projectId}: IssueModalProps) {
    const [memberList, setMemberList] = useState<Member[]>([]);
    useEffect(() => {
        if(projectId) {
            const idObject = {id: projectId};
            projectMemberListRequest(idObject).then(response => {
                if(response.isSuccess) {
                    setMemberList(response.result);
                }
            });
        }
    }, [projectId]);

    // useEffect(() => { // TODO: 지울거
    //     console.log("===Member List: ");
    //     console.log(memberList);
    // }, [memberList]);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [size, setSize] = useState<SizeType>('middle');
    const [selectedDate, setSelectedDate] = useState<string>("");
    const handleDatePickerChange = (
        value: DatePickerProps['value'],
        dateString: string,
    ) => {
        setSelectedDate(dateString);
    };

    // useEffect(() => { // TODO: 지울거
    //     console.log("===Selected Date: ", selectedDate);
    // }, [selectedDate]);

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

    const tagItems: TagItem[] = [
        { key: '1', label: "Deprecated", backgroundStyle: "#ED726F" },
        { key: '2', label: "Changed", backgroundStyle: "#FFCE70" },
        { key: '3', label: "New", backgroundStyle: "#81A0D3" },
        { key: '4', label: "Feature", backgroundStyle: "#438D7F" },
        { key: '5', label: "Fixed", backgroundStyle: "#B4A9E1" },
      ];
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
    const [selectedTag, setSelectedTag] = useState<TagItem | null>(null);
    const handleTagClick = (item: TagItem) => {
        setSelectedTag(item);
    };

    // useEffect(() => { // TODO: 지울거
    //     console.log("===Selected Tag: ", selectedTag);
    //     console.log("===Label: ", selectedTag?.label);
    // }, [selectedTag]);

    const [selectedMember, setSelectedMember] = useState<number>(0);
    const handleMemberClick = (memId: number) => {
        setSelectedMember(memId);
    };
    
    // useEffect(() => { // TODO: 지울거
    //     console.log("===Selected MemberId: ", selectedMember);
    // }, [selectedMember]);

    const reqData: CreateEditReq = {
        title: title,
        content: content,
        tag: selectedTag?.label || "",
        endDate: selectedDate,
        memberId: selectedMember
    };
    const handleSave = () => {
        issueCreateEdit(reqData, 21).then(response => {
            console.log("===RES===");
            console.log(response.result);
        });
    }

    // useEffect(() => { // TODO: 지울거
    //     console.log("===REQ DATA===");
    //     console.log(reqData);
    // }, [reqData]);

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
                                    <DatePicker size={size} onChange={handleDatePickerChange} />
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
                    <ModalButtons type="three" onSave={handleSave} />
                </S.ButtonWrapper>
            </S.ButtonSection>
        </S.MainContainer>
    );
}