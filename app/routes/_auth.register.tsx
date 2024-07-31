import { Box, Container, Flex, PasswordInput, TextInput, Title } from "@mantine/core";
import { json } from "@remix-run/node";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { ButtonComponent } from "~/components/Button/Button";

export const loader: LoaderFunction = async () => {
  return json({ message: "This is the registration page" });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const firstName = formData.get('firstName')
  const lastName = formData.get('lastName')
  const email = formData.get('email')
  const password = formData.get('password')
  const confirmPassword = formData.get('confirmPassword')

  console.log(firstName, lastName, email, password, confirmPassword)

  return null
}

export const Register = () => {
  return (

    <Flex mih='80vh' align='center' justify='center'>

      <Box maw={300} mx='auto'>
        <Title order={2} ta="center" mb={20}>
          Create your account
        </Title>

        <Form method="post">
          <TextInput
            name="firstName"
            withAsterisk
            label="First Name"
            placeholder="John"
          />
          <TextInput
            name="lastName"
            withAsterisk
            label="Last Name"
            placeholder="Doe"
            mt="md"
          />
          <TextInput
            name="email"
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            mt="md"
          />
          <PasswordInput
            name="password"
            withAsterisk
            label="Password"
            placeholder="Your password"
            mt="md"
          />
          <PasswordInput
            name="confirmPassword"
            withAsterisk
            label="Confirm Password"
            placeholder="Confirm your password"
            mt="md"
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