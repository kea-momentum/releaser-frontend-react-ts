import { ProfileSetting } from "@/types";

export const BEFORE_VOTE_PROFILE = {
  width: "40px",
  height: "40px",
  brightness: 0.8,
  border: "",
};

export const BASIC_PROFILE = {
  width: "40px",
  height: "40px",
  brightness: 1,
  border: "",
};

export const EDIT_MODAL_PROFILE = {
  width: "80px",
  height: "80px",
  brightness: 1,
  border: "",
};

export const DEFAULT_PROFILE = {
  width: "40px",
  height: "40px",
  brightness: 1,
  border: "1px solid black",
};

export const APPROVE_VOTE_PROFILE = {
  width: "33px",
  height: "33px",
  brightness: 1,
  border: "3px solid #438D7F",
};

export const DISAPPROVE_VOTE_PROFILE = {
  width: "33px",
  height: "33px",
  brightness: 1,
  border: "3px solid #B25D5B",
};

export const ISSUE_WRITER_PROFILE = {
  width: "20px",
  height: "20px",
  brightness: 1,
  border: "",
};

export const COMMENTS_WRITER_PROFILE = {
  width: "25px",
  height: "25px",
  brightness: 1,
  border: "",
};
export const PROFILE_TYPE: { [key: string]: ProfileSetting } = {
  Y: APPROVE_VOTE_PROFILE,
  N: DISAPPROVE_VOTE_PROFILE,
  P: BEFORE_VOTE_PROFILE,
};
