import { LayoutProps } from "models";

interface OnBoardingLayoutProps {}

const OnBoardingLayout = (props: LayoutProps) => {
  return (
    <>
      <div>OnBoarding Layout</div>
      {props.children}
    </>
  );
};

export default OnBoardingLayout;
