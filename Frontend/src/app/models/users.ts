export interface Users {
  _id?: string;
  fullname: string;
  username: string;
  password: string;
  dateOfBirth: Date;
  address: string;
  email: string;
  phone: string;
  role: string;
  userImage: string;
}

export interface Login {
  username: string;
  password: string;
}

export interface Register {
  fullname: string;
  username: string;
  email: string;
  password: string;
}
