export interface LoginDataRequest {
  phoneNumber: string;
  password: string;
  deviceId: string;
  isRemembered: boolean;
}

export interface RoleLogin {
  id: number;
  roleCode: string;
  roleName: string;
  description: string;
  createdAt: string;
}

export interface UserLogin {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  status: "ACTIVE" | "INACTIVE";
  dateOfBirth: string;
  address: string;
  gender: "MALE" | "FEMALE";
  role: RoleLogin;
  avatar: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserLogin;
}
