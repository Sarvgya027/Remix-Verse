import { Title, Text, Anchor, Button } from "@mantine/core";
import classes from "./Welcome.module.css";
import { Link } from "@remix-run/react";
import { ButtonComponent } from "../Button/Button";

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="center" mt={80}>
        Welcome to the{" "}
        <Text
          inherit
          variant="gradient"
          component="span"
          gradient={{ from: "pink", to: "yellow" }}
        >
          Remix Verse
        </Text>
      </Title>
      <Text c="gray" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        Where Ideas Collide and Creativity Flourishes
        Blend your voice with others, spark conversations, and shape the future of blogging.
      </Text>
      <Text c="gray" ta="center" size="lg" maw={580} mx="auto" mt="xl">

        <Link to='/register'>
          <ButtonComponent size="md">Create your blog now</ButtonComponent>
        </Link>
      </Text>
    </>
  );
}
