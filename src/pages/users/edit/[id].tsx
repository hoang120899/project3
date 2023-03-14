import { Icon } from "@fluentui/react";
import { Button, Title3 } from "@fluentui/react-components";
import { Card } from "@fluentui/react-components/unstable";
import { FormikProps } from "formik";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { authAPI } from "src/api-client";
import Form from "src/component/Form";
import FormItem from "src/component/Form/Item";
import { InputForm } from "src/component/Input";
import { InputArea } from "src/component/Input/InputArea";
import { MainLayout } from "src/component/layout";
import { useToggle } from "src/hooks";
import { User } from "src/models";
import { PATH_DASHBOARD } from "src/routes";
import * as Yup from "yup";

interface EditProps {
  id?: string;
}

const EditUser = ({ id, ...props }: EditProps) => {
  // value default
  const router = useRouter();
  const { toggle: updateValue } = useToggle();
  const formRef = useRef<FormikProps<any>>(null);
  const [title, setTitle] = useState("");
  const initialValues = useMemo(
    () => ({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      id: "",
      note: "",
    }),
    []
  );

  const [dataUser, setDataUser] = useState<User>(initialValues);
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
  });
  const handleSubmitForm = useCallback(() => {
    console.log("submit");
    formRef.current?.submitForm();
  }, []);
  // get functions to build form with useForm() hook
  function onSubmit(user: any) {
    return authAPI
      .updateUser(user.id, user)
      .then(() => {
        router.push(PATH_DASHBOARD.users.root);
      })
      .catch(() => console.log("update failed"));
  }

  useEffect(() => {
    authAPI.getByIdUser(id || "").then((data) => {
      setDataUser(data);
      setTitle(data.username);
    });
  }, [id]);
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
          <Title3>{title}</Title3>
        </div>
        <Button onClick={handleSubmitForm} disabled={!formRef.current?.dirty}>
          Save
        </Button>
      </div>
      <div>
        <Card className="flex p-8" style={{ minHeight: 650 }}>
          <Form
            initialValues={dataUser || initialValues}
            ref={formRef}
            onSubmit={(values) => onSubmit(values)}
            onValuesChange={() => updateValue()}
            validationSchema={validationSchema}
            enableReinitialize
          >
            <FormItem name="id" />
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
};

export default EditUser;
EditUser.Layout = MainLayout;

export async function getServerSideProps({ params }: any) {
  // const res = await authAPI.getByIdUser(params.id);
  // console.log("params", res);

  return {
    props: { id: params.id },
  };
}
