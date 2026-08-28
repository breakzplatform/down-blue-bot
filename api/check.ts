// @ts-nocheck
import { getNotifications } from "@/bot/services/get-notifications";
import { getPostThread } from "@/bot/services/get-post-thread";
import { getUnreadNotificationsCount } from "@/bot/services/get-unread-notifications-count";
import { updateSeen } from "@/bot/services/updateSeen";

import { handleError } from "@/services/handle-error";
import { handleRequest } from "@/services/handle-request";
import { Post } from "@/types";
import { validateCronSecret } from "@/utils/validate-cron-secret";

interface Successful {
  notificationURI: string;
  recordURI: string;
}

interface Failed extends Omit<Successful, "recordURI"> {
  error: string;
}

export const config = { runtime: "nodejs" };

export default async (request: Request) => {
  try {
    validateCronSecret(request);
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 401 });
  }

  const { count } = await getUnreadNotificationsCount();

  if (count === 0) {
    console.info("No new notifications");
    return Response.json([]);
  }

  const data = await getNotifications();

  const notifications = data.notifications.filter(
    (n: any) => !n.isRead && n.reason === "mention"
  );

  if (notifications.length === 0) {
    console.info("No new mentions");
    return Response.json([]);
  }

  const success: Successful[] = [];
  const errors: Failed[] = [];

  console.info(`Found ${notifications.length} new mentions`);

  const seenAt = new Date().toISOString();

  for (const notification of notifications) {
    try {
      console.info(`Processing request from @${notification.author.handle}`);

      const thread = await getPostThread(notification.uri);

      const recordURI = await handleRequest(
        thread.parent.post as Post,
        thread.post as Post
      );

      success.push({ notificationURI: notification.uri, recordURI });

      console.info(`Created record for ${notification.uri}: ${recordURI}`);
    } catch (error) {
      errors.push({
        notificationURI: notification.uri,
        error: (error as Error).message,
      });

      console.error(
        `Error processing request from @${notification.author.handle}`
      );
      console.error(error);

      await handleError(error, notification);
    }
  }

  await updateSeen(seenAt);

  return Response.json({ success, errors });
};
