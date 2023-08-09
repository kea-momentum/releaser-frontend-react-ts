export const RELEASE_TYPE = {
  PM_CREATE: "PM_CREATE",
  PM_EDIT: "PM_EDIT",
  MEM_NOTDEPLOYED: "MEM_NOTDEPLOYED",
  DEPLOYED: "DEPLOYED",
  NOT_DECIDED: "NOT_DECIDED",
};

export const RELEASE_VERSION = {
  MAJOR: "MAJOR",
  MINOR: "MINOR",
  PATCH: "PATCH",
  NOT_YET_CONNECT: "연결 전",
};

export const EXPORT_MENU_LIST = [
  { name: "Y", description: "배포 허가" },
  { name: "N", description: "배포 거부" },
];

export const EXPORT_STATE = {
  APPROVE_EXPORT: "배포 허가",
  DISAPPROVE_EXPORT: "배포 거부",
  EXPECT_EXPORT: "배포 예정",
  EXPORTED: "배포완료",
  ENG_APPROVE_EXPORT: "N",
  ENG_DISAPPROVE_EXPORT: "Y",
};
