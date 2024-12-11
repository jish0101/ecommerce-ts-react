export type PayloadUser = {
  _id: string;
  email: string;
  fullName: string;
  isVerified: boolean;
  role: 'ADMIN' | 'USER';
  profileImage: string;
  userType: 'jwt' | 'google';
  accessToken: string;
};

export type User = {
  _id: string;
  userName: string;
  email: string;
  isVerified: boolean;
  role: 'ADMIN' | 'USER';
  createdAt: string;
  updatedAt: string;
  profileImage: string;
  fullName: string;
  userType: 'jwt' | 'google';
};
