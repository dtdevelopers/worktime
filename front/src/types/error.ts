export type ErrorResponse = {
  message: string;
};

export interface IError {
  id?: number;
  error: string;
  route: string;
  userId: number;
  userLogin: string | undefined;
  createdDate?: Date | string | undefined;
}
