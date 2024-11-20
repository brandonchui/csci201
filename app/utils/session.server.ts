import { createCookieSessionStorage, redirect } from "@remix-run/node";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "fitness_session",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
    sameSite: "lax",
    secrets: ["secret"],
    secure: process.env.NODE_ENV === "production",
  },
});

//for cookies
export async function createUserSession(userId: number, redirectTo: string) {
  const session = await sessionStorage.getSession();
  session.set("userId", userId);

  console.log('Creating session for user:', userId);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

export async function getUserSession(request: Request) {
  return sessionStorage.getSession(request.headers.get("Cookie"));
}

//need an id
export async function requireUserId(request: Request, redirectTo: string = "/login") {
  const session = await getUserSession(request);
  const userId = session.get("userId");

  console.log('Required userId check:', userId);

  if (!userId) {
    throw redirect(redirectTo);
  }
  return userId;
}

//to log out
export async function logout(request: Request) {
  const session = await getUserSession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}