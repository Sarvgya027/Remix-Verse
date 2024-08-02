import React, { useEffect } from 'react';
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { ButtonComponent } from '../Button/Button';
import { Link } from '@remix-run/react';

interface Author {
  firstName: string;
  lastName: string;
}

interface BlogPost {
  blog_id: string;
  title: string;
  content: string;
  featured_image: string | null;
  fullName: string;
  date_created: string;
  author: string;
}


interface BlogPostCardProps {
  post: BlogPost;
}

export const BlogCard: React.FC<BlogPostCardProps> = ({ post }) => {
  // console.log('from blogcard', post)

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={`https://j2s3f783k2.tribecrafter.app/assets/${post.featured_image}.png`}
          height={160}
          alt={post.title}
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{post.title}</Text>
        <Badge color="pink" variant="light">
          New
        </Badge>
      </Group>

      <Text size="sm" c="dimmed" lineClamp={3}>
        {post.content.split(' ').slice(0, 40).join(' ') + "..."}
      </Text>

      <Group justify="space-between" mt="md">
        <Text size="sm" c="gray">
          By {post.fullName}
        </Text>
        <Link to={`/${post.blog_id}`}>
          <ButtonComponent variant="light" color="blue" mt="md" radius="md">
            Read more
          </ButtonComponent></Link>
      </Group>
    </Card>
  );
};