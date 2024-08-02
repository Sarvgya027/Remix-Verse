import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import directus from "~/lib/directus";
import { destroySession, getSession } from "~/utils/session/session";


export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  
  // Logout from Directus
  await directus.logout();

  // Clear the session
  return redirect("/", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};


// export const action: ActionFunction = async ({ request }) => {

// }