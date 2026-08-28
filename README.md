# down-blue-bot

A Bluesky bot that turns a mention into a download link. Reply to any post,
tag the bot, and it answers in the thread with a [down.blue](https://down.blue)
link that downloads the media from the post you replied to.

It runs as a single serverless function on Vercel: an external scheduler calls
`GET /api/check`, which reads the unread mentions and answers each one in the
language of the post that summoned it.

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

## Credits

This project started as a fork of [screenshot-this-bsky](https://github.com/developerdavi/screenshot-this-bsky)
by [Davi Coelho](https://github.com/developerdavi), which replied to mentions with a
generated screenshot of the post. It has since been rewritten around a different
purpose — replying with a download link — but the Bluesky client layer and much of
the original structure are still his work.

## License

MIT — Copyright (c) 2024 Davi Coelho, Copyright (c) 2024-2026 Joselito.
See [LICENSE](/LICENSE).
