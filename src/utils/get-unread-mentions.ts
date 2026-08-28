import type { AppBskyNotificationListNotifications } from "@atproto/api";
import { getNotifications } from "../bot/services/get-notifications.js";

const PAGE_SIZE = 100;
const MAX_PAGES = 10;

// listNotifications returns the newest notifications first, so the first page
// that still holds read entries marks the end of the unread backlog.
export const getUnreadMentions = async () => {
  const mentions: AppBskyNotificationListNotifications.Notification[] = [];

  let cursor: string | undefined;

  for (let page = 0; page < MAX_PAGES; page++) {
    const data = await getNotifications({
      cursor,
      limit: PAGE_SIZE,
      reasons: ["mention"],
    });

    const unread = data.notifications.filter(
      (notification) => !notification.isRead
    );

    // The reasons parameter is a server-side hint; keep filtering locally so a
    // server that ignores it cannot make the bot answer likes and follows.
    mentions.push(
      ...unread.filter((notification) => notification.reason === "mention")
    );

    if (
      unread.length < data.notifications.length ||
      data.notifications.length === 0 ||
      !data.cursor
    ) {
      return mentions;
    }

    cursor = data.cursor;
  }

  console.warn(
    `Stopped after ${MAX_PAGES} pages; older unread mentions were left behind`
  );

  return mentions;
};
