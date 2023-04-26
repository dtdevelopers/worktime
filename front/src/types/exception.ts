export interface IException {
  id?: number | undefined;
  description: string;
  duration: number | undefined;
  durationType: string | undefined;
  occurrenceDate: Date | undefined;
  user: {
    id: number;
    name?: string;
  };
  isResolved: boolean | undefined;
  fileId: string | undefined;
}

