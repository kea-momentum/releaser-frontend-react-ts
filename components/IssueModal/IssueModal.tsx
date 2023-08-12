    import * as S from "./IssueModal.styled";
    import React, {Fragment, useEffect, useState, Dispatch, SetStateAction} from "react";
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
    import { issueCreate, issueEdit, deleteIssue, getEachIssue } from "@/api/issue";
    import { Issue } from "@/util/Issue";
    import { Alert } from "@/util/Alert";
    import { useRouter } from "next/router";
    import { IssueData, IssueDataForEdit } from "@/types/issue";
    import Modal from "antd/es/modal/Modal";
    import { useNavigate } from "react-router-dom";
    import { Calendar } from "lucide-react";
    import { useRecoilValue } from "recoil";
    import { user } from "@/storage/atom";
    import { OpinionType } from "@/types";

    interface IssueModalProps {
        onClose: () => void;
        onSave: (issueData: IssueData) => void;
        projectId?: number;
        issueId?: number;
        onDelete?: (issueId: number) => void;
        onPMConfirm?: (confirm: boolean, issueId: number) => void;
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

    export default function IssueModal({onClose, onSave, projectId, issueId, onDelete, onPMConfirm}: IssueModalProps) {
        const currentUser = useRecoilValue(user);
        useEffect(() => { // TODO: 지울거
            console.log("=== Current User\n", currentUser);
        }, [currentUser]);

        const router = useRouter();
        const projectIdRouter = router.query.id;
        const issueIdRouter = router.query.issueId;
        const navigate = useNavigate();

        const [modalType, setModalType] = useState("create");
        const [issueDetail, setIssueDetail] = useState<IssueDataForEdit>();
        useEffect(() => {
            if(issueId) {
                getEachIssue(issueId).then(response => {
                    if (response.isSuccess) {
                      setIssueDetail(response.result.issueDetails);
                      if(response.result.pmCheck === "Y") {
                        handlePMConfirm(true, issueId);
                      } else {
                        handlePMConfirm(false, issueId);
                      }
                    }
                });
            }
        }, []);
        const handlePMConfirm = (confirm: boolean, issueId: number) => {
            onPMConfirm && onPMConfirm(confirm, issueId);
        }
        
        const [opinionList, setOpinionList] = useState<OpinionType[]>();
        useEffect(() => {
            if(issueDetail) {
                setTitle(issueDetail?.title);
                setIssueNum(issueDetail?.issueNum);
                setContent(issueDetail?.content);
                setMemberList(issueDetail?.memberList);
                setSelectedMember(issueDetail?.manager);
                if(issueDetail.endDate) {
                    setSelectedDate((issueDetail.endDate).split("T")[0]);
                    setDatePlaceholder((issueDetail.endDate).split("T")[0]);
                } else {
                    setSelectedDate("");
                    setDatePlaceholder("Select Date");
                }
                if(issueDetail.edit === "Y") {
                    setEditYN("Edited");
                } else {
                    setEditYN("Not Edited");
                }
                setSelectedTag(tagItems.find(item => item.label === issueDetail.tag));
                if(issueDetail.deployYN === "Y") {
                    setModalType("readOnly");
                } else {
                    setModalType("edit");
                }
                setOpinionList(issueDetail.opinionList);
            }
        }, [issueDetail]);

        const tagItems: TagItem[] = [
            { key: '1', label: "DEPRECATED", backgroundStyle: "#ED726F" },
            { key: '2', label: "CHANGED", backgroundStyle: "#FFCE70" },
            { key: '3', label: "NEW", backgroundStyle: "#81A0D3" },
            { key: '4', label: "FEATURE", backgroundStyle: "#438D7F" },
            { key: '5', label: "FIXED", backgroundStyle: "#B4A9E1" },
        ];

        const [datePlaceholder, setDatePlaceholder] = useState<string>("Select date");
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
        const [issueNum, setIssueNum] = useState<number>();
        const [content, setContent] = useState<string>();

        const [size, setSize] = useState<SizeType>('middle');
        const [selectedDate, setSelectedDate] = useState<string>("");
        const handleDatePickerChange = (
            value: DatePickerProps['value'],
            dateString: string,
        ) => {
            setSelectedDate(dateString);
        };

        const [editYN, setEditYN] = useState("Not Edited");
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
        const [selectedMemberName, setSelectedMemberName] = useState<string>("");
        const [selectedMemberImg, setSelectedMemberImg] = useState<string>("");
        const handleMemberClick = (memId: number, name: string, img: string) => {
            setSelectedMember(memId);
            setSelectedMemberName(name);
            setSelectedMemberImg(img);
        };

        const [cancel, setCancel] = useState(false);
        const [confirm, setConfirm] = useState(false);
        const [clickDelete, setClickDelete]= useState(false);
        useEffect(() => {
            if(confirm) {
                createIssue();
                setConfirm(false);
            }
            if(cancel) {
                Alert.question("이슈보드 창으로 나가시겠습니까?").then(result => {
                    if(result.isConfirmed) {
                        onClose();
                        navigate(-1);
                    }
                })
                setCancel(false);
            }
            if(clickDelete) {;
                issueId && onDelete(issueId);
                setClickDelete(false);
            }
        }, [confirm, cancel, clickDelete]);

        const createIssue = () => {
            const reqData = {
                title: title,
                content: content,
                tag: selectedTag?.label || "",
                endDate: selectedDate,
                memberId: selectedMember,
                memberName: selectedMemberName,
                memberImg: selectedMemberImg
            };
            const isPossible = Issue.isPossibleCreate(title, reqData.tag, content);
            if(isPossible) {
                if(Number.isNaN(issueId)) {
                    issueCreate(reqData, projectId).then(response => {
                        Alert.success("새로운 이슈가 생성되었습니다");
                        const createIssueData: IssueData = {
                            issueId: response.result.issueId,
                            title: reqData.title,
                            content: reqData.content,
                            tag: reqData.tag,
                            endDate: reqData.endDate,
                            memberId: reqData.memberId,
                            memberName: reqData.memberName,
                            memberImg: reqData.memberImg,
                            lifeCycle: "NOT_STARTED",
                            edit: "N",
                        };
                        onSave(createIssueData);
                        onClose();
                    });
                } else {
                    issueEdit(reqData, issueId).then(response => {
                        Alert.success("이슈가 수정되었습니다.");
                        const editIssueData: IssueData = {
                            issueId: issueId,
                            title: reqData.title,
                            content: reqData.content,
                            tag: reqData.tag,
                            endDate: reqData.endDate,
                            memberId: reqData.memberId,
                            memberName: reqData.memberName,
                            memberImg: reqData.memberImg,
                            edit: response.result.position === "L" ? "N" : "Y",
                        }
                        onSave(editIssueData);
                        onClose();
                    });
                }
            }
            setConfirm(false);
        };
       
        return (
       <S.MainContainer>
                <S.TitleSection>
                    {modalType !== "create" && (
                        <S.IssueNumWrapper>
                            <S.IssueNumber># {issueNum}</S.IssueNumber>
                        </S.IssueNumWrapper>
                    )}
                    <S.TtitleWrapper
                        style={{
                            width: modalType === "create" ? "95%" : "88%",
                            marginRight: modalType === "create" ? "0px" : "18px",
                        }}
                    >
                        {modalType === "readOnly" ? (
                            <Title type="issue" title={title} />
                        ) : (
                            <Title type="issue" title={title} setTitle={setTitle} />
                        )}
                    </S.TtitleWrapper>
                </S.TitleSection>

                <S.ContentSection>
                    <S.ContentWrapper>
                        <S.TopContent>
                            <S.TopLeft>
                                <S.TagWrapper>
                                    <div>태그</div>
                                    {modalType === "readOnly" ? (
                                        <S.TagListTitle style={{background: selectedTag?.backgroundStyle, color: "#FFFFFF", fontSize: "12px"}}>
                                            {selectedTag?.label}
                                        </S.TagListTitle>
                                    ) : (
                                        <Dropdown overlay={tagDropdownStyle} placement="bottom" arrow>
                                            <S.TagListTitle style={selectedTag ? {background: selectedTag.backgroundStyle, color: "#FFFFFF", fontSize: "12px"} : {}}>
                                                {selectedTag?.label || "TAG"}
                                            </S.TagListTitle>
                                        </Dropdown>
                                    )}
                                </S.TagWrapper>
                                <S.EndDateWrapper>
                                    <div>마감일</div>
                                    {modalType === "readOnly" ? (
                                        <S.DeployEndDate>
                                            <S.DateContainer>{datePlaceholder}</S.DateContainer>
                                            <Calendar color="#B7B7B7" size={15} />
                                        </S.DeployEndDate>
                                    ) : (
                                        <Space style={{marginLeft: "10px"}} direction="vertical" size={12}>
                                            <DatePicker size={size} onChange={handleDatePickerChange} placeholder={datePlaceholder} />
                                        </Space>
                                    )}
                                </S.EndDateWrapper>
                            </S.TopLeft>
                            <S.TopRight>
                                <S.EditYNWrapper>
                                    <S.EditIconButton style={editIconStyle} />
                                    <div>{editYN}</div>
                                </S.EditYNWrapper>
                            </S.TopRight>
                        </S.TopContent>
                        <S.MiddleContent>
                            <S.DescriptionWrapper>
                                {modalType === "readOnly" ? (
                                    <ContentsMarkDown type="issue" content={content} />    
                                ) : (
                                    <ContentsMarkDown type="issue" content={content} setContent={setContent} />
                                )}
                            </S.DescriptionWrapper>
                            <S.PersonDesWrapper>
                                <S.SearchPersonSection>
                                    <S.SearchPersonTitle>담당자</S.SearchPersonTitle>
                                    <S.SearchContainer>
                                        {modalType === "readOnly" ? (
                                            <S.DeploySearchInput />
                                        ) : (
                                            <S.SearchInput />
                                        )}
                                        <Search size={14} color="#C6C2C2" style={{cursor: "pointer"}} />
                                    </S.SearchContainer>
                                </S.SearchPersonSection>
                                <S.PersonListSection>
                                {memberList && (
                                    <Fragment>
                                    {[
                                        ...memberList.filter((member) => member.memberId === selectedMember),
                                        ...memberList.filter((member) => member.memberId !== selectedMember).sort((a, b) => a.memberId - b.memberId),
                                    ]
                                    .map((member) => (
                                        <S.PersonItem
                                            key={member.memberId}
                                            onClick={
                                                modalType !== "readOnly"
                                                    ? () => handleMemberClick(member.memberId, member.name, member.img)
                                                    : undefined
                                            }
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
                                    </Fragment>)}
                                </S.PersonListSection>
                            </S.PersonDesWrapper>
                        </S.MiddleContent>
                        <S.BottomContent>
                            <S.OpinionTitle>의견</S.OpinionTitle>
                            {opinionList && (
                                <Comments type="issue" id={Number(issueIdRouter)} user={currentUser} opinions={opinionList} />
                            )}
                        </S.BottomContent>
                    </S.ContentWrapper>
                </S.ContentSection>

                <S.ButtonSection>
                    <S.ButtonWrapper>
                        {modalType === "create" && (
                            <ModalButtons type="two" setConfirm={setConfirm} setCancel={setCancel} />
                        )}
                        {modalType === "edit" && (
                            <ModalButtons type="three" setConfirm={setConfirm} setCancel={setCancel} setDelete={setClickDelete} />
                        )}
                        {modalType === "readOnly" && (
                            <ModalButtons type="one" setCancel={setCancel} />
                        )}
                    </S.ButtonWrapper>
                </S.ButtonSection>
            </S.MainContainer>
        );
    }