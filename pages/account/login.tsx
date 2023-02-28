import { Button, Text } from "@fluentui/react-components";
import { Card } from "@fluentui/react-components/unstable";
import Form from "component/Form";
import FormItem from "component/Form/Item";
import { InputForm } from "component/Input";
import OnBoardingLayout from "component/layout/OnBoardingLayout";
import { FormikProps } from "formik";
import { LoginPaypoad } from "models";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useRef } from "react";
import { userService } from "services";
import * as Yup from "yup";

export default Login;

function Login() {
  const router = useRouter();
  const formRef = useRef<FormikProps<any>>(null);

  // form validation rules
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });
  const handleSubmitForm = useCallback(() => {
    formRef.current?.submitForm();
  }, []);
  // get functions to build form with useForm() hook
  function onSubmit({ username, password }: LoginPaypoad) {
    return userService
      .login(username, password)
      .then(() => {
        // get return url from query parameters or default to '/'
        const returnUrl = router.query || "/";
        router.push(returnUrl);
      })
      .catch(() => console.log("hihi"));
  }

  return (
    <div className="flex h-full items-center justify-around">
      <div className="w-[50%] h-full mx-auto">
        <Card className="flex p-8" style={{ height: 600 }}>
          <div>
            <Text
              as="h4"
              className="block"
              align="center"
              size={200}
              weight="bold"
            >
              Login now
            </Text>
            <Form
              initialValues={{}}
              innerRef={formRef}
              onSubmit={(values) =>
                onSubmit({
                  username: values.username,
                  password: values.password,
                })
              }
              enableReinitialize
            >
              <FormItem name="username">
                <InputForm
                  label="Username"
                  inputProps={{ placeholder: "User name", size: "large" }}
                />
              </FormItem>
              <FormItem name="password">
                <InputForm
                  label="Password"
                  inputProps={{
                    type: "password",
                    placeholder: "Password",
                    size: "large",
                  }}
                />
              </FormItem>
            </Form>
            <div className="flex justify-center">
              <Button onClick={handleSubmitForm}>Login</Button>
            </div>
            <div>
              <Link href="/account/register" onClick={() => console.log(1)}>
                Register now ...
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
Login.Layout = OnBoardingLayout;
