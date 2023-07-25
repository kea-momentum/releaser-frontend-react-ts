import { ProfileSetting } from "@/types";

export const beforeVoteProfile = {
  width: "40px",
  height: "40px",
  brightness: 0.8,
  border: "",
};

export const basicProfile = {
  width: "40px",
  height: "40px",
  brightness: 1,
  border: "",
};

export const defaultProfile = {
  width: "40px",
  height: "40px",
  brightness: 1,
  border: "1px solid black",
};

export const approveVoteProfile = {
  width: "33px",
  height: "33px",
  brightness: 1,
  border: "3px solid #438D7F",
};

export const disapproveVoteProfile = {
  width: "33px",
  height: "33px",
  brightness: 1,
  border: "3px solid #B25D5B",
};

export const issueWriterProfile = {
  width: "20px",
  height: "20px",
  brightness: 1,
  border: "",
};

export const PROFILE_TYPE: { [key: string]: ProfileSetting } = {
  Y: approveVoteProfile,
  N: disapproveVoteProfile,
  P: beforeVoteProfile,
};
