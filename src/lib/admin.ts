import { normalizeRole } from "@/lib/auth";
import { api } from "@/services/api";
import type { ApiResponse, AppRole } from "@/types/api";

export type UserStatus = "ACTIVE" | "SUSPENDED" | "PENDING";
export type MentorStatus = "NONE" | "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";
export type NotificationType = "PLATFORM_UPDATE" | "AI_USAGE_ALERT" | "SECURITY_ALERT" | "ADMIN_ANNOUNCEMENT";
export type NotificationTarget = "ALL" | "USER" | "MENTOR" | "ADMIN";
export type SupportStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
export type SupportPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";
export type ModerationStatus = "OPEN" | "REVIEWED" | "RESOLVED" | "DISMISSED";
export type SecuritySeverity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type AdminOverviewStats = {
  totalUsers: number;
  totalMentors: number;
  activeUsers: number;
  totalCareers: number;
  totalBlogs: number;
  totalJobs: number;
  totalAIRequests: number;
  resumeAnalyses: number;
  interviewSessions: number;
  growthRate: number;
  usersByRole: Array<{ role: string; count: number }>;
};

export type AdminOverview = {
  stats: AdminOverviewStats;
  charts: {
    userGrowth: Array<{ date: string; users: number }>;
    aiUsageTrend: Array<{ date: string; requests: number }>;
    dailyActiveUsers: Array<{ date: string; activeUsers: number }>;
    careerCategoryPopularity: Array<{ category: string; count: number }>;
  };
};

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: AppRole;
  status: UserStatus;
  mentorStatus: MentorStatus;
  permissions: string[];
  avatar?: string | null;
  bio?: string | null;
  createdAt: string;
  lastActiveAt: string;
  suspendedAt?: string | null;
  profile?: {
    skills?: string[];
    github?: string | null;
    linkedin?: string | null;
    portfolio?: string | null;
  } | null;
};

type BackendAdminUser = Omit<AdminUser, "role"> & { role: string };

export type AdminUserDetail = AdminUser & {
  jobApplications: Array<{
    id: string;
    companyName: string;
    role: string;
    status: string;
    appliedDate: string;
    updatedAt: string;
  }>;
  aiResults: Array<{
    id: string;
    type: string;
    prompt: string;
    createdAt: string;
  }>;
  notifications: Array<{
    id: string;
    title: string;
    message: string;
    createdAt: string;
    isRead: boolean;
  }>;
};

export type MentorRow = AdminUser & {
  performance: {
    sessions: number;
    aiAssistUsage: number;
  };
};

export type MentorListResponse = {
  metrics: {
    totalMentors: number;
    pendingApprovals: number;
    activeMentors: number;
  };
  data: MentorRow[];
  pagination: Pagination;
};

export type CareerAdminRecord = {
  id: string;
  title: string;
  description: string;
  category: string;
  salaryRange: string;
  location: string;
  rating: number;
  demandLevel: "LOW" | "MEDIUM" | "HIGH";
  createdAt: string;
  reviews: Array<{ id: string }>;
};

