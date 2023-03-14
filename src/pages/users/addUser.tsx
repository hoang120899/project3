import { Icon } from "@fluentui/react";
import { Button, Title3 } from "@fluentui/react-components";
import { Card } from "@fluentui/react-components/unstable";
import { FormikProps } from "formik";
import { useRouter } from "next/router";
import { useCallback, useMemo, useRef } from "react";
import { authAPI } from "src/api-client";
import Form from "src/component/Form";
import FormItem from "src/component/Form/Item";
import { InputForm } from "src/component/Input";
import { InputArea } from "src/component/Input/InputArea";
import { MainLayout } from "src/component/layout";
import { useToggle } from "src/hooks";
import { PATH_DASHBOARD } from "src/routes";
import * as Yup from "yup";

export default AddUser;

function AddUser() {
  // value default
  const router = useRouter();
  const { toggle: updateValue } = useToggle();
  const formRef = useRef<FormikProps<any>>(null);
  const initialValues = useMemo(
    () => ({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    }),
    []
  );
  // form validation rules
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .matches(/[^\s]/, "First name can't be all space!")
      .required("First name is required!"),
    lastName: Yup.string()
      .matches(/[^\s]/, "Last name can't be all space!")
      .required("Last name is required!"),
    email: Yup.string()
      .email("The email address is not valid")
      .required("Email address is required!"),
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
    confirmPassword: Yup.string()
      .required("Confirm password is required!")
      .oneOf([Yup.ref("password")], "The confirmation password is not match"),
  });
  const handleSubmitForm = useCallback(() => {
    console.log("submit");
    formRef.current?.submitForm();
  }, []);
  // get functions to build form with useForm() hook
  function onSubmit(user: any) {
    const dataSubmit = {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      password: user.password,
      note: user.note,
    };
    return authAPI
      .register(dataSubmit)
      .then(() => {
        router.push(PATH_DASHBOARD.users.root);
      })
      .catch(() => console.log("login failed"));
  }
  return (
    <div>
      <div className="mb-6 flex justify-between content-center">
        <div className="flex items-center">
          <Button
            icon={<Icon iconName="Back" />}
            size="large"
            className="mr-4"
            appearance="subtle"
            onClick={() => {
              router.push(PATH_DASHBOARD.users.root);
            }}
          ></Button>
          <Title3>Add new user</Title3>
        </div>
        <Button onClick={handleSubmitForm} disabled={!formRef.current?.dirty}>
          Add user
        </Button>
      </div>
      <div>
        <Card className="flex p-8" style={{ minHeight: 650 }}>
          <Form
            initialValues={initialValues}
            ref={formRef}
            onSubmit={(values) => onSubmit(values)}
            onValuesChange={() => updateValue()}
            validationSchema={validationSchema}
            enableReinitialize
          >
            <FormItem name="firstName">
              <InputForm
                label="First name"
                inputProps={{ placeholder: "First name", size: "medium" }}
              />
            </FormItem>
            <FormItem name="lastName">
              <InputForm
                label="Last name"
                inputProps={{ placeholder: "Last name", size: "medium" }}
              />
            </FormItem>
            <FormItem name="email">
              <InputForm
                label="Email address"
                inputProps={{
                  placeholder: "Email address",
                  size: "medium",
                  autoComplete: "email",
                }}
              />
            </FormItem>
            <FormItem name="username">
              <InputForm
                label="Username"
                inputProps={{
                  placeholder: "User name",
                  size: "medium",
                  autoComplete: "off",
                }}
              />
            </FormItem>
            <FormItem name="password">
              <InputForm
                label="Password"
                inputProps={{
                  type: "password",
                  placeholder: "Password",
                  size: "medium",
                  autoComplete: "off",
                }}
              />
            </FormItem>
            <FormItem name="confirmPassword">
              <InputForm
                label="Confirm password"
                inputProps={{
                  type: "password",
                  placeholder: "Confirm password",
                  size: "medium",
                }}
              />
            </FormItem>
            <FormItem name="note">
              <InputArea
                label="Note"
                inputProps={{
                  placeholder: "Note ...",
                  size: "medium",
                  autoComplete: "off",
                }}
              />
            </FormItem>
          </Form>
        </Card>
      </div>
    </div>
  );
}
AddUser.Layout = MainLayout;
