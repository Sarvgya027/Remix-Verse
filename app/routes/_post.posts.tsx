// here public can see other posts

import { createDirectus, readItems, rest } from "@directus/sdk";
import { Card, Text } from "@mantine/core";
import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useLoaderData, useOutletContext, useRouteLoaderData } from "@remix-run/react"
import { CardList } from "~/components/cardList/cardList";
import { Navbar } from "~/components/Navbar/Navbar";
import directus from "~/lib/directus";
import { getUserData } from "~/utils/Auth/auth.userDetails";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await getUserData(request)

  const response = await directus.request(readItems('blogs', {
    sort: ['sort', '-date_created'],
  }))
  const data = response;
  // console.log(data)

  return json({ user, data })
}



export default function Posts() {
  const { user, data } = useLoaderData<typeof loader>();
  // console.log(data)

  return (
    <div>
      <Navbar user={user} />
      <Text
        ta="center"
        size="xl"
        fw={900}
        variant="gradient"
        gradient={{ from: 'orange', to: 'yellow', deg: 90 }}
        style={{ paddingLeft: '10px', paddingRight: '10px', margin: '10px' }}
      >
        Recent Blog Posts
      </Text>
      <CardList data={data} />
    </div>
  );
};
