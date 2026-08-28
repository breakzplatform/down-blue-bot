import { resolveLanguage, t } from "../dictionary/translate";
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

  const language = resolveLanguage(post.record.langs);

  const prefix = "⬇️ ";
  const text = `${prefix}${t("success.reply", [language])}`;

  const encoder = new TextEncoder();

  const recordURI = await createPost({
    text,
    langs: [language],
    reply: getReplyData(post),
    facets: [
      {
        index: {
          byteStart: encoder.encode(prefix).byteLength,
          byteEnd: encoder.encode(text).byteLength,
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
