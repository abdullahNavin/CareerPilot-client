export type AppRole = "user" | "mentor" | "admin";

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export type ApiUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
};

export type AuthPayload = {
  accessToken: string;
  refreshToken: string;
  user: ApiUser;
};
