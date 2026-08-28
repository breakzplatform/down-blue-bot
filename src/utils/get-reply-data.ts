import type { AppBskyFeedPost } from "@atproto/api";
import type { Post } from "../types";

export const getReplyData = (post: Post): AppBskyFeedPost.ReplyRef => {
  return {
    parent: {
      uri: post.uri,
      cid: post.cid,
    },
    root: {
      uri: post.record.reply ? post.record.reply.root.uri : post.uri,
      cid: post.record.reply ? post.record.reply.root.cid : post.cid,
    },
  };
};
