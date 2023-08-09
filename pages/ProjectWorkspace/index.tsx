import * as S from "./ProjectWorkspace.styled";
import React, { Fragment, useEffect, useState } from "react";
import ProjectForm from "@/components/ProjectForm";
import NavBar from "@/components/NavBar";
import AddButton from "@/components/AddButton";
import ProjectModal from "@/components/ProjectModal";
import axios from "axios";
import Modal from "react-modal";
import EmptyCreateList from "@/public/images/EmptyCreateList.svg";
import EmptyEnterList from "@/public/images/EmptyEnterList.svg";
import { useRouter } from "next/router";
import {
  projectCreateRequest,
  projectEditRequest,
  projectRequest,
} from "@/api/project";
import { MODAL_STYLE } from "@/constants";

interface ProjectListData {
  projectId: number;
  title: string;
  content: string;
  team: string;
  img: string;
}

interface ProjectListResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: {
    getCreateProjectList: ProjectListData[];
    getEnterProjectList: ProjectListData[];
  };
}

export default function ProjectWorkspace() {
  useEffect(() => {
    Modal.setAppElement("#__next");
  }, []);

  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [createProjectList, setCreateProjectList] = useState<ProjectListData[]>(
    [],
  );
  const [enterProjectList, setEnterProjectList] = useState<ProjectListData[]>(
    [],
  );

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    projectRequest().then(response => {
      setCreateProjectList(response.result.getCreateProjectList);
      setEnterProjectList(response.result.getEnterProjectList);
    });
  }, []);

  const handleCreateProject = (project: ProjectListData) => {
    const requestData = {
      title: project.title,
      content: project.content,
      team: project.team,
      img: project.img ? project.img : "",
    };
    console.log(">>> Create Project REQ\n", requestData);

    projectCreateRequest(requestData).then(response => {
      if (response.isSuccess) {
        const projectId = response.result.projectId;
        const updatedProject = { ...project, projectId };
        const updatedCreateProjectList = [updatedProject, ...createProjectList];

        setCreateProjectList(updatedCreateProjectList);
      }
    });
  };

  const handleEditProject = (project: ProjectListData) => {
    const requestData = {
      title: project.title,
      content: project.content,
      team: project.team,
      img: project.img ? project.img : "",
    };
    console.log(">>> Edit Project REQ\n", requestData);
    console.log(">>> ProjectWorkspace TEST\n", project);

    projectEditRequest(requestData, project.projectId).then(response => {
      if (response.isSuccess) {
        const updatedProjectList = createProjectList.map(item => {
          if (item.projectId === project.projectId) {
            return project;
          }
          return item;
        });
        setCreateProjectList(updatedProjectList);
      }
    });

    // axios // FIXME: API 토큰 사용하는 걸로 변경
    //   .patch(
    //     `${process.env.NEXT_PUBLIC_API_URL}/projects/${project.projectId}`,
    //     requestData,
    //   )
    //   .then(response => {
    //     if (response.data.isSuccess) {
    //       const updatedCreateProjectList = createProjectList.map(item => {
    //         if (item.projectId === project.projectId) {
    //           return project;
    //         }
    //         return item;
    //       });
    //       setCreateProjectList(updatedCreateProjectList);
    //     }
    //   });
  };

  const handleDeleteProject = (projectId: number) => {
    const updatedCreateProjectList = createProjectList.filter(
      item => item.projectId !== projectId,
    );
    setCreateProjectList(updatedCreateProjectList);
  };

  const handleGetoutProject = (projectId: number) => {
    const updatedEnterProjectList = enterProjectList.filter(
      item => item.projectId !== projectId,
    );
    setEnterProjectList(updatedEnterProjectList);
  };

  return (
    <Fragment>
      <NavBar page="projects" />
      <S.MainContainer>
        <S.OuterSection>
          <S.LeftContent>
            <S.TitleSection>
              <S.TitleWrapper>
                <S.ContentTitle>생성한 프로젝트</S.ContentTitle>
                <AddButton onClick={openModal} type="project" />
                <S.ProjectModal
                  isOpen={isModalOpen}
                  onRequestClose={closeModal}
                  style={MODAL_STYLE}
                >
                  <ProjectModal
                    onClose={closeModal}
                    type="new"
                    onSave={handleCreateProject}
                  />{" "}
                  {/* FIXME: props로 project 전달해야해 ..? */}
                </S.ProjectModal>
              </S.TitleWrapper>
            </S.TitleSection>
            <S.ProjectListSection>
              <S.ProjectListContainer>
                <S.ProjectListInnerContainer>
                  <S.ProjectListWrapper>
                    {createProjectList.length === 0 ? (
                      <S.EmptpyContainer>
                        <EmptyCreateList />
                        <S.EmptyComment>
                          There is no project here.
                        </S.EmptyComment>
                      </S.EmptpyContainer>
                    ) : (
                      createProjectList
                        .sort((a, b) => b.projectId - a.projectId)
                        .map(project => (
                          <S.ProjectFormContainer
                            key={project.projectId}
                            onDoubleClick={() => {
                              router.push(`/Releases/${project.projectId}`);
                            }}
                          >
                            <ProjectForm
                              key={project.projectId}
                              type="make"
                              project={project}
                              onEdit={handleEditProject}
                              onDelete={handleDeleteProject}
                            />
                          </S.ProjectFormContainer>
                        ))
                    )}
                  </S.ProjectListWrapper>
                </S.ProjectListInnerContainer>
              </S.ProjectListContainer>
            </S.ProjectListSection>
          </S.LeftContent>

          <S.RightContent>
            <S.TitleSection>
              <S.TitleWrapper>
                <S.ContentTitle>참가한 프로젝트</S.ContentTitle>
              </S.TitleWrapper>
            </S.TitleSection>
            <S.ProjectListSection>
              <S.ProjectListContainer>
                <S.ProjectListInnerContainer>
                  <S.ProjectListWrapper>
                    {enterProjectList.length === 0 ? (
                      <S.EmptpyContainer>
                        <EmptyEnterList />
                        <S.EmptyComment>
                          There is no project here.
                        </S.EmptyComment>
                      </S.EmptpyContainer>
                    ) : (
                      enterProjectList
                        .sort((a, b) => b.projectId - a.projectId)
                        .map(project => (
                          <S.ProjectFormContainer
                            key={project.projectId}
                            onDoubleClick={() => {
                              router.push(`/Releases/${project.projectId}`);
                            }}
                          >
                            <ProjectForm
                              key={project.projectId}
                              type="join"
                              project={project}
                              onEdit={handleEditProject}
                              onDelete={handleGetoutProject}
                            />
                          </S.ProjectFormContainer>
                        ))
                    )}
                  </S.ProjectListWrapper>
                </S.ProjectListInnerContainer>
              </S.ProjectListContainer>
            </S.ProjectListSection>
          </S.RightContent>
        </S.OuterSection>
      </S.MainContainer>
    </Fragment>
  );
}
