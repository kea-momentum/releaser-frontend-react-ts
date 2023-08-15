export type LoginResponse = {
  grantType: string;
  accessToken: string;
  refreshToken: string;
};

export type SignUpResponse = {
  userId: number;
  name: string;
  email: string;
};

export type UserType = {
  memberId: number;
  position: string;
};

export type UserProfileType = {
  image: string;
  name: string;
  userId: number;
};
