import { t } from "../dictionary/translate";
import { Post } from "../types";
import { getReplyData } from "../utils/get-reply-data";
import { createPost } from "./create-post";
import  { NotAReplyError } from "../errors";

export const handleRequest = async (parent: Post, post: Post) => {


  console.info(`Post URI: ${post.uri}`);

  const urlParts = parent.uri.split("/");

  https://down.blue/?url=https://bsky.app/profile/did:plc:44vqjiiftiz32k4thwduvtcq/post/3l4brcfqlz22p

  if (typeof post.record.reply === "undefined") {
    throw new NotAReplyError(post);
  }

  // const image = await generatePrint(post.uri).catch(() => {
  //   throw new ImageGenerationError(post);
  // });

  // const blob = await uploadBlob(image);

  const string = `⬇️ ${t("success.reply", post.record.langs)}`;

  const recordURI = await createPost({
    text: string,
    reply: getReplyData(post),
    facets: [
      {
        "index": {
          "byteStart": 7,
          "byteEnd": string.length + 6
        },
        "features": [
          {
            "$type": "app.bsky.richtext.facet#link",
            "uri": `https://down.blue/?url=https://bsky.app/profile/${urlParts[2]}/post/${urlParts[4]}`
          }
        ]
      }
    ]
  });

  return recordURI;
};
