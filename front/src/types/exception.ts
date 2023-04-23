import {IUser} from "./user";

export interface IException {
  id: number | undefined;
  description: string;
  duration: number | undefined;
  durationType: string | undefined;
  occurrenceDate: Date | undefined;
  user: IUser;
  isResolved: boolean | undefined;
  fileId: string | undefined;
}

