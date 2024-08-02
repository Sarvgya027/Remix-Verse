// import { refresh } from "@directus/sdk";
// import directus from "~/lib/directus";
// import { commitSession, getSession } from "~/utils/session/session";

// export async function getUserData(request: Request) {
//   const session = await getSession(request.headers.get("Cookie"));

//   let access_token = session.get("access_token");
//   const refresh_token = session.get("refresh_token");
//   const expires_at = session.get("expires_at");
//   const expires = session.get("expires");

//   if (!access_token) return null;

//   // directus.setToken(access_token);

//   if (new Date() > new Date(expires_at)) {
//     try {
//       const result = await directus.request(refresh("json", refresh_token));
//       console.log("token refreshed", result);

//       if (result?.access_token) {
//         access_token = result.access_token;
//         session.set("access_token", result.access_token);
//         session.set("refresh_token", result.refresh_token);
//         session.set("expires", result.expires);
//         session.set("expires_at", result.expires_at);

//         await commitSession(session);
//       } else {
//         return null;
//       }
//     } catch (error) {
//       console.error("rerror in refreshing token:", error);
//       return null; 
//     }
//   }

//   try {
//     const userResponse = await fetch(`${process.env.DIRECTUS_URL}/users/me`, {
//       headers: {
//         Authorization: `Bearer ${access_token}`,
//       },
//     });
//     // console.log(userResponse);

//     if (userResponse.ok) {
//       const userData = await userResponse.json();

//       return userData;
//     }
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//   }
//   return null;
// }

// above function is not working properly the refresh token logic is not workig




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

// the above function only gets the user data from th token