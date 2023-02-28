export interface User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  hash: string;
  id: number | string;
  dateCreated: Date | string;
  dateUpdated: Date | string;
}

export type ListUser = User[];
