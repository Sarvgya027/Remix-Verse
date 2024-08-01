import "@mantine/core/styles.css";
import '@mantine/notifications/styles.css';

import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
  useRevalidator,
} from "@remix-run/react";
import { Navbar } from "./components/Navbar/Navbar";
import { Notifications } from "@mantine/notifications";
import { json, LoaderFunction } from "@remix-run/node";
import { getUserData } from "./utils/Auth/auth.userDetails";
import { useEffect } from "react";


export const loader: LoaderFunction = async ({ request }) => {
  const userData = await getUserData(request);
  // console.log('user form root layout', userData)

  return json({ user: userData || null });

}

export function Layout({ children }: { children: React.ReactNode }) {
  const user = useLoaderData<typeof loader>();
  const revalidator = useRevalidator();
  const navigation = useNavigation();

  // useEffect(() => {
  //   if (user.user) {
  //     revalidator.revalidate();
  //   }
  // }, [user, revalidator]);

  // console.log('user form layout', user)
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <Notifications />

          <Outlet />
        </MantineProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
