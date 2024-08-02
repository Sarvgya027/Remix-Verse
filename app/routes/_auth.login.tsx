import { Box, Button, Flex, Group, PasswordInput, TextInput, Title } from "@mantine/core";
import { json, redirect } from "@remix-run/node";
import type { ActionFunction, LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, useActionData, useLoaderData, useLocation, useNavigate, useNavigation } from "@remix-run/react";
import { ButtonComponent } from "~/components/Button/Button";
import { validateAction } from "~/utils/utils";
import { ActionData } from "~/utils/types";
import { loginSchema } from "~/utils/validationSchema";
import directus from "~/lib/directus";
import { login, registerUser } from "@directus/sdk";
import { useEffect } from "react";
import { notifications, useNotifications } from "@mantine/notifications";
import { commitSession, getSession } from "~/utils/session/session";
import { Navbar } from "~/components/Navbar/Navbar";


export const loader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
  try {
    return json({ message: "This is the login page" });
  } catch (error) {
    console.error("Loader error:", error);
    return json({ error: 'An error occurred while loading the page.' }, { status: 500 });
  }
};



export const action: ActionFunction = async ({ request }) => {
  const { formData, errors } = await validateAction({
    request,
    schema: loginSchema,
  });
  if (errors) return json({ errors }, { status: 400 });

  const { email, password } = formData;
  // console.log(email, password);

  // authentication
  try {
    // const result = await directus.request(login(email, password)); //this only returns access token and expires
    const result = await directus.login(email, password); //this returns access, refresh and expires, expires_at

    if (result?.access_token) {
      const session = await getSession();

      session.set("access_token", result.access_token);
      session.set("refresh_token", result.refresh_token);
      session.set("expires", result.expires);
      session.set("expires_at", result.expires_at);

      return redirect('/posts', {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    return json({ error: 'An error occurred during login. Please try again.' }, { status: 500 });
  }

};


export const Login = () => {
  const navigation = useNavigation();
  const actionData = useActionData<ActionData>();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const registrationStatus = new URLSearchParams(location.search).get('registration');
    if (registrationStatus === 'true') {
      notifications.show({
        title: "Success",
        message: "User registered successfully",
        color: "green",
        autoClose: 5000,
      });
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  return (
    <>
      <Navbar user={null} />
      <Flex mih="70vh" align="center" justify="center">
        <Box miw={300} mx="auto">
          <Title order={2} ta="center" mt="md" mb={50}>
            Login to your account
          </Title>

          <Form method="post">
            <TextInput
              name="email"
              withAsterisk
              label="Email"
              placeholder="your@email.com"
              error={actionData?.errors?.email}
            />
            <PasswordInput
              name="password"
              withAsterisk
              label="Password"
              placeholder="Your password"
              mt="md"
              error={actionData?.errors?.password}
            />

            <ButtonComponent loading={navigation.state === 'submitting'} type="submit" fullWidth mt="xl">
              {navigation.state === 'submitting' ? 'Logging in...' : 'Login'}
            </ButtonComponent>
            <Link to='/register'>
              <ButtonComponent color="gray" variant="outline" fullWidth mt="md">
                Create an account
              </ButtonComponent>
            </Link>
          </Form>
        </Box>
      </Flex>
    </>
  );
};

export default Login;
