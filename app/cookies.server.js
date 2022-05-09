import { createCookie } from "@remix-run/node";

export const sessionCookie = createCookie("__session", {
  httpOnly: true,
  maxAge: 1000,
  secrets: [process.env.COOKIE_SECRET],
});
