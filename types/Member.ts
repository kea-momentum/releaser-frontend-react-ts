export type MemberType = {
  deleteYN: string;
  img: string;
  link: string;
  memberId: number;
  name: string;
  position: string;
  userId: number;
};

export type GetProjectMembersResponseType = {
  link: string;
  memberList: MemberType[];
};

export type AddProjectMemberResponseType = {
  projectId: number;
  projectName: string;
};
