import { Inter } from "@next/font/google";
import { MainLayout } from "component/layout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <div>Home page</div>;
}

Home.Layout = MainLayout;
