<h3 align="center">
  <a href="https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:u7hglg6pwujzshicmdez4hjj/bafkreify7r4nzuy7cl33nffqbu3v67qcueurvhalkqacxdm5haqo73aizq@jpeg">
  <img src="https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:u7hglg6pwujzshicmdez4hjj/bafkreify7r4nzuy7cl33nffqbu3v67qcueurvhalkqacxdm5haqo73aizq@jpeg" alt="Post telling that Bluesky lacks of a 'screenshot this' kind of bot" width="500">
  </a>
</h3>

## Getting Started

### Stack

- `@atproto/api`: Official Bluesky (ATProtocol) API client.
- Vercel: Used for hosting the project and running the serverless function.
- pnpm: Package manager.

### Setup

To run this project, you need to set the following environment variables:

- `BLUESKY_USERNAME`: Your Bluesky username
- `BLUESKY_PASSWORD`: Your Bluesky password
- `CRON_SECRET`: A secret key used to authenticate requests (production usage only). The scheduler must send it as `Authorization: Bearer $CRON_SECRET`; the check is skipped when `NODE_ENV` is `development`.

It's recommended to do so by creating a `.env.local` file in the root of the project by duplicating the `.env` file and setting the environment variables.

### Running the project

Install the dependencies and run the development server:

```bash
pnpm install
```

```bash
pnpm dlx vercel dev
```

Then you can start sending requests to the API.

Beware that `GET /api/check` acts on the live account: it publishes replies
and marks notifications as read. Use a test account while developing.

## Routes

This project exposes the following route:

- `GET /api/check`: Check for new mentions and reply them with the download link.

## Limitations

- There is no realtime checks for new mentions. An external scheduler calls `GET /api/check` periodically, and each call looks for mentions that arrived since the previous one.
- A single run reads at most 10 pages of 100 notifications. Anything older than that is left for the next run.
- Replies are written in English, Portuguese, Japanese, German or Spanish, picked from the language tags of the post that mentions the bot. Any other language falls back to English.

## License

MIT © [Davi Coelho](https://github.com/developerdavi)
