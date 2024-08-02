import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import React from 'react';
import { Container, Title, Text, Button, Group, Stack, Image, Avatar, Divider, Box } from '@mantine/core';
import { Form, Link, useLoaderData, useNavigate } from '@remix-run/react';
import directus from "~/lib/directus";
import { getUserData } from "~/utils/Auth/auth.userDetails";
import { deleteItem, readItem } from "@directus/sdk";
import { IconCalendar, IconArrowLeft, IconTrash, IconEdit } from '@tabler/icons-react';
import { ButtonComponent } from "~/components/Button/Button";
import { getSession } from "~/utils/session/session";

export const loader: LoaderFunction = async ({ params, request }) => {
  const postId = params.postId;

  if (typeof postId !== 'string') {
    return null;
  }
  const user = await getUserData(request);
  const blog = await directus.request(readItem('blogs', postId));
  // const access_token = getSession(request.headers.get(""))


  return json({ blog, user, postId });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const intent = formData.get('intent')
  const postId = formData.get('postId') as string
  // console.log(intent, postId)

  if (intent === 'delete') {
    try {
      const result = await directus.request(deleteItem('blogs', postId))

      return redirect('/posts')

      // console.log(result)
      redirect('/posts')

    } catch (error) {
      console.log(error)
    }
  }


  return null

}

const Post: React.FC = () => {
  const { blog, user, postId } = useLoaderData<typeof loader>();
  const userId = user?.data?.id;
  // console.log(postId)

  const navigate = useNavigate();

  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        <Button
          component={Link}
          to="/posts"
          variant="subtle"
          leftSection={<IconArrowLeft size={16} />}
        >
          Back to All Posts
        </Button>

        {blog.featured_image && (
          <Image
            src={blog.featured_image}
            alt={blog.title}
            radius="md"
            h={400}
          />
        )}

        <Title order={1}>{blog.title}</Title>

        <Group gap="xs">
          <Avatar src={blog.authorAvatar} radius="xl" />
          <Text fw={500}>{blog.fullName}</Text>
          <Divider orientation="vertical" />
          <Group gap={4}>
            <IconCalendar size={16} />
            <Text c="dimmed">
              {new Date(blog.date_created).toLocaleDateString()}
            </Text>
          </Group>
        </Group>

        <Divider />

        <Box
          dangerouslySetInnerHTML={{ __html: blog.content }}
          style={(theme: any) => ({
            '& p': { marginBottom: theme.spacing.md },
            '& h2': { marginTop: theme.spacing.xl, marginBottom: theme.spacing.md },
            '& img': { maxWidth: '100%', height: 'auto', borderRadius: theme.radius.md },
          })}
        />

        <Divider />

        <Group justify="space-between">
          <Button
            component={Link}
            to="/posts"
            variant="subtle"
            leftSection={<IconArrowLeft size={16} />}
          >
            Back to All Posts
          </Button>
          {user && userId === blog.author && (
            <>
              <Link to={`/edit/${postId}`}>
                <ButtonComponent
                  variant="light"
                  color="blue"
                  leftSection={<IconEdit size={16} />}>Edit Post
                </ButtonComponent>
              </Link>
              <Form method="post">

                <input type='hidden' name='postId' value={postId} />
                <input type="hidden" name="intent" value='delete' />

                <ButtonComponent
                  type="submit"
                  variant="light"
                  color="red"
                  leftSection={<IconTrash size={16} />}

                >
                  Delete Post
                </ButtonComponent>
              </Form>
            </>
          )}
        </Group>
      </Stack>
    </Container>
  );
};

export default Post;
