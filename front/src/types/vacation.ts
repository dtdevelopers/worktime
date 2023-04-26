export interface IVacation {
  id?: number;
  startDate: Date;
  endDate: Date;
  user: {
    id: number;
    name?: string;
  };
}

