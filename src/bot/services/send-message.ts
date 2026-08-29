import type { AppBskyRichtextFacet } from "@atproto/api";
import { getAgent } from "../agent.js";

export const sendMessage = async (
  targetDid: string,
  text: string,
  facets?: AppBskyRichtextFacet.Main[]
) => {
  const agent = await getAgent();

  const {
    data: { convo },
  } = await agent.chat.bsky.convo.getConvoForMembers({
    members: [agent.did!, targetDid],
  });

  const response = await agent.chat.bsky.convo.sendMessage({
    convoId: convo.id,
    message: {
      text,
      facets,
    },
  });

  return response.data;
};
