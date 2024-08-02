import { refresh } from "@directus/sdk";
import directus from "~/lib/directus";
import { getSession } from "~/utils/session/session";

export async function getUserData(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  const access_token = session.get("access_token");
  const refresh_token = session.get("refresh_token");
  const expires_at = session.get("expires_at");
  const expires = session.get("expires");

  if (!access_token) return null;

  if ( new Date(expires_at) < new Date()){
    try {
      const result = await directus.request(refresh('json', refresh_token));

    } catch (error) {
      
    }
  }

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
