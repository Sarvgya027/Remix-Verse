import { Box, Container, Flex, PasswordInput, TextInput, Title } from "@mantine/core";
import { json } from "@remix-run/node";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { ButtonComponent } from "~/components/Button/Button";
import * as Z from 'zod';
import { validateAction } from "~/utils/utils";
import { ActionData } from "~/utils/types";


export const loader: LoaderFunction = async () => {
  return json({ message: "This is the registration page" });
};


export const registrationSchema = Z.object({
  firstName: Z.string().min(1, 'First Name is required'),
  lastName: Z.string().min(1, 'Last Name is required'),
  email: Z.string().email('Invalid email address'),
  password: Z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: Z.string().min(6, 'Confirm Password must be at least 6 characters'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords must match',
  path: ['confirmPassword'],
});

export const action: ActionFunction = async ({ request }) => {
  const { formData, errors } = await validateAction({
    request,
    schema: registrationSchema,
  });
  if (errors) {
    return json({ errors }, { status: 400 });
  }
  const { firstName, lastName, email, password } = formData;
  console.log('Registration Data:', { firstName, lastName, email, password });
  
  return json({ success: true });
};


export const Register = () => {
  const actionData = useActionData<ActionData>();

  return (
    <Flex mih="80vh" align="center" justify="center">
      <Box maw={300} mx="auto">
        <Title order={2} ta="center" mb={20}>
          Create your account
        </Title>

        <Form method="post">
          <TextInput
            name="firstName"
            withAsterisk
            label="First Name"
            placeholder="John"
            error={actionData?.errors?.firstName}
          />
          <TextInput
            name="lastName"
            withAsterisk
            label="Last Name"
            placeholder="Doe"
            mt="md"
            error={actionData?.errors?.lastName}
          />
          <TextInput
            name="email"
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            mt="md"
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
          <PasswordInput
            name="confirmPassword"
            withAsterisk
            label="Confirm Password"
            placeholder="Confirm your password"
            mt="md"
            error={actionData?.errors?.confirmPassword}
          />

          <ButtonComponent type="submit" fullWidth mt="xl">
            Register
          </ButtonComponent>
        </Form>
      </Box>
    </Flex>
  );
};

export default Register;