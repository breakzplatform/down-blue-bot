import type { AppBskyNotificationListNotifications } from "@atproto/api";
import { getReplyData } from "../utils/get-reply-data.js";
import { createPost } from "./create-post.js";
import { Post, Record } from "../types.js";
import { sendMessage } from "../bot/services/send-message.js";
import { resolveLanguage, t } from "../dictionary/translate.js";
import { NotAReplyError, PostUnavailableError } from "../errors.js";
import { responses } from "../dictionary/responses.js";

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
