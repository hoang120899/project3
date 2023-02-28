import { LayoutProps } from "models";

const MainLayout = (props: LayoutProps) => {
  return (
    <>
      <div>Main Layout</div>
      {props.children}
    </>
  );
};

export default MainLayout;
