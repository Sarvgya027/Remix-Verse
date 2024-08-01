// here public can see other posts

import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useOutletContext, useRouteLoaderData } from "@remix-run/react"
import { Navbar } from "~/components/Navbar/Navbar";
import { getUserData } from "~/utils/Auth/auth.userDetails";

export const loader = async ({ request }: LoaderFunctionArgs) => {

  const user = await getUserData(request)
  // console.log('loader posts ', user)
  return user

}

export default function Posts() {
  const user = useLoaderData<typeof loader>();


  return (
    <div>
      <Navbar user={user} />
      <h1>Posts</h1>
    </div>
  )
}