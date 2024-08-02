import { json, LoaderFunction } from "@remix-run/node";
import React from 'react';
import { Container, Title, Text, Button, Group, Stack, Image, Avatar, Divider, Box } from '@mantine/core';
import { Link, useLoaderData, useNavigate } from '@remix-run/react';
import directus from "~/lib/directus";
import { getUserData } from "~/utils/Auth/auth.userDetails";
import { readItem } from "@directus/sdk";
import { IconCalendar, IconArrowLeft, IconTrash } from '@tabler/icons-react';
import { ButtonComponent } from "~/components/Button/Button";

export const loader: LoaderFunction = async ({ params, request }) => {
  const postId = params.postId;

  if (typeof postId !== 'string') {
    return null;
  }
  const user = await getUserData(request);
  const blog = await directus.request(readItem('blogs', postId));
  // console.log(blog)
  return json({ blog, user });
};

const Post: React.FC = () => {
  const { blog, user } = useLoaderData<typeof loader>();
  const userId = user?.data?.id

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
            <ButtonComponent
              variant="light"
              color="red"
              leftSection={<IconTrash size={16} />}

            >
              Delete Post
            </ButtonComponent>
          )}
        </Group>
      </Stack>
    </Container>
  );
};

export default Post;
