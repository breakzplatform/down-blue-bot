import type { AppBskyRichtextFacet } from "@atproto/api";

const encoder = new TextEncoder();

// Facet ranges are byte offsets into the UTF-8 encoded text, so they cannot be
// derived from string indexes once the text carries accents or kana.
export const getLinkFacet = (
  text: string,
  label: string,
  uri: string
): AppBskyRichtextFacet.Main | undefined => {
  const index = text.indexOf(label);

  if (index === -1) {
    return undefined;
  }

  const byteStart = encoder.encode(text.slice(0, index)).byteLength;

  return {
    index: {
      byteStart,
      byteEnd: byteStart + encoder.encode(label).byteLength,
    },
    features: [{ $type: "app.bsky.richtext.facet#link", uri }],
  };
};