export type BlogAdminRecord = {
  id: string;
  title: string;
  slug: string;
  content: string;
  thumbnail?: string | null;
  tags: string[];
  category: string;
  published: boolean;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export type AIUsageSummary = {
  totalRequests: number;
  failedRequests: number;
  totalTokens: number;
  estimatedCost: number;
  mostUsedTool: string;
};

export type AIUsageAnalytics = {
  summary: AIUsageSummary;
  charts: {
    dailyUsage: Array<{ date: string; requests: number; tokens: number; cost: number; failures: number }>;
    toolUsage: Array<{ feature: string; count: number }>;
    costAnalytics: Array<{ date: string; cost: number }>;
  };
  recent: Array<{
    id: string;
    feature: string;
    tokensUsed: number;
    responseTime: number;
    success: boolean;
    createdAt: string;
    user?: { name: string; email: string } | null;
  }>;
  pagination?: Pagination;
};

export type ModerationReport = {
  id: string;
  reason: string;
  description?: string | null;
  status: ModerationStatus;
  createdAt: string;
  reporter?: { id: string; name: string; email: string } | null;
  targetUser?: { id: string; name: string; email: string } | null;
  targetBlog?: { id: string; title: string; slug: string } | null;
};

export type NotificationRecord = {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  roleTarget: NotificationTarget;
  isRead: boolean;
  createdAt: string;
};

export type SupportTicket = {
  id: string;
  subject: string;
  message: string;
  status: SupportStatus;
  priority: SupportPriority;
  createdAt: string;
  updatedAt: string;
  user?: { id: string; name: string; email: string } | null;
  assignedTo?: { id: string; name: string; email: string } | null;
};

export type SecurityEvent = {
  id: string;
  type: string;
  severity: SecuritySeverity;
  message: string;
  ipAddress?: string | null;
  createdAt: string;
  user?: { id: string; name: string; email: string } | null;
};

export type RolePermissions = {
  defaults: Record<string, string[]>;
  admins: Array<{
    id: string;
    name: string;
    email: string;
    role: AppRole;
    permissions: string[];
    status: UserStatus;
  }>;
};

export type PlatformMetrics = {
  cards: {
    apiResponseTime: number;
    queueBacklog: number;
    redisHealthy: boolean;
    serverUptime: number;
    errorRate: number;
    activeSessions: number;
    databaseHealthy: boolean;
    errorsLastDay: number;
    checkedAt: string;
  };
  charts: Array<{ date: string; apiResponseTime: number; errorRate: number }>;
};

export type Pagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  metrics?: {
    totalMentors: number;
    pendingApprovals: number;
    activeMentors: number;
  };
  summary?: {
    open: number;
    resolved: number;
    total: number;
  };
};

function normalizeAdminUser(user: BackendAdminUser): AdminUser {
  return {
    ...user,
    role: normalizeRole(user.role),
  };
}

function withPagination<T>(response: { data: { data: T; pagination?: Pagination } }) {
  return {
    data: response.data.data,
    pagination: response.data.pagination,
  };
}

export async function fetchAdminOverview() {
  const response = await api.get<ApiResponse<AdminOverview>>("/admin/overview");
  return response.data.data;
}

export async function fetchAdminUsers(params?: Record<string, string | number | undefined>) {
  const response = await api.get<ApiResponse<BackendAdminUser[]>>("/admin/users", { params });
  return {
    data: response.data.data.map(normalizeAdminUser),
    pagination: response.data.pagination,
  };
}

export async function fetchAdminUser(id: string) {
  const response = await api.get<ApiResponse<Omit<AdminUserDetail, "role"> & { role: string }>>(`/admin/users/${id}`);
  const data = response.data.data;
  return {
    ...data,
    role: normalizeRole(data.role),
  } as AdminUserDetail;
}

export async function updateAdminUser(id: string, payload: Partial<Pick<AdminUser, "name" | "email" | "status" | "mentorStatus" | "permissions">>) {
  const response = await api.patch<ApiResponse<BackendAdminUser>>(`/admin/users/${id}`, payload);
  return normalizeAdminUser(response.data.data);
}

export async function changeAdminUserRole(id: string, role: "GUEST" | "USER" | "MENTOR" | "ADMIN") {
  const response = await api.patch<ApiResponse<BackendAdminUser>>(`/admin/users/${id}/role`, { role });
  return normalizeAdminUser(response.data.data);
}

export async function suspendAdminUser(id: string, suspended: boolean) {
  const response = await api.patch<ApiResponse<BackendAdminUser>>(`/admin/users/${id}/suspend`, { suspended });
  return normalizeAdminUser(response.data.data);
}

export async function deleteAdminUser(id: string) {
  await api.delete(`/admin/users/${id}`);
}

export async function fetchMentors(params?: Record<string, string | number | undefined>) {
  const response = await api.get<ApiResponse<Array<Omit<MentorRow, "role"> & { role: string }>>>("/admin/mentors", { params });
  const pagination = response.data.pagination as Pagination | undefined;
  return {
    data: response.data.data.map((mentor) => ({ ...mentor, role: normalizeRole(mentor.role) })) as MentorRow[],
    pagination,
    metrics: pagination?.metrics,
  };
}

export async function updateMentor(id: string, payload: { mentorStatus: Exclude<MentorStatus, "NONE">; permissions?: string[]; status?: UserStatus }) {
  const response = await api.patch<ApiResponse<Omit<MentorRow, "role" | "performance"> & { role: string }>>(`/admin/mentors/${id}`, payload);
  return {
    ...response.data.data,
    role: normalizeRole(response.data.data.role),
  };
}

