import * as S from "./ProjectForm.styled";
import React, {useState} from "react";
import {FiTrash} from "react-icons/fi";
import {Pencil} from 'lucide-react';
import ReleaserLogo from "@/public/images/Releaser.svg";
import ProjectModal from "../ProjectModal";
import Swal from "sweetalert2";
import axios from "axios";
import { Alert } from "@/util/Alert";

interface ProjectData {
    projectId: number;
    title: string;
    content: string;
    team: string;
    img: string;
}

interface ProjectFormProps {
    type: string;
    project: ProjectData;
    onEdit: (project: ProjectData) => void;
    onDelete: (projectId: number) => void;
}

export default function ProjectForm({type, project, onEdit, onDelete}: ProjectFormProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
        
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleDelete = () => {
        Alert.confirmDelete(
            "정말로 프로젝트를 삭제하시겠습니까?",
            "이 프로젝트와 관련한 모든 정보가 삭제됩니다.",
            `${process.env.NEXT_PUBLIC_API_URL}/projects/${project.projectId}`,
            "프로젝트가 삭제되었습니다.",
            "",
            onDelete,
            project.projectId,
            "프로젝트 삭제 실패"
        );
    };

    const handleGetout = () => {
        Alert.confirmDelete(
            "정말로 프로젝트에서 나가시겠습니까?",
            "PM이 초대하기 전까지 프로젝트에 다시 참여하실 수 없습니다.",
            `${process.env.NEXT_PUBLIC_API_URL}/members/1/project/${project.projectId}/withdraw`,
            "프로젝트에서 나가셨습니다.",
            "",
            onDelete,
            project.projectId,
            "프로젝트 탈퇴 실패"
        );
    };

    const handleEditProject = (project: ProjectData) => {
        onEdit(project);
    };

    const truncateString = (str: string, maxLenth: number) => {
        if(str.length <= maxLenth) {
            return str;
        }
        return str.substring(0, maxLenth) + " ...";
    };

    const truncatedTitle = truncateString(project.title, 18);
    const truncatedTeam = truncateString(project.team, 40);
    const truncatedContent = truncateString(project.content, 32);

    return (
        <S.Wrapper>
            <S.ImgSection>
                <S.ImgWrapper>
                    {project.img ? (
                        <img src={project.img} alt="Project Logo" />
                    ) : (
                        <ReleaserLogo />
                    )}
                </S.ImgWrapper>
            </S.ImgSection>
            <S.InfoContent>
                <S.Info>{truncatedTitle}</S.Info>
                <S.Info style={{fontSize: "12px", letterSpacing: "-0.24px"}}>{truncatedTeam}</S.Info>
                <S.Info style={{fontSize: "15px", letterSpacing: "-0.3px", marginBottom: "0px"}}>{truncatedContent}</S.Info>
            </S.InfoContent>
            <S.VerticalLine />

            <S.IconWrapper>
                {type === "join" ? (
                    <FiTrash onClick={handleGetout} size={24} color="#747474" style={{marginLeft: "30px", cursor: "pointer"}} />
                ) : (
                    <div style={{display: "flex", flexDirection: "column", marginLeft: "30px"}}>
                        <Pencil onClick={openModal} color="#747474" style={{marginBottom: "14px", cursor: "pointer"}} />
                        <S.HorizontalLine />
                        <FiTrash onClick={handleDelete} size={24} color="#747474" style={{marginTop: "14px", cursor: "pointer"}} />
                    </div>
                )}
            </S.IconWrapper>

            {isModalOpen && (
                <S.ProjectModal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    style={{
                        overlay: {
                        backgroundColor: "rgba(91, 91, 91, 0.75)",
                        }
                    }}
                >
                    <ProjectModal onSave={handleEditProject} onClose={closeModal} type="edit" project={project} />
                </S.ProjectModal>
            )}
            
        </S.Wrapper>
    );
}