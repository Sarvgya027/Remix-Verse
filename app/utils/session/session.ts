
import { createCookieSessionStorage } from "@remix-run/node";

export const { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 2,
    secrets: [process.env.SESSION_SECRET || ""],
  },
});