export async function fetchAdminCareers(params?: Record<string, string | number | undefined>) {
  const response = await api.get<ApiResponse<CareerAdminRecord[]>>("/admin/careers", { params });
  return withPagination(response);
}

export async function createCareer(payload: Omit<CareerAdminRecord, "id" | "createdAt" | "rating" | "reviews">) {
  const response = await api.post<ApiResponse<CareerAdminRecord>>("/careers", payload);
  return response.data.data;
}

export async function updateCareer(id: string, payload: Partial<Omit<CareerAdminRecord, "id" | "createdAt" | "rating" | "reviews">>) {
  const response = await api.patch<ApiResponse<CareerAdminRecord>>(`/careers/${id}`, payload);
  return response.data.data;
}

export async function deleteCareer(id: string) {
  await api.delete(`/careers/${id}`);
}

export async function fetchAdminBlogs(params?: Record<string, string | number | boolean | undefined>) {
  const response = await api.get<ApiResponse<BlogAdminRecord[]>>("/admin/blogs", { params });
  return withPagination(response);
}

export async function createBlog(payload: {
  title: string;
  slug?: string;
  content: string;
  thumbnail?: string;
  category: string;
  tags?: string[];
  published?: boolean;
}) {
  const response = await api.post<ApiResponse<BlogAdminRecord>>("/blogs", payload);
  return response.data.data;
}

export async function updateBlog(id: string, payload: Partial<{
  title: string;
  slug: string;
  content: string;
  thumbnail: string;
  category: string;
  tags: string[];
  published: boolean;
}>) {
  const response = await api.patch<ApiResponse<BlogAdminRecord>>(`/blogs/${id}`, payload);
  return response.data.data;
}

export async function deleteBlog(id: string) {
  await api.delete(`/blogs/${id}`);
}

export async function fetchAIAnalytics() {
  const response = await api.get<ApiResponse<AIUsageAnalytics>>("/admin/ai-usage");
  return response.data.data;
}

export async function fetchReports(params?: Record<string, string | number | undefined>) {
  const response = await api.get<ApiResponse<ModerationReport[]>>("/admin/reports", { params });
  const pagination = response.data.pagination as Pagination | undefined;
  return {
    data: response.data.data,
    pagination,
  };
}

export async function resolveReport(id: string, status: Exclude<ModerationStatus, "OPEN">) {
  const response = await api.patch<ApiResponse<ModerationReport>>(`/admin/reports/${id}`, { status });
  return response.data.data;
}

export async function fetchAdminNotifications() {
  const response = await api.get<ApiResponse<{ unread: number; recent: NotificationRecord[] }>>("/admin/notifications");
  return response.data.data;
}

export async function sendAnnouncement(payload: {
  title: string;
  message: string;
  type: NotificationType;
  roleTarget: NotificationTarget;
}) {
  const response = await api.post<ApiResponse<{ created: number }>>("/admin/notifications", payload);
  return response.data.data;
}

export async function fetchPlatformMetrics() {
  const response = await api.get<ApiResponse<PlatformMetrics>>("/admin/metrics");
  return response.data.data;
}

export async function fetchSupportTickets(params?: Record<string, string | number | undefined>) {
  const response = await api.get<ApiResponse<SupportTicket[]>>("/admin/support", { params });
  return withPagination(response);
}

export async function updateSupportTicket(id: string, payload: Partial<Pick<SupportTicket, "status" | "priority">> & { assignedToId?: string | null }) {
  const response = await api.patch<ApiResponse<SupportTicket>>(`/admin/support/${id}`, payload);
  return response.data.data;
}

export async function fetchSecurityEvents(params?: Record<string, string | number | undefined>) {
  const response = await api.get<ApiResponse<SecurityEvent[]>>("/admin/security", { params });
  return withPagination(response);
}

export async function fetchRolePermissions() {
  const response = await api.get<ApiResponse<{ defaults: Record<string, string[]>; admins: Array<{ id: string; name: string; email: string; role: string; permissions: string[]; status: UserStatus }> }>>("/admin/roles");
  return {
    defaults: response.data.data.defaults,
    admins: response.data.data.admins.map((admin) => ({ ...admin, role: normalizeRole(admin.role) })),
  } as RolePermissions;
}
