import { Box, Grid } from "@mantine/core";
import { BlogCard } from "../card/BlogCard";

export interface BlogPost {
  blog_id: string,
  title: string,
  content: string,
  featured_image: string,
  fullName: string,
  date_created: string
}

interface CardListProps {
  data: BlogPost[];
}


export const CardList: React.FC<CardListProps> = ({data}) => {
  return (
    <Box maw={1200} mx="auto" px="md">
      <Grid gutter="md">
        {data.map(blog => (
          <Grid.Col key={blog.blog_id} span={12} >
            <BlogCard post={blog} />
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );
};
