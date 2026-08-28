import { Post } from "./types.js";

class BaseError extends Error {
  public post: Post;

  constructor(post: Post, message: string) {
    super(message);
    this.post = post;
  }
}

export class NotAReplyError extends BaseError {
  name = "NotAReplyError";

  constructor(post: Post) {
    super(post, `Post ${post.uri} is not a reply`);
  }
}

export class PostUnavailableError extends BaseError {
  name = "PostUnavailableError";

  constructor(post: Post) {
    super(post, `The post ${post.uri} replies to is unavailable`);
  }
}
