import { Button, Text } from "@fluentui/react-components";
import { Card } from "@fluentui/react-components/unstable";
import { FormikProps } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useMemo, useRef } from "react";
import Form from "src/component/Form";
import FormItem from "src/component/Form/Item";
import { InputForm } from "src/component/Input";
import OnBoardingLayout from "src/component/layout/OnBoardingLayout";
import { useAuth } from "src/context";
import { LoginPaypoad } from "src/models";
import { PATH_AUTH } from "src/routes";
import * as Yup from "yup";

export default Login;

function Login() {
  const router = useRouter();
  const formRef = useRef<FormikProps<any>>(null);
  const { login } = useAuth();
  const initialValues = useMemo(
    () => ({
      username: "",
      password: "",
    }),
    []
  );
  // form validation rules
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .matches(/[^\s]/, "Username can't be all space!")
      .required("The Username is required!"),
    password: Yup.string()
      .matches(
        // eslint-disable-next-line no-useless-escape
        /^(?=.*[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*[@$!%*#=\/^?&])[a-zA-Z@$!%*#=\/^?&\d]{8,}$/g,
        "The password must be 8 characters long and must be a combination of uppercase letters, lowercase letters, numbers, and symbols"
      )
      .required("The current password is required"),
  });
  const handleSubmitForm = useCallback(() => {
    formRef.current?.submitForm();
  }, []);
  // hadnle Submit form
  const onSubmit = useCallback(
    (data: LoginPaypoad) => {
      login(data);
    },
    [router]
  );

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
              initialValues={initialValues}
              innerRef={formRef}
              onSubmit={(values) =>
                onSubmit({
                  username: values.username,
                  password: values.password,
                })
              }
              validationSchema={validationSchema}
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
              <Link href={PATH_AUTH.register}>Register now ...</Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
Login.Layout = OnBoardingLayout;
