import { Box, Grid, Text } from "@mantine/core";
import { BlogCard } from "../card/BlogCard";

export interface BlogPost {
  blog_id: string,
  title: string,
  content: string,
  featured_image: string,
  fullName: string,
  date_created: string
  author: string
}

interface CardListProps {
  data: BlogPost[];
}



export const CardList: React.FC<CardListProps> = ({data}) => {
  // console.log(data)

  if (!data) {
    return (<Text>No posts available</Text>) 
  }

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
