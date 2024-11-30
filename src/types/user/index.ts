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
