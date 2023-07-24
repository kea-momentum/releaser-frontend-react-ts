export type Response<T> = {
  isSuccess: boolean;
  code: boolean;
  message: string;
  result: T;
};
