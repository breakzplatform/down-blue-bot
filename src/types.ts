import type { AppBskyFeedDefs, AppBskyFeedPost } from "@atproto/api";

export type Record = AppBskyFeedPost.Record;
export type Post = AppBskyFeedDefs.PostView & { record: Record };
