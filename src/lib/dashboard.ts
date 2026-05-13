import { normalizeRole } from "@/lib/auth";
import { api } from "@/services/api";
import type { ApiResponse, AppRole } from "@/types/api";

export type UserProfile = {
  education: unknown;
  skills: string[];
  experience: unknown;
  github?: string | null;
  linkedin?: string | null;
  portfolio?: string | null;
};

export type CurrentUser = {
  id: string;
  name: string;
  email: string;
  role: AppRole;
  avatar?: string;
  bio?: string | null;
  profile?: UserProfile | null;
  createdAt?: string;
  updatedAt?: string;
};

export type JobStatus = "APPLIED" | "INTERVIEW" | "OFFER" | "REJECTED";

export type JobApplication = {
  id: string;
  companyName: string;
  role: string;
  status: JobStatus;
  appliedDate: string;
  notes?: string | null;
  updatedAt: string;
};

export type JobStats = {
  APPLIED: number;
  INTERVIEW: number;
  OFFER: number;
  REJECTED: number;
  total: number;
};

export type AIResultType = "RESUME" | "ROADMAP" | "INTERVIEW" | "SKILL_GAP" | "COVER_LETTER";

export type AIResultPayload = {
  summary?: string;
  details?: string[];
  recommendations?: string[];
};

export type AIResultRecord = {
  id: string;
  type: AIResultType;
  prompt: string;
  response: AIResultPayload;
  createdAt: string;
};

export type AdminStats = {
  totalUsers: number;
  totalCareers: number;
  totalBlogs: number;
  totalJobs: number;
  totalAIRequests: number;
  usersByRole: Array<{ role: string; count: number }>;
};

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: AppRole;
  avatar?: string;
  createdAt: string;
};

type BackendCurrentUser = Omit<CurrentUser, "role"> & { role: string };
type BackendAdminUser = Omit<AdminUser, "role"> & { role: string };

function normalizeCurrentUser(user: BackendCurrentUser): CurrentUser {
  return {
    ...user,
    role: normalizeRole(user.role),
  };
}

function normalizeAdminUser(user: BackendAdminUser): AdminUser {
  return {
    ...user,
    role: normalizeRole(user.role),
  };
}

function normalizeAiResult(record: {
  id: string;
  type: AIResultType;
  prompt: string;
  response: unknown;
  createdAt: string;
}): AIResultRecord {
  const response = typeof record.response === "object" && record.response !== null
    ? record.response as AIResultPayload
    : {};

  return {
    ...record,
    response,
  };
}

export async function fetchCurrentUser() {
  const response = await api.get<ApiResponse<BackendCurrentUser>>("/auth/me");
  return normalizeCurrentUser(response.data.data);
}

export async function updateCurrentUser(id: string, payload: {
  name: string;
  bio?: string;
  skills?: string[];
  github?: string;
  linkedin?: string;
  portfolio?: string;
}) {
  const response = await api.patch<ApiResponse<BackendCurrentUser>>(`/users/${id}`, payload);
  return normalizeCurrentUser(response.data.data);
}

export async function fetchJobApplications() {
  const response = await api.get<ApiResponse<JobApplication[]>>("/job-tracker");
  return response.data.data;
}

export async function createJobApplication(payload: {
  companyName: string;
  role: string;
  status?: JobStatus;
  appliedDate: string;
  notes?: string;
}) {
  const response = await api.post<ApiResponse<JobApplication>>("/job-tracker", payload);
  return response.data.data;
}

export async function fetchJobStats() {
  const response = await api.get<ApiResponse<JobStats>>("/job-tracker/stats");
  return response.data.data;
}

export async function fetchAiResults() {
  const response = await api.get<ApiResponse<Array<{
    id: string;
    type: AIResultType;
    prompt: string;
    response: unknown;
    createdAt: string;
  }>>>("/ai/results");

  return response.data.data.map(normalizeAiResult);
}

export async function requestResumeAnalysis(prompt: string) {
  const response = await api.post<ApiResponse<AIResultPayload>>("/ai/resume-analysis", { prompt });
  return response.data.data;
}

export async function requestCareerRoadmap(prompt: string) {
  const response = await api.post<ApiResponse<AIResultPayload>>("/ai/career-roadmap", { prompt });
  return response.data.data;
}

export async function requestInterviewReply(prompt: string) {
  const response = await api.post<ApiResponse<AIResultPayload>>("/ai/interview-chat", { prompt });
  return response.data.data;
}

export async function requestSkillGapAnalysis(prompt: string) {
  const response = await api.post<ApiResponse<AIResultPayload>>("/ai/skill-gap-analysis", { prompt });
  return response.data.data;
}

export async function fetchAdminStats() {
  const response = await api.get<ApiResponse<AdminStats>>("/admin/stats");
  return response.data.data;
}

export async function fetchAdminUsers(params?: { page?: number; limit?: number; role?: string; search?: string }) {
  const response = await api.get<ApiResponse<BackendAdminUser[]>>("/admin/users", { params });
  return {
    data: response.data.data.map(normalizeAdminUser),
    pagination: response.data.pagination,
  };
}

export function formatDateLabel(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function formatRelativeTime(value: string) {
  const timestamp = new Date(value).getTime();
  const diffMs = Date.now() - timestamp;
  const diffHours = Math.max(1, Math.floor(diffMs / (1000 * 60 * 60)));

  if (diffHours < 24) {
    return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  }

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) {
    return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  }

  return formatDateLabel(value);
}
