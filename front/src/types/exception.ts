export interface IUser {
  id: number | undefined;
  name: string;
  email: string;
  document: string;
  phone: string;
  password: string | undefined;
  passwordConfirmation: string | undefined;
  birthdate: Date | undefined;
  isEmployee?: boolean;
}

