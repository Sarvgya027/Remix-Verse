// // this route is for making a new post 


import { useState } from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Textarea, FileInput, Select, Button, Text, Group, Center, Combobox } from '@mantine/core';
import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { Form, useFetcher, useLoaderData, useNavigation } from '@remix-run/react';
import { WYSIWYG } from '~/components/wysiwyg/wysiwyg';
import { Navbar } from '~/components/Navbar/Navbar';
import { ButtonComponent } from '~/components/Button/Button';
import { getUserData } from '~/utils/Auth/auth.userDetails';
import directus from '~/lib/directus';
import { createItem, uploadFiles } from '@directus/sdk';
import { object } from 'zod';

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUserData(request)
  // console.log(user)
  if (!user) {
    return redirect('/login')
  }
  return { user }
}

export const action: ActionFunction = async ({ request }) => {

  const formData = await request.formData();

  const title = formData.get('title');
  const content = formData.get('content');
  const featured_image = formData.get('featuredImage');
  const fullName = formData.get('fullName');
  const author = formData.get('author');
  // console.log(title, content, featured_image, fullName, author);

  let imageID = null;

  if(featured_image && featured_image instanceof Blob) {
    const imageData = new FormData();
    imageData.append('file', featured_image);

    const result = await directus.request(uploadFiles(imageData))
    // console.log(result.id)
    imageID = result.id
  }


  const createdBlog = {
    title,
    content,
    featured_image : imageID,
    fullName,
    author
  }

  try {
    const result = await directus.request(createItem('blogs', createdBlog))
    // console.log(result)

    if (result.blog_id) {
      return redirect('/posts')
    } else {
      return json({ error: 'An error occurred while creating the blog.' }, { status: 500 });
    }

  } catch (error) {
    console.log(error);
  }

  return json({ success: true });
}

const New = () => {
  const { user } = useLoaderData<typeof loader>();
  const navigation = useNavigation();

  return (
    <div>
      <Navbar user={user} />

      <Center>
        <Form method='post' encType="multipart/form-data">
          <TextInput
            m='40'
            label="Title"
            placeholder="Enter the title for your blog"
            name="title"
          />

          <Text mx={40}>Write Your Blog's Content below</Text>
          {/* <WYSIWYG  /> */}
          <Textarea
            m='40'
            label="Content"
            placeholder="Enter the content for your blog"
            name="content"
          />

          <FileInput
            mx='40'
            label="Featured Image"
            placeholder="Upload an image"
            name="featuredImage"
          />

          <Select
            m='40'
            label="Full Name"
            placeholder="Enter your full name"
            name="fullName"
            data={[`${user.data.first_name} ${user.data.last_name}`]}
          />

          <input type="text" name='author' hidden defaultValue={`${user.data.id}`} />

          <Center>
            <ButtonComponent loading={navigation.state === 'submitting'} w={200} m='20' type="submit">Submit</ButtonComponent>
          </Center>
        </Form>
      </Center>
    </div>
  );
}

export default New;