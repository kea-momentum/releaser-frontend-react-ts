import * as S from "./ProjectModal.styled";
import { useEffect, useState } from "react";
import ReleaserLogo from "@/public/images/Releaser.svg";
import { Pencil } from "lucide-react";
import { FiTrash2 } from "react-icons/fi";
import { uploadImage } from "@/util";

interface ProjectListData {
  projectId: number;
  title: string;
  content: string;
  team: string;
  img: string;
}

interface ProjectModalProps {
  onClose: () => void;
  type: string;
  onSave: (project: ProjectListData) => void;
  project: ProjectListData;
}

export default function ProjectModal({
  onClose,
  type,
  onSave,
  project,
}: ProjectModalProps) {
  const [projectData, setProjectData] = useState<ProjectListData>({
    projectId: 0,
    title: "",
    content: "",
    team: "",
    img: "",
  });

  let modalTitle = "프로젝트 생성";
  if (type === "edit") {
    modalTitle = "프로젝트 수정";
  }

  const handleDelImg = () => {
    setProjectData(prevData => ({ ...prevData, img: "" }));
  };

  // const handleChangeImg = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     if(event.target.files && event.target.files[0]) {
  //         const imageFile = event.target.files[0];
  //         const reader = new FileReader();

  //         reader.onloadend = () => {
  //             const imageURL = reader.result as string;
  //             setProjectData((prevData) => ({...prevData, img: imageURL}));
  //         };

  //         reader.readAsDataURL(imageFile);
  //     }
  // };
  const handleChangeImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    uploadImage(event, setProjectData);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProjectData(prevData => ({ ...prevData, [name]: value }));
  };

  const [giveTitleAlert, setGiveTitleAlert] = useState<string>("");
  const [giveTeamAlert, setGiveTeamAlert] = useState<string>("");
  const [giveContentAlert, setGiveContentAlert] = useState<string>("");

  const validateInputField = (
    callback: (
      titleAlert: string,
      teamAlert: string,
      contentAlert: string,
    ) => void,
  ) => {
    let titleAlert = "";
    let teamAlert = "";
    let contentAlert = "";

    if (projectData.title.length < 1 || projectData.title.length > 45) {
      titleAlert = "* 1~45자로 입력해주세요.";
    }
    if (projectData.team.length < 1 || projectData.team.length > 45) {
      teamAlert = "* 1~45자로 입력해주세요.";
    }
    if (projectData.content.length < 1 || projectData.content.length > 100) {
      contentAlert = "* 1~100자로 입력해주세요.";
    }

    setGiveTitleAlert(titleAlert);
    setGiveTeamAlert(teamAlert);
    setGiveContentAlert(contentAlert);

    callback(titleAlert, teamAlert, contentAlert);
  };

  const handleSave = () => {
    setGiveTitleAlert("");
    setGiveTeamAlert("");
    setGiveContentAlert("");

    validateInputField((titleAlert, teamAlert, contentAlert) => {
      if (titleAlert === "" && teamAlert === "" && contentAlert === "") {
        onSave(projectData);
        onClose();
      }
    });
  };

  useEffect(() => {
    if (type === "edit") {
      setProjectData(project);
    } else {
      setProjectData({
        projectId: 0,
        title: "",
        content: "",
        team: "",
        img: "",
      });
    }
  }, [type, project]);
  // useEffect(() => { // TODO: 지울거
  //     console.log(">>> ProjectModal TEST\n", projectData);
  // }, [projectData]);

  return (
    <S.Wrapper>
      <S.ModalTitle>{modalTitle}</S.ModalTitle>
      <S.ModalContent>
        <S.LeftSection>
          <S.ImgContent>
            {projectData.img ? (
              <img src={projectData.img} alt="Project Logo" />
            ) : (
              <ReleaserLogo width="120" height="120" />
            )}
          </S.ImgContent>
          <S.ImgButtonWrapper>
            <S.ImgButtonSection>
              <label htmlFor="uploadImage">
                <Pencil
                  size={16}
                  color="#999696"
                  style={{ cursor: "pointer" }}
                />
                <input
                  id="uploadImage"
                  type="file"
                  accept="image/*"
                  onChange={handleChangeImg}
                  style={{ display: "none" }}
                />
              </label>
            </S.ImgButtonSection>
            <S.VerticalLine />
            <S.ImgButtonSection onClick={handleDelImg}>
              <FiTrash2 size={16} color="#999696" />
            </S.ImgButtonSection>
          </S.ImgButtonWrapper>
        </S.LeftSection>
        <S.RightSection>
          <S.InputTitle>프로젝트 이름</S.InputTitle>
          <S.InputField
            type="text"
            name="title"
            placeholder="프로젝트 이름을 입력하세요"
            value={projectData.title}
            onChange={handleInputChange}
          />
          <S.InputAlert>{giveTitleAlert}</S.InputAlert>
          <S.InputTitle>그룹 이름</S.InputTitle>
          <S.InputField
            type="text"
            name="team"
            placeholder="그룹 이름을 입력하세요"
            value={projectData.team}
            onChange={handleInputChange}
          />
          <S.InputAlert>{giveTeamAlert}</S.InputAlert>
          <S.InputTitle>프로젝트 설명</S.InputTitle>
          <S.InputField
            type="text"
            name="content"
            placeholder="프로젝트 설명을 입력하세요"
            value={projectData.content}
            onChange={handleInputChange}
          />
          <S.InputAlert>{giveContentAlert}</S.InputAlert>
        </S.RightSection>
      </S.ModalContent>

      <S.BtnWrapper>
        <S.BtnContent onClick={onClose}>취소</S.BtnContent>
        <S.BtnContent
          onClick={handleSave}
          style={{ backgroundColor: "#FFCE70", color: "#676767" }}
        >
          저장
        </S.BtnContent>
      </S.BtnWrapper>
    </S.Wrapper>
  );
}
