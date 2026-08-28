import { t } from "../dictionary/translate";
import { Post } from "../types";
import { getReplyData } from "../utils/get-reply-data";
import { createPost } from "./create-post";
import { NotAReplyError } from "../errors";

export const handleRequest = async (parent: Post, post: Post) => {
  console.info(`Post URI: ${post.uri}`);

  if (typeof post.record.reply === "undefined") {
    throw new NotAReplyError(post);
  }

  const [, , parentDid, , parentRecordKey] = parent.uri.split("/");

  const text = `⬇️ ${t("success.reply", post.record.langs)}`;

  const recordURI = await createPost({
    text,
    reply: getReplyData(post),
    facets: [
      {
        index: {
          byteStart: 7,
          byteEnd: text.length + 6,
        },
        features: [
          {
            $type: "app.bsky.richtext.facet#link",
            uri: `https://down.blue/?url=https://bsky.app/profile/${parentDid}/post/${parentRecordKey}`,
          },
        ],
      },
    ],
  });

  return recordURI;
};
