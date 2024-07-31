import { Box, Button, Flex, Group, PasswordInput, TextInput, Title } from "@mantine/core";
import { json } from "@remix-run/node";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { ButtonComponent } from "~/components/Button/Button";
import * as Z from "zod";
import { validateAction } from "~/utils/utils";
import { ActionData } from "~/utils/types";

export const loader: LoaderFunction = async () => {
  return json({ message: "This is the login page" });
};


export const schema = Z.object({
  email: Z.string({
    required_error: 'Email is required',
  }).email('Invalid email'),
  password: Z.string().min(6, 'Password must be at least 6 characters'),
});

export const action: ActionFunction = async ({ request }) => {
  const { formData, errors } = await validateAction({
    request,
    schema
  });
  if (errors) return json({ errors }, { status: 400 });

  const { email, password } = formData;
  // console.log(email, password);

  // Add authentication logic here

  return json({ success: true }); // redirect to another page
};


export const Login = () => {
  const actionData = useActionData<ActionData>();
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

          <ButtonComponent type="submit" fullWidth mt="xl">
            Log in
          </ButtonComponent>
        </Form>
      </Box>
    </Flex>
  );
};

export default Login;
