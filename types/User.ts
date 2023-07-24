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
