export interface IUser {
  id?: number;
  name: string;
  email: string;
  document: string;
  phone: string;
  password: string;
  passwordConfirmation?: string;
  birthdate: Date;
  isEmployee: boolean;
  hireDate: Date;
  monthlyWorkload: number
}

