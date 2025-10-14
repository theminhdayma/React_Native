export interface UserLogin {
  phoneNumber: string;
  password: string;
  deviceId: string;
  isRemembered: boolean;
}

export interface LoginReponse {
  data: {
    accessToken: string;
    refreshToken: string;
    user: {
      firstName: string;
      lastName: string;
      phoneNumber: string;
      email: string;
      status: string;
      dateOfBirth: string;
      address: null;
      gender: string;
      role: {
        id: 2;
        roleCode: string;
        roleName: string;
        description: string;
        createdAt: string;
      };
      avatar: string;
    };
  };
  message: "Đăng nhập thành công";
  statusCode: 200;
}
