export interface User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  hash?: string;
  id: string;
  dateCreated?: Date | string;
  dateUpdated?: Date | string;
  note?: string;
}

export type ListUser = User[];

export interface UserRegister {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface UserLocalStorage {
  firstName: string;
  lastName: string;
  username: string;
  id: string;
  token: string;
}
