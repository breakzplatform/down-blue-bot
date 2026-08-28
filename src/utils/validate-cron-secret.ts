export const validateCronSecret = (request: Request) => {
  if (process.env.NODE_ENV === "development") {
    return;
  }

  const [, authToken] = (request.headers.get("authorization") || "").split(
    "Bearer "
  );

  if (!authToken || authToken !== process.env.CRON_SECRET) {
    throw new Error("Unauthorized");
  }
};
