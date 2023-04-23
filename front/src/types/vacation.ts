import {IUser} from "./user";

export interface IVacation {
  id: number | undefined;
  startDate: Date | undefined;
  endDate: Date | undefined;
  user: IUser;
}

