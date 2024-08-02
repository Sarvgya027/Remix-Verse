
import { logout } from "@directus/sdk";
import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import directus from "~/lib/directus";
import { destroySession, getSession } from "~/utils/session/session";


export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));


  await directus.logout(); // this doesnt work when i use `directus.setToken(result.access_token)` in the login route, if i dont set the token there i can logout with no problem


  return redirect("/", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};


export const action: ActionFunction = async ({ request }) => {

}