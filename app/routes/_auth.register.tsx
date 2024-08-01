import { Box, Container, Flex, PasswordInput, TextInput, Title } from "@mantine/core";
import { json, redirect } from "@remix-run/node";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { ButtonComponent } from "~/components/Button/Button";
import { validateAction } from "~/utils/utils";
import { ActionData } from "~/utils/types";
import { registrationSchema } from "~/utils/validationSchema";
import directus from "~/lib/directus";
import { createUser, registerUser } from "@directus/sdk";
import { notifications } from "@mantine/notifications";
import { Navbar } from "~/components/Navbar/Navbar";


export const loader: LoaderFunction = async () => {
  return json({ message: "This is the registration page" });
};

// action
export const action: ActionFunction = async ({ request }) => {

  const { formData, errors } = await validateAction({
    request,
    schema: registrationSchema,
  });
  if (errors) {
    return json({ errors }, { status: 400 });
  }
  const { firstName, lastName, email, password } = formData;
  // console.log('Registration Data:', { firstName, lastName, email, password });
  const user = {
    first_name: firstName,
    last_name: lastName,
    email,
    password
  }

  //registeration logic
  try {
    const result = await directus.request(registerUser(email, password, user)); //in this the user will be directly given authors role(if configured in directus settings)

    // const result = await directus.request(createUser(user)); in this we have to manually give the authors role by roleID

    return redirect('/login?registration=true', {
      status: 303
    });

  } catch (error) {
    if (error instanceof Error) {
      return json({ error: error.message, message: 'User registration failed' }, { status: 500 });
    } else {
      return json({ error: 'An unknown error occurred', message: 'User registration failed' }, { status: 500 });
    }
  }
};

export const Register = () => {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();

  return (
    <>
    <Navbar user={null} />
      <Flex mih="80vh" align="center" justify="center">
        <Box miw={300} mx="auto">
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

            <ButtonComponent loading={navigation.state === 'submitting'} type="submit" fullWidth mt="xl">
              {navigation.state === 'submitting' ? 'Registering...' : 'Register'}
            </ButtonComponent>
          </Form>
        </Box>
      </Flex>
    </>
  );
};

export default Register;