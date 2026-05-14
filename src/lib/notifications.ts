import { api } from "@/services/api";
import type { ApiResponse } from "@/types/api";

export type UserNotification = {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

export async function fetchUserNotifications() {
  const response = await api.get<ApiResponse<UserNotification[]>>("/notifications");
  return response.data.data ?? [];
}

export async function markNotificationRead(id: string) {
  await api.patch(`/notifications/${id}/read`);
}

export async function markAllNotificationsRead() {
  await api.patch("/notifications/read-all");
}
