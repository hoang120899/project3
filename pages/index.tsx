import { Button } from "@fluentui/react-components";
import { Inter } from "@next/font/google";
import { MainLayout } from "component/layout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Button>Example</Button>
    </div>
  );
}

Home.Layout = MainLayout;
