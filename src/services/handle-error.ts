import type { AppBskyNotificationListNotifications } from "@atproto/api";
import { getReplyData } from "../utils/get-reply-data";
import { createPost } from "./create-post";
import { Post, Record } from "../types";
import { sendMessage } from "../bot/services/send-message";
import { resolveLanguage, t } from "../dictionary/translate";
import { NotAReplyError, PostUnavailableError } from "../errors";
import { responses } from "../dictionary/responses";

export const handleError = async (
  error: unknown,
  notification: AppBskyNotificationListNotifications.Notification
) => {
  const reply = (post: Post, key: keyof typeof responses) => {
    const language = resolveLanguage(post.record.langs);

    return createPost({
      text: `[Error] ${t(key, [language])}`,
      langs: [language],
      reply: getReplyData(post),
    });
  };

  console.error("Error caught:");
  console.error(error);

  try {
    if (error instanceof NotAReplyError) {
      await reply(error.post, "error.notAReply");
      return;
    }

    if (error instanceof PostUnavailableError) {
      await reply(error.post, "error.postUnavailable");
      return;
    }

    await sendMessage(
      notification.author.did,
      t("error.unknown", (notification.record as Record).langs, {
        error: (error as Error).message,
      })
    );
  } catch (error) {
    console.error("Error while handling error:");
    console.error(error);
  }
};
