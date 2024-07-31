import { Box, Button, Flex, Group, PasswordInput, TextInput, Title } from "@mantine/core";
import { json } from "@remix-run/node";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { ButtonComponent } from "~/components/Button/Button";

export const loader: LoaderFunction = async () => {
  return json({ message: "This is the login page" });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const email = formData.get('email')
  const password = formData.get('password')
  console.log(email, password)

  return null
}

export const Login = () => {
  return (
    <Flex mih="70vh" align="center" justify="center">
      <Box maw={300} mx="auto">
        <Title order={2} ta="center" mt="md" mb={50}>
          Login to your account
        </Title>

        <Form method="post">
          <TextInput
            name="email"
            withAsterisk
            label="Email"
            placeholder="your@email.com"
          />
          <PasswordInput
            name="password"
            withAsterisk
            label="Password"
            placeholder="Your password"
            mt="md"
          />

          <ButtonComponent type="submit" fullWidth mt="xl">
            Log in
          </ButtonComponent>
        </Form>
      </Box>
    </Flex>
  );
};

export default Login;
