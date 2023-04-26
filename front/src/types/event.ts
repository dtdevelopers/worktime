export interface IEvent {
  id: number | undefined;
  createdDate: Date | undefined;
  type: string | undefined;
  user: {
    id: number
    name?: string
  };
}

