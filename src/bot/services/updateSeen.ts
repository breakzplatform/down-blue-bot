import { getAgent } from "../agent.js";

export const updateSeen = async (seenAt: string) => {
  const agent = await getAgent();

  const response = await agent.app.bsky.notification.updateSeen({
    seenAt,
  });

  return response.success;
};
