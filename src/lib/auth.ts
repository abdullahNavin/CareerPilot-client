import type { User } from "@/schemas/auth";
import type { ApiUser, AppRole } from "@/types/api";

const ROLE_MAP: Record<string, AppRole> = {
  ADMIN: "admin",
  MENTOR: "mentor",
  USER: "user",
  admin: "admin",
  mentor: "mentor",
  user: "user",
};

export function normalizeRole(role: string): AppRole {
  return ROLE_MAP[role] ?? "user";
}

export function normalizeUser(user: ApiUser): User {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    role: normalizeRole(user.role),
  };
}
