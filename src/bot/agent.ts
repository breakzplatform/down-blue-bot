import { AtpAgent } from "@atproto/api";

const agent = new AtpAgent({ service: "https://bsky.social" });

export const getAgent = async () => {
  if (!agent.did) {
    await agent.login({
      identifier: process.env.BLUESKY_USERNAME!,
      password: process.env.BLUESKY_PASSWORD!,
    });
  }

  return agent;
};

// The chat.bsky.* endpoints are served by a separate service, so the PDS needs
// the atproto-proxy header to know where to route them. It is opt-in: without
// this clone every direct message call fails.
export const getChatAgent = async () =>
  (await getAgent()).withProxy("bsky_chat", "did:web:api.bsky.chat");
