import {IUser} from "./user";

export interface IEvent {
  id: number | undefined;
  createdDate: Date | undefined;
  type: string | undefined;
  user: IUser;
}

