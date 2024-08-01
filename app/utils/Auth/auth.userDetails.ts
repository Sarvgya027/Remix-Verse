import { getSession } from "~/utils/session/session";

export async function getUserData(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  const access_token = session.get("access_token");

  if (!access_token) return null;

  try {
    const userResponse = await fetch(`${process.env.DIRECTUS_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    // console.log(userResponse);

    if (userResponse.ok) {
      const userData = await userResponse.json();

      return userData;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
  return null;
}
