import type { MetaFunction } from "@remix-run/node";
import { Welcome } from "~/components/Welcome/Welcome";
import { ColorSchemeToggle } from "~/components/ColorSchemeToggle/ColorSchemeToggle";
import { Navbar } from "~/components/Navbar/Navbar";

export const meta: MetaFunction = () => {
  return [
    { title: "Mantine Remix App" },
    { name: "description", content: "Welcome to Mantine!" },
  ];
};


export default function Index() {
  return (
    <div>
      <Navbar user={null} />
      <Welcome />

    </div>
  );
}

// this is just welcome page