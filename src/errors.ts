import { Post } from "./types";

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

export class ImageGenerationError extends BaseError {
  name = "ImageGenerationError";

  constructor(post: Post) {
    super(post, `Could not generate an image for ${post.uri}`);
  }
}
