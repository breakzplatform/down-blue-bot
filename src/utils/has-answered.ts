import { AppBskyFeedDefs } from "@atproto/api";

// The bot is the only source of truth for what it has already handled: the
// notification stays unread until the whole run finishes, so an overlapping
// run — or a retry after a crash — would otherwise answer the same mention
// a second time.
export const hasAnswered = (
  thread: AppBskyFeedDefs.ThreadViewPost,
  did: string
) =>
  thread.replies?.some(
    (reply) =>
      AppBskyFeedDefs.isThreadViewPost(reply) && reply.post.author.did === did
  ) ?? false;
