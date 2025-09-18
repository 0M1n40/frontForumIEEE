

export type RegisterData = {
  name: string;
  email: string;
  // username: string;
  password: string;
}

export type LoginData = {
  email: string;
  password: string;
}

export type UserData = {
    id: string;
    name: string;
    email: string;
    // username: string;
}

export type authContextType = {
  user: UserData | null,
  accessToken: string | null,
  login: (data: LoginData) => Promise<void>,
  logout: () => Promise<void>,
  loading: boolean,
  register: (data: RegisterData) => Promise<void>,
}