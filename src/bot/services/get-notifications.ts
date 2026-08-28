import { getAgent } from "../agent";

interface GetNotificationsParams {
  cursor?: string;
  limit?: number;
  reasons?: string[];
}

export const getNotifications = async (params: GetNotificationsParams = {}) => {
  const agent = await getAgent();

  const response = await agent.app.bsky.notification.listNotifications(params);

  return response.data;
};
