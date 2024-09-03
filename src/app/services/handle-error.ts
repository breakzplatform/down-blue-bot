import { Notification } from "@atproto/api/dist/client/types/app/bsky/notification/listNotifications";
import { ImageGenerationError, NotAReplyError } from "../errors";
import { getReplyData } from "../utils/get-reply-data";
import { createPost } from "./create-post";
import { Post } from "../types";
import { sendMessage } from "../bot/services/send-message";

export const handleError = async (
  error: unknown,
  notification: Notification
) => {
  const reply = (post: Post, text: string) =>
    createPost({
      text: `[Error] ${text}`,
      reply: getReplyData(post),
    });

  console.error("Error caught:");
  console.error(error);

  try {
    switch (true) {
      case error instanceof NotAReplyError:
        await reply(
          error.post,
          `This post is not a reply. Please reply to a post and tag me to get a screenshot of it.`
        );
        break;
      case error instanceof ImageGenerationError:
        await reply(
          error.post,
          `Failed to generate image for this post. Please report this issue. You can find more info in my bio.`
        );
        break;
      default:
        await sendMessage(
          notification.author.did,
          `Hey! An unknown error occurred while generating a screenshot for fulfilling your request.\n\n\n
            Error: ${(error as Error).message}\n\n\n
            Please report this issue. You can find more info in my bio.`
        );
    }
  } catch (error) {
    console.error("Error while handling error:");
    console.error(error);
  }
};
