import { LayoutProps } from "models";

interface OnBoardingLayoutProps {}

const OnBoardingLayout = (props: LayoutProps) => {
  return <div className="mt-20">{props.children}</div>;
};

export default OnBoardingLayout;
