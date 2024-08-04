// this is where the post edit page will be shown from ID and prefetch all details 
// and only show the delete button if author is loggeed and who made the post

import { readItem, updateItem } from "@directus/sdk";
import { Center, FileInput, Select, Text, Textarea, TextInput } from "@mantine/core";
import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { Form, useLoaderData, useNavigation } from "@remix-run/react";
import { ButtonComponent } from "~/components/Button/Button";
import { Navbar } from "~/components/Navbar/Navbar";
import directus from "~/lib/directus";
import { getUserData } from "~/utils/Auth/auth.userDetails";

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await getUserData(request);
  // console.log(user)
  const blogId = params.postId as string;
  // console.log(blogId)

  if (!user) {
    return redirect('/login')
  }
  try {
    const blog = await directus.request(readItem('blogs', blogId))
    // console.log(blog)
    if (blog.author !== user?.data?.id) {
      return json({ error: 'You are not authorized to edit this blog.' }, { status: 403 })
    }
    return json({ blog, user })
  } catch (error) {
    console.log(error)
  }
}
''
export const action: ActionFunction = async ({ request }) => {

  const formData = await request.formData();

  const title = formData.get('title');
  const content = formData.get('content');
  const featured_image = formData.get('featuredImage');
  const fullName = formData.get('fullName');
  const author = formData.get('author');
  const blog_id = formData.get('blog_id') as string;
  // console.log(blog_id, title, content, featured_image, fullName, author);

  if (blog_id !== author) {
    return json({ error: 'You are not authorized to edit this blog.' }, { status: 403 })
  }

  const updatedBlog = {
    title,
    content,
    // featured_image,
    fullName,
  }
  try {
    const result = await directus.request(updateItem('blogs', blog_id, updatedBlog));
    // console.log(result)
    if (result.blog_id) {
      return redirect('/posts')
    }
  } catch (error) {
    console.log(error)
  }

  return null
}

const EditPost = () => {
  const { user, blog } = useLoaderData<typeof loader>();
  // console.log(blog)
  // console.log(user)
  const navigation = useNavigation();

  return (
    <div>
      <Navbar user={user} />

      <Center>
        <Form method='post' >
          <TextInput
            m='40'
            label="Title"
            placeholder="Enter the title for your blog"
            name="title"
            defaultValue={blog.title}
          />

          <Text mx={40}>Edit Your Blog's Content below</Text>
          {/* <WYSIWYG  /> */}
          <Textarea
            m='40'
            label="Content"
            placeholder="Enter the content for your blog"
            name="content"
            defaultValue={blog.content}
          />

          <FileInput
            mx='40'
            label="Featured Image"
            placeholder="Upload an image"
            name="featuredImage"
            // defaultValue={blog.featured_image}
          />

          <Select
            m='40'
            label="Full Name"
            placeholder="Enter your full name"
            name="fullName"
            data={[`${user?.data?.first_name} ${user?.data?.last_name}`]}
            defaultValue={`${user?.data?.first_name} ${user?.data?.last_name}`}
          />

          <input type="text" name='author' hidden defaultValue={`${user?.data?.id}`} />
          <input type="text" name='blog_id' hidden defaultValue={`${blog.blog_id}`} />


          <Center>
            <ButtonComponent loading={navigation.state === 'submitting'} w={200} m='20' type="submit">Update</ButtonComponent>
          </Center>
        </Form>
      </Center>
    </div>
  );
}

export default EditPost;